"use client";

import { useState } from "react";
import { Block } from "@blocknote/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlocknoteEditor } from "./blocknote-editor";
import { Badge } from "@/components/ui/badge";

interface EditorWrapperProps {
  story: {
    title: string;
    content: Block[] | null;
  };
}

export function EditorWrapper({ story }: EditorWrapperProps) {
  const [title, setTitle] = useState(story.title);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const handleContentChange = () => {
    setSaveStatus("Unsaved changes");
  };

  const handleSave = () => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-theme(height.14))] flex-col">
      <header className="flex items-center justify-between gap-4 border-b bg-background p-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-9 max-w-sm border-0 text-lg font-medium focus-visible:ring-0"
          placeholder="Untitled Story"
        />
        <div className="flex items-center gap-2">
          <Badge variant={saveStatus === "Saved" ? "secondary" : "outline"}>
            {saveStatus}
          </Badge>
          <Button onClick={handleSave} size="sm" disabled={saveStatus !== "Unsaved changes"}>
            Save
          </Button>
        </div>
      </header>

      <div className="flex-1 w-full overflow-y-auto">
        <BlocknoteEditor
          initialContent={story.content}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
}