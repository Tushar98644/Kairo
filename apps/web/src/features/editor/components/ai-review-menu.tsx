import { Button } from "@/components/ui/button";
import { Block, BlockNoteEditor } from "@blocknote/core";

export const AIReviewMenu = (props: {
  editor: BlockNoteEditor;
  suggestion: { block: Block; originalContent: any };
  setAiSuggestion: (suggestion: null) => void;
}) => {
  const { editor, suggestion, setAiSuggestion } = props;

  const handleAccept = () => {
    editor.updateBlock(suggestion.block, {
      props: { backgroundColor: "default" },
    });
    setAiSuggestion(null);
  };

  const handleReject = () => {
    editor.updateBlock(suggestion.block, {
      content: suggestion.originalContent,
      props: { backgroundColor: "default" },
    });
    setAiSuggestion(null);
  };

  return (
    <div className="absolute top-full z-10 mt-2 ml-4 flex gap-2 rounded-md border bg-popover p-2 shadow-lg">
      <Button size="sm" onClick={handleAccept}>
        Accept
      </Button>
      <Button size="sm" variant="secondary" onClick={handleReject}>
        Reject
      </Button>
    </div>
  );
}