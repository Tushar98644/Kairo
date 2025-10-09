export async function streamAiResponse(
  prompt: string,
  selectedText: string,
  onChunk: (chunk: string) => void,
  onFinish: () => void,
  onError: (error: Error) => void
) {
  const finalPrompt = `
    Based on the following instruction, modify the provided text. 
    Only return the modified text, without any explanation.

    Instruction: "${prompt}"

    Text to Modify:
    ---
    ${selectedText}
    ---
  `;

  try {
    // 2. Send the combined string as the 'query' value.
    // Your backend doesn't need to change because it still receives { query: "..." }.
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: finalPrompt }),
    });

    if (!response.body) {
      throw new Error("The response body is empty.");
    }

    // The rest of your streaming logic remains exactly the same.
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