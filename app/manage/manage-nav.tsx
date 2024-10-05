"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import { useUserContext } from "@/contexts/user";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Navbar,
  theme,
  Tooltip,
} from "flowbite-react";
import { PlusIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { DeleteBusinessLocation } from "./actions";
import NewLocationDrawer from "./new-location-drawer";
import useManageMenuItems from "./use-manage-menu-items";
import UpdateLocationDrawer from "./update-location-drawer";

export default function ManageNav() {
  const [isNewLocationDrawerOpen, setIsNewLocationDrawerOpen] = useState(false);
  const [isUpdateLocationDrawerOpen, setIsUpdateLocationDrawerOpen] =
    useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = useManageMenuItems();
  const {
    user: { full_name, locations, business },
  } = useUserContext();

  const { locationId, businessId } = useParams();
  const selectedLocation = locations?.find(
    (location) => location.id === Number(locationId),
  );

  const [, post] = pathname.split("location/");
  const [, ...remainingParts] = post?.split("/") ?? [];
  const postParts = remainingParts?.join("/");

  return (
    <Navbar fluid className="sm:bg-gray-50">
      <div className="flex items-center gap-2">
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
              href={`/manage/${businessId}/location/${location.id}/${postParts}`}
            >
              {location.name}
            </Dropdown.Item>
          ))}
        </Dropdown>
        {isNewLocationDrawerOpen && (
          <NewLocationDrawer
            isOpen={isNewLocationDrawerOpen}
            setIsOpen={setIsNewLocationDrawerOpen}
          />
        )}
        {isUpdateLocationDrawerOpen && selectedLocation && (
          <UpdateLocationDrawer
            isOpen={isUpdateLocationDrawerOpen}
            setIsOpen={setIsUpdateLocationDrawerOpen}
            location={selectedLocation}
          />
        )}
        {business?.role === "admin" && selectedLocation && (
          <div className="hidden items-center lg:flex lg:gap-2">
            <Tooltip content="Add Location" style="auto">
              <Button
                color="light"
                onClick={() => setIsNewLocationDrawerOpen(true)}
                size="xs"
              >
                <PlusIcon className="size-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Location Settings" style="auto">
              <Button
                color="light"
                size="xs"
                onClick={() => setIsUpdateLocationDrawerOpen(true)}
              >
                <SettingsIcon className="size-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete Location" style="auto">
              <ConfirmModal
                matchStringConfirmation={selectedLocation.name}
                description={`Are you sure you want to remove ${selectedLocation.name}? This action is not reversible.`}
                onConfirmClick={async () => {
                  await DeleteBusinessLocation(selectedLocation);
                  router.refresh();
                }}
                trigger={(toggle) => (
                  <Button color="light" size="xs" onClick={toggle}>
                    <Trash2Icon className="size-4 text-red-500" />
                  </Button>
                )}
              />
            </Tooltip>
          </div>
        )}
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
          <Dropdown.Item href="/admin">Admin</Dropdown.Item>
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
