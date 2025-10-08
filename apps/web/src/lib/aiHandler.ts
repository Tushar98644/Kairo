export async function streamAiResponse(
  prompt: string,
  onChunk: (chunk: string) => void,
  onFinish: () => void,
  onError: (error: Error) => void
) {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: prompt }),
    });

    if (!response.body) {
      throw new Error("The response body is empty.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onFinish();
        break;
      }

      const chunkText = decoder.decode(value);
      const eventLines = chunkText.split("\n\n").filter(Boolean);

      for (const line of eventLines) {
        if (line.startsWith("data:")) {
          const jsonString = line.substring(5);
          try {
            const { token } = JSON.parse(jsonString);
            if (token) {
              onChunk(token);
            }
          } catch (error) {
            console.error("Failed to parse chunk:", jsonString, error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in AI handler:", error);
    onError(error as Error);
  }
}