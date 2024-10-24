"use client";

import { useUserContext } from "@/contexts/user";
import {
  // BoneIcon,
  // CalendarDaysIcon,
  HomeIcon,
  MapPinIcon,
  UserCircle2,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";

import { useParams, usePathname } from "next/navigation";

export default function useManageMenuItems() {
  const { user } = useUserContext();
  const { businessId, locationId } = useParams();
  const pathname = usePathname();

  if (!businessId && !locationId) return [];

  if (
    ["manager", "admin"].includes(user.business?.role ?? "") &&
    businessId &&
    !locationId
  ) {
    return [
      {
        name: "Dashboard",
        href: `/manage/${businessId}/dashboard`,
        isActive: pathname === `/manage/${businessId}/dashboard`,
        icon: HomeIcon,
      },
      {
        name: "Locations",
        href: `/manage/${businessId}/locations`,
        isActive: pathname === `/manage/${businessId}/locations`,
        icon: MapPinIcon,
      },
      {
        name: "Users",
        href: `/manage/${businessId}/users`,
        isActive: pathname === `/manage/${businessId}/users`,
        icon: UserCircle2,
      },
    ];
  }

  return [
    {
      name: "Dashboard",
      href: `/manage/${businessId}/location/${locationId}`,
      isActive: pathname === `/manage/${businessId}/location/${locationId}`,
      icon: HomeIcon,
    },
    // {
    //   name: "Leads",
    //   href: `/manage/${businessId}/location/${locationId}/leads`,
    //   isActive: pathname.startsWith(
    //     `/manage/${businessId}/location/${locationId}/leads`,
    //   ),
    //   icon: BoneIcon,
    // },
    {
      name: "Jobs",
      href: `/manage/${businessId}/location/${locationId}/jobs`,
      isActive: pathname.startsWith(
        `/manage/${businessId}/location/${locationId}/job`,
      ),
      icon: WorkflowIcon,
    },
    // {
    //   name: "Appointments",
    //   href: `/manage/${businessId}/location/${locationId}/appointments`,
    //   isActive: pathname.startsWith(
    //     `/manage/${businessId}/location/${locationId}/appointment`,
    //   ),
    //   icon: CalendarDaysIcon,
    // },
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
