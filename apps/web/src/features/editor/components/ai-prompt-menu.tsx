"use client";

import { Block, BlockNoteEditor } from "@blocknote/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { streamAiResponse } from "@/lib/aiHandler";
import { useState } from "react";
import { toast } from "sonner";

interface AIPromptMenuProps {
  editor: BlockNoteEditor;
  setIsAiPromptOpen: (isOpen: boolean) => void;
}

export const AIPromptMenu = ({
  editor,
  setIsAiPromptOpen,
}: AIPromptMenuProps) => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [originalBlocks, setOriginalBlocks] = useState<Block[] | null>(null);

  const handleAiRequest = async () => {
    if (!prompt) return;

    const selectedBlocks = editor.getSelection()?.blocks;
    if (!selectedBlocks || selectedBlocks.length === 0) {
      toast.error("Please select the block(s) you want to modify.");
      return;
    }

    setOriginalBlocks(selectedBlocks);
    setIsLoading(true);
    setAiResponse("");

    streamAiResponse(
      prompt,
      (chunk) => {
        setAiResponse((prev) => prev + chunk);
      },
      () => {
        setIsLoading(false);
      },
      (error) => {
        toast.error("AI request failed. Please try again.");
        setIsLoading(false);
      }
    );
  };

  const handleAccept = () => {
    if (originalBlocks) {
      const newBlock: Block = {
        id: originalBlocks[0].id,
        type: "paragraph",
        props: {
          backgroundColor: "default",
          textColor: "default",
          textAlignment: "left",
        },
        content: [{ type: "text", text: aiResponse, styles: {} }],
        children: [],
      };
      editor.replaceBlocks([originalBlocks[0].id], [newBlock]);

      if (originalBlocks.length > 1) {
        const blockIdsToRemove = originalBlocks.slice(1).map((b) => b.id);
        editor.removeBlocks(blockIdsToRemove);
      }
    }
    setIsAiPromptOpen(false);
  };

  const handleReject = () => {
    setIsAiPromptOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-background border rounded-lg shadow-lg w-full max-w-2xl mx-auto my-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Your AI prompt..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleAiRequest();
            }
          }}
          disabled={isLoading}
        />
        <Button onClick={handleAiRequest} disabled={isLoading}>
          {isLoading ? "Generating..." : "Go"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsAiPromptOpen(false)}
          disabled={isLoading}>
          Cancel
        </Button>
      </div>

      {aiResponse && (
        <div className="mt-4 p-2 border rounded-md bg-muted min-h-[100px]">
          <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
        </div>
      )}

      {!isLoading && aiResponse && (
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={handleAccept}>Accept</Button>
          <Button variant="ghost" onClick={handleReject}>
            Reject
          </Button>
        </div>
      )}
    </div>
  );
};