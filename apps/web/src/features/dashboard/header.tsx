"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle } from "lucide-react";
import { Icons } from "@/components/global/icons";

const mobileNavLinks = [
  { href: "/dashboard", label: "My Stories" },
  { href: "/dashboard/templates", label: "Templates" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardHeader() {
  return (
    // Updated classes here for the permanent glossy effect
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/40 bg-background/40 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile Sidebar/Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Icons.logo className="h-6 w-6" />
              <span>Kairo</span>
            </Link>
            {mobileNavLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Header Content */}
      <div className="flex w-full items-center justify-end gap-4">
        <Button asChild size="sm">
          <Link href="/editor/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Story
          </Link>
        </Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}