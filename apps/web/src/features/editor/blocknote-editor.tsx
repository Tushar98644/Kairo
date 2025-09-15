"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Block, BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import {
    FormattingToolbar,
    FormattingToolbarController,
    getDefaultReactSlashMenuItems,
    getFormattingToolbarItems,
    SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { insertMagicAi } from "@/lib/aiHandler"; 

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


export function BlocknoteEditor({
    initialContent,
    onChange
}: {
    initialContent: Block[] | null;
    onChange: () => void;
}) {
  const [aiSuggestion, setAiSuggestion] = useState<{
    block: Block;
    originalContent: any;
  } | null>(null);

  const { resolvedTheme } = useTheme();

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/"
    );
  }

  const editor = useCreateBlockNote({
    initialContent: initialContent ? initialContent : undefined,
    uploadFile,
  });

  return (
    <div className="relative mx-auto max-w-4xl p-4 sm:p-8">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? darkDefaultTheme : lightDefaultTheme}
        onChange={onChange}
        className="min-h-[500px]"
      >
        <FormattingToolbarWithAI editor={editor} setAiSuggestion={setAiSuggestion}/>
        <SuggestionMenuWithAI editor={editor} />
        {aiSuggestion && (
          <AIReviewMenu
            editor={editor}
            suggestion={aiSuggestion}
            setAiSuggestion={setAiSuggestion}
          />
        )}
      </BlockNoteView>
    </div>
  );
}

function AIReviewMenu(props: {
  editor: BlockNoteEditor;
  suggestion: { block: Block; originalContent: any };
  setAiSuggestion: (suggestion: null) => void;
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