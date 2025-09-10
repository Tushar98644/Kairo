"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface EditorProps {
  initialContent?: string;
  onChange: (value: string) => void;
}

export default function Editor() {
  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: body,
    });
    return (await ret.json()).data.url.replace(
      "tmpfiles.org/",
      "tmpfiles.org/dl/",
    );
  }
  const editor = useCreateBlockNote({ uploadFile });

  return (
    <div className="prose prose-stone dark:prose-invert max-w-full">
      <BlockNoteView
        editor={editor}
        theme={"dark"}
      />
    </div>
  );
}