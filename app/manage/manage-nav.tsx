"use client";

import { useUserContext } from "@/contexts/user";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  theme,
} from "flowbite-react";

import { twMerge } from "tailwind-merge";
import { useParams } from "next/navigation";
import useManageMenuItems from "./use-manage-menu-items";

export default function ManageNav() {
  const menuItems = useManageMenuItems();
  const {
    user: { full_name, locations, location },
  } = useUserContext();

  const { locationId, businessId } = useParams();
  const selectedLocation = locations?.find(
    (location) => location.id === Number(locationId),
  );

  return (
    <Navbar fluid className="sm:bg-gray-50">
      <Dropdown
        label={selectedLocation?.name ?? "Select a location"}
        size="sm"
        color="light"
        className="z-20"
      >
        <Dropdown.Header>Select a Location</Dropdown.Header>
        {locations?.map((location) => (
          <Dropdown.Item
            key={location.id}
            href={`/manage/${businessId}/location/${location.id}`}
          >
            {location.name}
          </Dropdown.Item>
        ))}
        {location?.role === "admin" && (
          <Dropdown.Item
            href={`/manage/${businessId}/location/${location.id}/new`}
          >
            Add Location
          </Dropdown.Item>
        )}
      </Dropdown>
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
          <Dropdown.Item href="/admin">Admin</Dropdown.Item>
          <Dropdown.Item href="/auth/signout">Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <DarkThemeToggle className="hidden md:block" />
      </div>
      <Navbar.Collapse
        theme={{ base: twMerge(theme.navbar.collapse.base, "lg:hidden") }}
      >
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
