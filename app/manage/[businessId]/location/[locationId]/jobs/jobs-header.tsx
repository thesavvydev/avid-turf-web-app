"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";

export default function JobsHeader() {
  const { businessId, locationId } = useParams();
  return (
    <PageHeaderWithActions
      title="Jobs"
      subtitle="View and manage all of your jobs."
      renderActions={() => (
        <Button
          href={`/manage/${businessId}/location/${locationId}/jobs/new`}
          color="primary"
        >
          New Job
        </Button>
      )}
    />
  );
}
