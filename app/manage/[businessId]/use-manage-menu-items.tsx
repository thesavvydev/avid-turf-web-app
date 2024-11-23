"use client";

import { useUserContext } from "@/contexts/user";
import {
  BoxIcon,
  CalendarIcon,
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

  const isBusinessManagement = ["manager", "admin"].includes(
    user.business?.role ?? "",
  );
  const isLocationManagement = ["manager", "admin"].includes(
    user.location?.role ?? "",
  );

  if (!businessId) return [];

  if (!locationId) {
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
        name: "Products",
        href: `/manage/${businessId}/products`,
        isActive: pathname === `/manage/${businessId}/products`,
        icon: BoxIcon,
      },
      ...(isBusinessManagement
        ? [
            {
              name: "Users",
              href: `/manage/${businessId}/users`,
              isActive: pathname === `/manage/${businessId}/users`,
              icon: UserCircle2,
            },
          ]
        : []),
    ];
  }

  return [
    {
      name: "Dashboard",
      href: `/manage/${businessId}/location/${locationId}`,
      isActive: pathname === `/manage/${businessId}/location/${locationId}`,
      icon: HomeIcon,
    },
    {
      name: "Jobs",
      href: `/manage/${businessId}/location/${locationId}/jobs`,
      isActive: pathname.startsWith(
        `/manage/${businessId}/location/${locationId}/job`,
      ),
      icon: WorkflowIcon,
    },
    ...(isLocationManagement
      ? [
          {
            name: "Employees",
            href: `/manage/${businessId}/location/${locationId}/employees`,
            isActive: pathname.startsWith(
              `/manage/${businessId}/location/${locationId}/employee`,
            ),
            icon: UserIcon,
          },
          {
            name: "Scheduling",
            href: `/manage/${businessId}/location/${locationId}/scheduling`,
            isActive: pathname.startsWith(
              `/manage/${businessId}/location/${locationId}/scheduling`,
            ),
            icon: CalendarIcon,
          },
        ]
      : []),
  ];
}
