"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  MapPinIcon,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";
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
      name: "Jobs",
      href: "/admin/jobs",
      isActive: pathname.startsWith("/admin/job"),
      icon: WorkflowIcon,
    },
    {
      name: "Appointments",
      href: "/admin/appointments",
      isActive: pathname.startsWith("/admin/appointment"),
      icon: CalendarDaysIcon,
    },
    {
      name: "Users",
      href: "/admin/users",
      isActive: pathname.startsWith("/admin/user"),
      icon: UserIcon,
    },
  ];
}
