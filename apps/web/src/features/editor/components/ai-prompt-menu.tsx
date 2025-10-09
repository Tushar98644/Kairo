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
  initialTextToModify: string;
  initialBlocksToModify: Block[] | null; 
}

export const AIPromptMenu = ({
  editor,
  setIsAiPromptOpen,
  initialTextToModify,
  initialBlocksToModify, 
}: AIPromptMenuProps) => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAiRequest = async () => {
    if (!prompt) return;

    const selectedText = initialTextToModify;

    if (!selectedText) {
      toast.error("No text was selected to modify.");
      return;
    }

    setIsLoading(true);
    setAiResponse("");

    streamAiResponse(
      prompt,
      selectedText,
      (chunk) => {
        setAiResponse((prev) => prev + chunk);
      },
      () => {
        setIsLoading(false);
      },
      (error) => {
        toast.error("AI request failed. Please try again.");
        console.error(error);
        setIsLoading(false);
      }
    );
  };

  const handleAccept = () => {
    if (initialBlocksToModify) {
      const newBlock: Block = {
        id: initialBlocksToModify[0].id,
        type: "paragraph",
        props: {
          textAlignment: "left",
          textColor: "default",
          backgroundColor: "default",
        },
        content: [{ type: "text", text: aiResponse, styles: {} }],
        children: [],
      };
      editor.replaceBlocks(initialBlocksToModify.map((b) => b.id), [newBlock]);
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