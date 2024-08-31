"use client";

import { useUserContext } from "@/contexts/user";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  theme,
} from "flowbite-react";
import useAdminNavItems from "./use-admin-nav-items";
import { twMerge } from "tailwind-merge";

const Brand = () => (
  <p>
    <span className="font-black text-gray-500 text-inherit">AVID</span>
    <span className="font-semibold text-primary-400">TURF</span>
    <span className="font-black text-red-400"> ADMIN</span>
  </p>
);

export default function AdminNav() {
  const menuItems = useAdminNavItems();
  const {
    user: { full_name },
  } = useUserContext();

  return (
    <Navbar border>
      <Navbar.Brand href="https://flowbite-react.com">
        <Brand />
      </Navbar.Brand>
      <div className="flex gap-2 md:order-2 md:gap-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{full_name}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/manage">Manage</Dropdown.Item>
          <Dropdown.Item href="/auth/signout">Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <DarkThemeToggle className="hidden md:block" />
      </div>
      <Navbar.Collapse
        theme={{ base: twMerge(theme.navbar.collapse.base, "md:hidden") }}
      >
        {menuItems.map((menuItem) => (
          <Navbar.Link
            className="flex items-center gap-2"
            key={menuItem.name}
            href={menuItem.href}
            active={menuItem.isActive}
            theme={{ active: { on: "text-primary-400" } }}
          >
            <menuItem.icon />
            {menuItem.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
