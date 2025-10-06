import { Block, BlockNoteEditor } from "@blocknote/core";

export async function insertMagicAi(
  editor: BlockNoteEditor,
  setAiSuggestion: (
    suggestion: { block: Block; originalContent: any } | null
  ) => void
) {
  const { block } = editor.getTextCursorPosition();

  const selection = editor.getSelection();
  const prompt = editor.getSelectedText();

  if (!prompt) {
    return;
  }

  const originalContent = block.content;

  editor.updateBlock(block, {
    content: "🧠 Thinking...",
  });

  const { Client } = await import("@langchain/langgraph-sdk");

  const client = new Client({ apiUrl: "http://localhost:2024" });

  const streamResponse = client.runs.stream(null, "agent", {
    input: {
      messages: [{ role: "user", content: "What is LangGraph?" }],
    },
    streamMode: "messages-tuple",
  });

  for await (const chunk of streamResponse) {
    console.log(`Receiving new event of type: ${chunk.event}...`);
    console.log(JSON.stringify(chunk.data));
    console.log("\n\n");
  }

  try {
    const aiResponse = await axios.post("/");

    editor.updateBlock(block, {
      content: aiResponse,
      props: { backgroundColor: "blue" },
    });

    setAiSuggestion({ block, originalContent });
  } catch (error) {
    editor.updateBlock(block, { content: originalContent });
  }
}
