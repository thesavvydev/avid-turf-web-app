"use client";

import { useSidebarContext } from "@/contexts/sidebar";
import { useUserContext } from "@/contexts/user";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  theme,
  Tooltip,
} from "flowbite-react";
import {
  ChevronRightIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import useManageMenuItems from "./use-manage-menu-items";

export default function ManageNav() {
  const menuItems = useManageMenuItems();
  const {
    user: { full_name, location, locations, business, businesses },
  } = useUserContext();

  const { toggle, isCollapsed } = useSidebarContext();
  const SidebarIcon = isCollapsed ? SidebarOpenIcon : SidebarCloseIcon;

  return (
    <Navbar
      fluid
      className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex grow items-center gap-2">
        <Tooltip content={`${isCollapsed ? "Open" : "Close"} Sidebar`}>
          <button
            className="hidden cursor-pointer items-center px-2 md:flex"
            onClick={toggle}
          >
            <SidebarIcon className="size-5" />
          </button>
        </Tooltip>
        <div className="mb-2 mr-2 flex w-full grow items-center justify-center gap-2 rounded border border-gray-200 bg-gray-50 px-4 py-2 shadow-inner dark:border-gray-600 dark:bg-gray-700 sm:mb-0 md:w-auto md:grow-0">
          <Dropdown
            inline
            arrowIcon={false}
            label={business?.name ?? "Select a Business"}
            color="light"
            className="z-20"
          >
            <Dropdown.Header>Select a Business</Dropdown.Header>
            {businesses?.map((business) => (
              <Dropdown.Item
                key={business.id}
                href={`/manage/${business.id}/dashboard`}
              >
                {business.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <ChevronRightIcon />
          <Dropdown
            label={location?.name ?? "Select a location"}
            color="light"
            className="z-20"
            inline
          >
            <Dropdown.Header>Select a Location</Dropdown.Header>
            {locations?.map((location) => (
              <Dropdown.Item
                key={location.id}
                href={`/manage/${location.business_id}/location/${location.id}`}
              >
                {location.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
      <div className="ml-auto flex gap-2 md:order-2 md:ml-0 md:gap-4">
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
          theme={{ content: twMerge(theme.dropdown.content, "z-50") }}
        >
          <Dropdown.Header>
            <span className="block text-sm">{full_name}</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="/auth/signout">Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <DarkThemeToggle className="hidden lg:block" />
      </div>
      <Navbar.Collapse className="lg:hidden">
        {menuItems.map((menuItem) => (
          <Navbar.Link
            key={menuItem.name}
            href={menuItem.href}
            active={menuItem.isActive}
            theme={{ active: { on: "text-primary-400" } }}
          >
            {menuItem.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
