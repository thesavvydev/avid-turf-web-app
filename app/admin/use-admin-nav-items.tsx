"use client";
import { HomeIcon, MapPinIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function useAdminNavItems() {
  const pathname = usePathname();

  return [
    {
      name: "Dashboard",
      href: "/admin",
      isActive: pathname === "/admin",
      icon: HomeIcon,
    },
    {
      name: "Locations",
      href: "/admin/locations",
      isActive: pathname.startsWith("/admin/location"),
      icon: MapPinIcon,
    },
    {
      name: "Users",
      href: "/admin/users",
      isActive: pathname.startsWith("/admin/user"),
      icon: UserIcon,
    },
  ];
}
