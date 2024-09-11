"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function useManageMenuItems() {
  const pathname = usePathname();

  return [
    {
      name: "Dashboard",
      href: "/manage",
      isActive: pathname === "/manage",
      icon: HomeIcon,
    },
    {
      name: "Jobs",
      href: "/manage/jobs",
      isActive: pathname.startsWith("/manage/job"),
      icon: WorkflowIcon,
    },
    {
      name: "Appointments",
      href: "/manage/appointments",
      isActive: pathname.startsWith("/manage/appointment"),
      icon: CalendarDaysIcon,
    },
    {
      name: "Employees",
      href: "/manage/employees",
      isActive: pathname.startsWith("/manage/employee"),
      icon: UserIcon,
    },
  ];
}
