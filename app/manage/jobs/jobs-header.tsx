"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Button } from "flowbite-react";

export default function JobsHeader() {
  return (
    <PageHeaderWithActions
      title="Jobs"
      subtitle="View and manage all of your jobs."
      renderActions={() => <Button color="primary">New Job</Button>}
    />
  );
}
