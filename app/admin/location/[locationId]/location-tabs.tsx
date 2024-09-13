"use client";

import { Tabs } from "flowbite-react";
import { HomeIcon, UsersIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function LocationTabs() {
  const { locationId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      active: pathname === `/admin/location/${locationId}`,
      href: `/admin/location/${locationId}`,
      Icon: HomeIcon,
      name: "General",
    },
    {
      active: pathname.startsWith(`/admin/location/${locationId}/employees`),
      href: `/admin/location/${locationId}/employees`,
      Icon: UsersIcon,
      name: "Employees",
    },
  ];

  return (
    <Tabs
      onActiveTabChange={(tab) => router.push(tabs[tab].href)}
      variant="underline"
      theme={{ tabpanel: "hidden" }}
    >
      {tabs.map((tab) => (
        <Tabs.Item
          active={tab.active}
          key={tab.name}
          icon={() => <tab.Icon className="mr-2" />}
          title={tab.name}
        />
      ))}
    </Tabs>
  );
}
