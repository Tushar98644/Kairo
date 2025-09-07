"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BellOff, CircleUserRound, CreditCard, ShoppingCart, CalendarCheck, Store, PlusCircle } from 'lucide-react'
import Link from "next/link";
import ProfileDropdown from "./ui/profile-dropdown";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      id: "store",
      title: "Store",
      items: [
        {
          title: "Marketplace",
          url: "/dashboard/marketplace",
          icon: Store,
          type: "link",
          isActive: true
        },
        {
          title: "My Products",
          url: "/dashboard/products",
          icon: ShoppingCart, 
          type: "link",
          badge: { text: "12", ariaLabel: "12 products" }
        },
        {
          title: "Add Product",
          url: "/dashboard/products/new",
          icon: PlusCircle,
          type: "action",
          permission: "seller" 
        }
      ]
    },

    {
      id: "sales",
      title: "Sales & Operations",
      items: [
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: ShoppingCart,
          type: "link",
          badge: { text: "3", ariaLabel: "3 new orders" } 
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
          icon: CreditCard,
          type: "link"
        },
        {
          title: "Schedule",
          url: "/dashboard/schedule",
          icon: CalendarCheck,
          type: "link"
        },
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: BellOff,
          type: "panel",
          unreadCount: 5 
        }
      ]
    },

    {
      id: "account",
      title: "Account",
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
          icon: CircleUserRound,
          type: "link"
        },
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const pathname = usePathname();
  
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="h-16 max-md:mt-2 mb-2 justify-center">
        
        <span className="font-semibold text-sm px-4">KAIRO</span>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-[11.5px]">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-3">
                {item.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="group/menu-button hover:bg-pink-500/40 group-data-[collapsible=icon]:px-[5px]! gap-3 h-8 [&>svg]:size-auto"
                        tooltip={item.title}
                        isActive={isActive}
                      >
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className="group-data-[active=true]/menu-button:text-primary"
                              size={18}
                              aria-hidden="true"
                            />
                          )}
                          <span className="text-xs">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ProfileDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}