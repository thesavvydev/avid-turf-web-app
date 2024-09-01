"use client";

import { Sidebar, theme, Tooltip } from "flowbite-react";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import useManageMenuItems from "./use-manage-menu-items";

const Brand = ({ isCollapsed = false }) => (
  <p className="text-center">
    <span className="font-black text-gray-500 text-inherit">
      {isCollapsed ? "A" : "AVID"}
    </span>
    <span className="font-semibold text-primary-400">
      {isCollapsed ? "T" : "TURF"}
    </span>
  </p>
);

export default function ManageSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const CollapseIcon = isCollapsed
    ? ChevronRightCircleIcon
    : ChevronLeftCircleIcon;
  const menuItems = useManageMenuItems();
  return (
    <Sidebar
      aria-label="Manage Sidebar"
      collapsed={isCollapsed}
      theme={{
        root: {
          base: twMerge(
            theme.sidebar.root.base,
            "h-screen hidden lg:block sticky top-0 border-r dark:border-gray-700 relative",
          ),
        },
      }}
    >
      <div className="relative mb-4 border-b py-4 dark:border-gray-700">
        <Brand isCollapsed={isCollapsed} />
        <div
          className="absolute -bottom-[.75em] -right-2 cursor-pointer rounded-full bg-gray-50 hover:scale-110 dark:bg-gray-800"
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        >
          <CollapseIcon />
        </div>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menuItems.map((menuItem) => (
            <Sidebar.Item
              href={menuItem.href}
              icon={menuItem.icon}
              key={menuItem.name}
              active={menuItem.isActive}
            >
              {isCollapsed ? (
                <Tooltip placement="right" style="auto" content={menuItem.name}>
                  {menuItem.name}
                </Tooltip>
              ) : (
                menuItem.name
              )}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
