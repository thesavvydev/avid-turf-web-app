"use client";

import { Sidebar, theme } from "flowbite-react";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import useManageMenuItems from "./use-manage-menu-items";
import { useParams, useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/user";

const Brand = ({ isCollapsed = false }) => {
  const { businessId, locationId } = useParams();
  const router = useRouter();
  const { user } = useUserContext();

  return (
    <p
      className="cursor-pointer text-center hover:scale-110"
      onClick={() => {
        if (["manager", "admin"].includes(user.business?.role ?? "")) {
          router.push(`/manage/${businessId}/dashboard`);
        } else {
          router.push(`/manage/${businessId}/location/${locationId}`);
        }
      }}
    >
      <span className="font-black text-gray-500 text-inherit">
        {isCollapsed ? "A" : "AVID"}
      </span>
      <span className="font-semibold text-primary-400">
        {isCollapsed ? "T" : "TURF"}
      </span>
    </p>
  );
};

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
            "h-screen hidden lg:block top-0 border-r dark:border-gray-700 relative sticky z-10",
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
              {menuItem.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
