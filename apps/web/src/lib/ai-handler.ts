import { Block, BlockNoteEditor } from "@blocknote/core";

export async function insertMagicAi(
  editor: BlockNoteEditor,
  setAiSuggestion: (suggestion: { block: Block; originalContent: any } | null) => void
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

  try {
    const aiResponse = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`This is a dummy AI response to your prompt: "${prompt}"`);
      }, 1000);
    });

    editor.updateBlock(block, {
      content: aiResponse,
      props: { backgroundColor: "blue" },
    });

    setAiSuggestion({ block, originalContent });

  } catch (error) {
    editor.updateBlock(block, { content: originalContent });
  }
}
