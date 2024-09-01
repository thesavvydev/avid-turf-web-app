"use client";

import { Sidebar } from "flowbite-react";
import useAdminNavItems from "./use-admin-nav-items";

export default function AdminSideBar() {
  const menuItems = useAdminNavItems();

  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="sticky top-4 hidden md:block"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menuItems.map((menuItem) => (
            <Sidebar.Item
              active={menuItem.isActive}
              href={menuItem.href}
              icon={menuItem.icon}
              key={menuItem.name}
            >
              {menuItem.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
