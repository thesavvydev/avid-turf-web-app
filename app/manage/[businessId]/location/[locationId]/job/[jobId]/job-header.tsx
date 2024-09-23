"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Breadcrumb, Button, Dropdown } from "flowbite-react";
import { ChevronLeftIcon, EditIcon, PrinterIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function JobHeader() {
  const { businessId, locationId, jobId } = useParams();
  return (
    <PageHeaderWithActions
      title={`Order #${jobId}`}
      subtitle="Job started on ..."
      renderActions={() => (
        <div className="flex items-center gap-4">
          <Dropdown label="Lead" color="light">
            <Dropdown.Item>Lead</Dropdown.Item>
            <Dropdown.Item>In Progress</Dropdown.Item>
            <Dropdown.Item>Complete</Dropdown.Item>
            <Dropdown.Item>Archive</Dropdown.Item>
          </Dropdown>
          <Button color="light">
            <div className="flex items-center gap-1">
              <PrinterIcon className="size-5" />
              Print
            </div>
          </Button>
          <Button color="primary">
            <div className="flex items-center gap-1">
              <EditIcon className="size-5" />
              Edit
            </div>
          </Button>
        </div>
      )}
      renderBreadcrumbs={() => (
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item
            href={`/manage/${businessId}/location/${locationId}/jobs`}
            icon={() => <ChevronLeftIcon className="mr-2" />}
          >
            Back to Jobs
          </Breadcrumb.Item>
        </Breadcrumb>
      )}
    />
  );
}
