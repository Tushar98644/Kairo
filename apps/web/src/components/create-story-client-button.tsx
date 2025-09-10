"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateStoryDialog } from "./create-story-dialog";

// Add a variant prop
interface CreateStoryClientButtonProps {
  variant?: "default" | "link";
  className?: string;
}

export function CreateStoryClientButton({ variant = "default", className }: CreateStoryClientButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (variant === "link") {
    return (
      <>
        <Button variant="link" onClick={() => setIsDialogOpen(true)} className={className}>
          Start Writing
        </Button>
        <CreateStoryDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
      </>
    )
  }

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className={className}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Story
      </Button>
      <CreateStoryDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
}
