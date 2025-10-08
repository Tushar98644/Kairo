import { BlockNoteEditor } from "@blocknote/core";
import {
  FormattingToolbar,
  FormattingToolbarController,
  getFormattingToolbarItems,
} from "@blocknote/react";
import { Wand2 } from "lucide-react";

const MagicToolbarButton = (props: {
  setIsAiPromptOpen: (isOpen: boolean) => void;
}) => (
  <button
    className="bn-toolbar-button"
    onClick={() => props.setIsAiPromptOpen(true)}>
    <Wand2 size={18} />
  </button>
);

export const FormattingToolbarWithAI = (props: {
  editor: BlockNoteEditor;
  setIsAiPromptOpen: (isOpen: boolean) => void;
}) => {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          {...getFormattingToolbarItems()}
          <MagicToolbarButton setIsAiPromptOpen={props.setIsAiPromptOpen} />
        </FormattingToolbar>
      )}
    />
  );
};