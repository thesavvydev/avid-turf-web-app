"use client";

import { useSidebarContext } from "@/contexts/sidebar";
import { Sidebar, theme } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import useManageMenuItems from "./use-manage-menu-items";

export default function ManageSidebar() {
  const menuItems = useManageMenuItems();
  const { isCollapsed } = useSidebarContext();
  return (
    <Sidebar
      collapsed={isCollapsed}
      aria-label="Manage Sidebar"
      theme={{
        root: {
          base: twMerge(
            theme.sidebar.root.base,
            "h-[calc(100vh-4rem)] hidden lg:block top-16 border-r dark:border-gray-700 relative sticky z-20",
          ),
          inner: twMerge(theme.sidebar.root.inner, "bg-white"),
        },
      }}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menuItems.map((menuItem) => (
            <Sidebar.Item
              href={menuItem.href}
              icon={menuItem.icon}
              key={menuItem.name}
              active={menuItem.isActive}
            >
              {menuItem.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
