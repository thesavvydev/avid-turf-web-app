"use client";

import { useUserContext } from "@/contexts/user";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

const Brand = () => (
  <p>
    <span className="font-black text-green-600 text-inherit">AVID</span>
    <span className="font-semibold text-zinc-600">TURF</span>
  </p>
);

export default function ManageNav() {
  const pathname = usePathname();
  const {
    user: { full_name },
  } = useUserContext();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/manage",
      isActive: pathname === "/manage",
    },
    {
      name: "Jobs",
      href: "/manage/jobs",
      isActive: pathname.startsWith("/manage/jobs"),
    },
    {
      name: "Appointments",
      href: "/manage/appointments",
      isActive: pathname.startsWith("/manage/appointments"),
    },
  ];

  return (
    <Navbar fluid>
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
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <DarkThemeToggle className="hidden md:block" />
      </div>
      <Navbar.Collapse>
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
