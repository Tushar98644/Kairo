"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PlusCircle, LayoutDashboard, Settings, BookCopy } from "lucide-react";
import { Icons } from "@/components/global/icons";

const mobileNavLinks = [
  { href: "/dashboard", label: "My Stories", icon: LayoutDashboard },
  { href: "/dashboard/templates", label: "Templates", icon: BookCopy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
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
        <UserButton />
      </div>
    </header>
  );
}