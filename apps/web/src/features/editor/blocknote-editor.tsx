"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
} from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import {
  AIPromptMenu,
  FormattingToolbarWithAI,
  SuggestionMenuWithAI,
} from "./components";
import { useFetchBlocks } from "@/hooks/queries/usBlockQuery";
import { useSyncBlocks } from "@/hooks/mutations/useBlockMutation";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { uploadToS3 } from "@/lib/uploadToS3";

export const BlocknoteEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blocks = [], isPending } = useFetchBlocks(id);
  const { mutate: updateBlock } = useSyncBlocks();

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  const [isAiPromptOpen, setIsAiPromptOpen] = useState(false);

  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    if (!isPending && blocks) {
      try {
        setInitialContent(blocks.length > 0 ? blocks : undefined);
      } catch (e) {
        setInitialContent(undefined);
      }
    } else if (!isPending) {
      setInitialContent(undefined);
    }
  }, [blocks, isPending]);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent,
      uploadFile: uploadToS3,
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
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }

          debounceTimer.current = setTimeout(() => {
            const savedBlocks = editor.document;
            updateBlock(
              { storyId: id, blocks: savedBlocks as any },
              {
                onError: () => {
                  toast.error("Failed to save story. Please try again later.");
                },
              }
            );
          }, 2000);
        }}
      >
        <FormattingToolbarWithAI
          editor={editor}
          setIsAiPromptOpen={setIsAiPromptOpen}
        />
        <SuggestionMenuWithAI
          editor={editor}
          setIsAiPromptOpen={setIsAiPromptOpen}
        />

        {isAiPromptOpen && (
          <AIPromptMenu
            editor={editor}
            setIsAiPromptOpen={setIsAiPromptOpen}
          />
        )}
      </BlockNoteView>
    </div>
  );
};