"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import NewLocationDrawer from "./new-location-drawer";

export default function LocationsHeader() {
  return (
    <PageHeaderWithActions
      isAdmin
      renderActions={() => <NewLocationDrawer />}
      subtitle="Manage your company locations."
      title="Locations"
    />
  );
}
