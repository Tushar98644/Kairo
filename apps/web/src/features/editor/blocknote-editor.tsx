"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { AIReviewMenu, FormattingToolbarWithAI, SuggestionMenuWithAI } from "./components";
import { useFetchBlocks } from "@/hooks/queries/usBlockQuery";
import { useSyncBlocks } from "@/hooks/mutations/useBlockMutation";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export const BlocknoteEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blocks = [], isPending } = useFetchBlocks(id);
  const { mutate: updateBlock } = useSyncBlocks();

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

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

    useEffect(() => {
    if (!isPending && blocks) {
      setInitialContent(blocks.length > 0 ? blocks : undefined);
    }
  }, [blocks, isPending]);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ 
      initialContent,
      uploadFile 
    });
  }, [initialContent]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (editor === undefined) {
    return <div>Loading content...</div>;
  }

return (
  <div className="relative mx-auto max-w-4xl p-4 sm:p-8">
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? darkDefaultTheme : lightDefaultTheme}
      className="min-h-[500px]"
      onChange={() => {
        const timer = setTimeout(() => {
          const savedBlocks = editor.document;
          updateBlock({ storyId: id, blocks: savedBlocks }, {
            onSuccess: () => {
              toast.success("Story saved successfully!");
            },
            onError: () => {
              toast.error("Failed to save story. Please try again later.");
            }
          });
        }, 2000);
        return () => clearTimeout(timer);
      }}
    >
      <FormattingToolbarWithAI editor={editor} setAiSuggestion={setAiSuggestion} />
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