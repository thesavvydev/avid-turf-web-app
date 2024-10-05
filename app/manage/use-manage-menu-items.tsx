"use client";

import { useUserContext } from "@/contexts/user";
import {
  BoneIcon,
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";

import { useParams, usePathname } from "next/navigation";

export default function useManageMenuItems() {
  const { user } = useUserContext();
  const { businessId, locationId } = useParams();
  const pathname = usePathname();

  if (!businessId || !locationId) return [];

  return [
    {
      name: "Dashboard",
      href: `/manage/${businessId}/location/${locationId}`,
      isActive: pathname === `/manage/${businessId}/location/${locationId}`,
      icon: HomeIcon,
    },
    {
      name: "Leads",
      href: `/manage/${businessId}/location/${locationId}/leads`,
      isActive: pathname.startsWith(
        `/manage/${businessId}/location/${locationId}/leads`,
      ),
      icon: BoneIcon,
    },
    {
      name: "Jobs",
      href: `/manage/${businessId}/location/${locationId}/jobs`,
      isActive: pathname.startsWith(
        `/manage/${businessId}/location/${locationId}/job`,
      ),
      icon: WorkflowIcon,
    },
    {
      name: "Appointments",
      href: `/manage/${businessId}/location/${locationId}/appointments`,
      isActive: pathname.startsWith(
        `/manage/${businessId}/location/${locationId}/appointment`,
      ),
      icon: CalendarDaysIcon,
    },
    ...(["admin", "manager"].includes(user.location?.role as string)
      ? [
          {
            name: "Employees",
            href: `/manage/${businessId}/location/${locationId}/employees`,
            isActive: pathname.startsWith(
              `/manage/${businessId}/location/${locationId}/employee`,
            ),
            icon: UserIcon,
          },
        ]
      : []),
  ];
}
