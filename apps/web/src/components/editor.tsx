"use client";

import {
  useCreateBlockNote,
  FormattingToolbar,
  FormattingToolbarController,
  getFormattingToolbarItems,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import { Block, BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { insertMagicAi } from "@/lib/ai-handler"; 

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


export default function Editor() {
  const [aiSuggestion, setAiSuggestion] = useState<{
    block: Block;
    originalContent: any;
  } | null>(null);

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
  }

  const editor = useCreateBlockNote({ uploadFile });

  return (
    <div className="prose prose-stone dark:prose-invert max-w-full relative">
      <BlockNoteView
        editor={editor}
        theme={"light"}
        formattingToolbar={false}
        slashMenu={false}
      >
        <FormattingToolbarWithAI editor={editor} setAiSuggestion={setAiSuggestion}/>
        <SuggestionMenuWithAI editor={editor} />
        {aiSuggestion && (
          <AIReviewMenu editor={editor} suggestion={aiSuggestion} setAiSuggestion={setAiSuggestion} />
        )}
      </BlockNoteView>
    </div>
  );
}

function AIReviewMenu(props: {
  editor: BlockNoteEditor,
  suggestion: { block: Block; originalContent: any },
  setAiSuggestion: (suggestion: null) => void
}) {
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
    <div className="absolute top-full mt-2 ml-4 z-10 bg-white dark:bg-neutral-800 shadow-lg rounded-md p-2 flex gap-2">
      <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded" onClick={handleAccept}>
        Accept
      </button>
      <button className="text-sm px-3 py-1 bg-neutral-200 dark:bg-neutral-600 rounded" onClick={handleReject}>
        Reject
      </button>
    </div>
  );
}


function FormattingToolbarWithAI(props: {
  editor: BlockNoteEditor<any, any, any>;
  setAiSuggestion: (suggestion: null) => void;
}) {
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
function SuggestionMenuWithAI(props: {
  editor: BlockNoteEditor<any, any, any>;
}) {
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