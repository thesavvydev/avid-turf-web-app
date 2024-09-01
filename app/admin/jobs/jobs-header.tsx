"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import NewJobDrawer from "./new-job-drawer";

export default function JobsHeader() {
  return (
    <PageHeaderWithActions
      isAdmin
      renderActions={() => <NewJobDrawer />}
      subtitle="Manage your company Jobs."
      title="Jobs"
    />
  );
}
