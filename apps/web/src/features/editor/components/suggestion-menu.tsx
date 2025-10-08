import { BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import { Wand2 } from "lucide-react";

const askAISlashItem = (setIsAiPromptOpen: (isOpen: boolean) => void) => ({
  title: "Ask AI",
  onItemClick: () => setIsAiPromptOpen(true),
  aliases: ["ai", "magic"],
  group: "AI",
  icon: <Wand2 size={18} />,
  subtext: "Generate text with AI",
});

export const SuggestionMenuWithAI = (props: {
  editor: BlockNoteEditor;
  setIsAiPromptOpen: (isOpen: boolean) => void;
}) => {
  return (
    <SuggestionMenuController
      triggerCharacter="/"
      getItems={async (query) =>
        filterSuggestionItems(
          [
            ...getDefaultReactSlashMenuItems(props.editor),
            askAISlashItem(props.setIsAiPromptOpen),
          ],
          query
        )
      }
    />
  );
};