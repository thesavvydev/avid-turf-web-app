"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Button } from "flowbite-react";

export default function LeadsHeader() {
  return (
    <PageHeaderWithActions
      title="Leads"
      subtitle="View and manage all of your leads."
      renderActions={() => (
        <Button href="leads/new" color="primary">
          New Lead
        </Button>
      )}
    />
  );
}
