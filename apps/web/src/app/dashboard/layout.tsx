import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 03 - Crafted.is",
};

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ActionSearchBar from "@/components/ui/action-search-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="my-2">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <header className="flex flex-wrap gap-3 min-h-20 py-4 shrink-0 items-center transition-all ease-linear">
              {/* Left side */}
              <div className="flex flex-1 items-center gap-2">
                <SidebarTrigger className="-ms-1" />
                <div className="max-lg:hidden lg:contents">
                  <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
              {/* Right side */}
              <ActionSearchBar/>
            </header>
            <div className="overflow-hidden flex p-2">
                {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}