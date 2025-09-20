import { insertMagicAi } from "@/lib/aiHandler";
import { BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import { SuggestionMenuController, getDefaultReactSlashMenuItems } from "@blocknote/react";
import { Wand2 } from "lucide-react";


const insertMagicSlashItem = (
  editor: BlockNoteEditor,
  setAiSuggestion: any
) => ({
    title: 'Ask AI',
    onItemClick: () => insertMagicAi(editor, setAiSuggestion),
    aliases: ['ai', 'magic'],
    group: 'AI',
    icon: <Wand2 size={18} />,
    subtext: 'Generate text with AI',
});

export const SuggestionMenuWithAI = (props: {
  editor: BlockNoteEditor<any, any, any>;
}) => {
  return (
    <SuggestionMenuController
      triggerCharacter="/"
      getItems={async (query) =>
        filterSuggestionItems(
          [
            ...getDefaultReactSlashMenuItems(props.editor),
            insertMagicSlashItem(props.editor, query),
          ],
          query,
        )
      }
    />
  );
}