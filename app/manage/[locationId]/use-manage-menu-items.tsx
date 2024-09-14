"use client";
import {
  BoneIcon,
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export default function useManageMenuItems() {
  const { locationId } = useParams();
  const pathname = usePathname();

  return [
    {
      name: "Dashboard",
      href: `/manage/${locationId}`,
      isActive: pathname === `/manage/${locationId}`,
      icon: HomeIcon,
    },
    {
      name: "Leads",
      href: `/manage/${locationId}/leads`,
      isActive: pathname.startsWith(`/manage/${locationId}/leads`),
      icon: BoneIcon,
    },
    {
      name: "Jobs",
      href: `/manage/${locationId}/jobs`,
      isActive: pathname.startsWith(`/manage/${locationId}/job`),
      icon: WorkflowIcon,
    },
    {
      name: "Appointments",
      href: `/manage/${locationId}/appointments`,
      isActive: pathname.startsWith(`/manage/${locationId}/appointment`),
      icon: CalendarDaysIcon,
    },
    {
      name: "Employees",
      href: `/manage/${locationId}/employees`,
      isActive: pathname.startsWith(`/manage/${locationId}/employee`),
      icon: UserIcon,
    },
  ];
}
