"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/global/icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, Settings, BookCopy } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "My Stories", icon: LayoutDashboard },
  { href: "/dashboard/templates", label: "Templates", icon: BookCopy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "hidden h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out md:flex",
          isCollapsed ? "w-16" : "w-48"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Icons.logo className="h-6 w-6" />
            <span className={cn(isCollapsed && "hidden")}>Kairo</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 p-2">
          {navLinks.map((link) => (
            <Tooltip key={link.label} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className={cn(isCollapsed && "hidden")}>
                      {link.label}
                    </span>
                  </Button>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">{link.label}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
        <div className="mt-auto flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}