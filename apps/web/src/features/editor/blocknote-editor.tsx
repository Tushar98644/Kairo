"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { AIReviewMenu, FormattingToolbarWithAI, SuggestionMenuWithAI } from "./components";

export function BlocknoteEditor() {
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
    initialContent: undefined,
    uploadFile,
  });

  return (
    <div className="relative mx-auto max-w-4xl p-4 sm:p-8">
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? darkDefaultTheme : lightDefaultTheme}
        // onChange={onChange}
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
