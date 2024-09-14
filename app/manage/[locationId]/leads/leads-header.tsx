"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import NewLeadDrawer from "./new-lead-drawer";

export default function LeadsHeader() {
  return (
    <PageHeaderWithActions
      title="Leads"
      subtitle="View and manage all of your leads."
      renderActions={() => <NewLeadDrawer />}
    />
  );
}
