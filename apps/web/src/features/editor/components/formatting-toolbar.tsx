import { insertMagicAi } from "@/lib/aiHandler";
import { BlockNoteEditor } from "@blocknote/core";
import {
    FormattingToolbar,
    FormattingToolbarController,
    getFormattingToolbarItems,
} from "@blocknote/react";
import { Wand2 } from "lucide-react";

const MagicToolbarButton = (props: {
  editor: BlockNoteEditor,
  setAiSuggestion: (suggestion: any) => void
}) => (
  <button
    className="bn-toolbar-button"
    onClick={() => insertMagicAi(props.editor, props.setAiSuggestion)}
  >
    <Wand2 size={18} />
  </button>
);

export const FormattingToolbarWithAI = (props: {
  editor: BlockNoteEditor<any, any, any>;
  setAiSuggestion: (suggestion: null) => void;
}) => {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          {...getFormattingToolbarItems()}
          <MagicToolbarButton editor={props.editor} setAiSuggestion={props.setAiSuggestion}/>
        </FormattingToolbar>
      )}
    />
  );
}
