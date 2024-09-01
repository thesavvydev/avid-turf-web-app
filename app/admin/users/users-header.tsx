"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import NewUserDrawer from "./new-user-drawer";

export default function UsersHeader() {
  return (
    <PageHeaderWithActions
      isAdmin
      renderActions={() => <NewUserDrawer />}
      subtitle="Manage your company users."
      title="Users"
    />
  );
}
