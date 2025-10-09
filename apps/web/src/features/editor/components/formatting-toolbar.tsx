import { BlockNoteEditor } from "@blocknote/core";
import {
  FormattingToolbar,
  FormattingToolbarController,
  getFormattingToolbarItems,
} from "@blocknote/react";
import { Wand2 } from "lucide-react";

const MagicToolbarButton = (props: { onOpenAiMenu: () => void }) => (
  <button
    type="button"
    className="bn-toolbar-button"
    onClick={props.onOpenAiMenu}>
    <Wand2 size={18} />
  </button>
);

export const FormattingToolbarWithAI = (props: {
  editor: BlockNoteEditor;
  onOpenAiMenu: () => void;
}) => {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          {...getFormattingToolbarItems()}
          <MagicToolbarButton onOpenAiMenu={props.onOpenAiMenu} />
        </FormattingToolbar>
      )}
    />
  );
};