"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlocknoteEditor } from "./blocknote-editor";
import { Badge } from "@/components/ui/badge";
import { useFetchStoryById } from "@/hooks/queries/useStoryQuery";
import { useParams } from "next/navigation";
import { useUpdateStory } from "@/hooks/mutations/useStory";
import { toast } from "sonner";

export function EditorWrapper() {
  const { id } = useParams<{ id: string }>();
  const { data: storyData, isPending, isError } = useFetchStoryById(id);
  const { mutateAsync: updateStory, isPending: isSaving } = useUpdateStory();

  type StoryData = { title?: string; description: string, content?: any };
  const initialData = useRef<StoryData | null>(null);

  const [title, setTitle] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    console.log("storyData", storyData);
    if (storyData) {
      initialData.current = storyData;
      setTitle(storyData.title || "Tushar's Story");
      setIsDirty(false);
    }
  }, [storyData]);

  useEffect(() => {
    if (!initialData.current) return;
    const hasTitleChanged = initialData.current.title !== title;

    if (hasTitleChanged) setIsDirty(true);
  }, [title]);

  if (isPending) {
    return (
      <p>loading stories...</p>
    )
  }

  if (isError) {
    return (
      <p>Failed to load the story. Please try again later.</p>
    )
  }

  const handleSave = async () => {
    if (initialData.current?.title === title) return;

    await updateStory({ storyId: id, title }, {
      onSuccess: (updatedStory) => {
        initialData.current = updatedStory;
        setIsDirty(false);
        toast.success("Story title updated successfully!");
      },
      onError: (error) => {
        console.error("Failed to update story:", error);
        toast.error("Failed to update title. Please try again later.");
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-theme(height.14))] flex-col">
      <header className="flex items-center justify-between gap-4 border-b bg-background p-4">
        <div className="text-sm text-muted-foreground flex flex-col">
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 max-w-sm border-0 text-lg font-medium focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isSaving ? "secondary" : "outline"} className="p-2">
            {isSaving ? "Saving..." : isDirty ? "Unsaved Changes" : "Saved"}
          </Badge>
          <Button onClick={handleSave} disabled={isSaving || !isDirty} className="px-8 py-0 size-7">
            Save
          </Button>
        </div>
      </header>
      <div className="flex-1 w-full overflow-y-auto">
        <BlocknoteEditor />
      </div>
    </div>
  );
}