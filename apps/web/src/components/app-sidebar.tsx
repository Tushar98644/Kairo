"use client";

import Link from "next/link";
import {
  Home,
  FileText,
  Settings,
  PlusCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton, useClerk } from "@clerk/nextjs";
import { CreateStoryDialog } from "./create-story-dialog";
import { useState } from "react";

export function AppSidebar() {
  const { signOut } = useClerk();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            {/* Create New Story Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 md:h-8 md:w-8"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span className="sr-only">Create Story</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Create Story</TooltipContent>
            </Tooltip>

            {/* Dashboard Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            {/* All Stories Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/stories"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <FileText className="h-5 w-5" />
                  <span className="sr-only">Stories</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Stories</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        {/* Bottom of Sidebar (Settings, User Profile) */}
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="py-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </aside>
      <CreateStoryDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
}
