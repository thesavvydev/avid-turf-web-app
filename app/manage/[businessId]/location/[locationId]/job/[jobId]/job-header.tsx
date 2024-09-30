"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { LOCATION_JOB_STATUS } from "@/constants/location-job-status";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { Breadcrumb, Button, Dropdown } from "flowbite-react";
import { ChevronLeftIcon, ShareIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { IJob } from "@/types/job";

export default function JobHeader({ job }: { job: IJob }) {
  const supabase = createClient();
  const router = useRouter();
  const { businessId, locationId, jobId } = useParams();

  const handleUpdateJobStatus =
    (status: Database["public"]["Enums"]["location_job_status"]) =>
    async () => {
      await supabase
        .from("business_location_jobs")
        .update({ status })
        .eq("id", jobId);

      router.refresh();
    };

  return (
    <PageHeaderWithActions
      sticky
      title={`Job #${jobId} `}
      subtitle={`Job started on ${new Date(job.created_at).toLocaleDateString()}. Installer: ${job.installer?.full_name ?? "No Installer"}. Closer: ${job.closer?.full_name ?? "No Closer"}`}
      renderActions={() => (
        <div className="flex items-center gap-4">
          <Dropdown
            label={LOCATION_JOB_STATUS[job.status].name}
            color={LOCATION_JOB_STATUS[job.status].color}
          >
            {Object.entries(LOCATION_JOB_STATUS).map(
              ([locationJobStatusKey, locationJobStatus]) => {
                return (
                  <Dropdown.Item
                    key={locationJobStatusKey}
                    onClick={handleUpdateJobStatus(
                      locationJobStatusKey as Database["public"]["Enums"]["location_job_status"],
                    )}
                  >
                    {locationJobStatus.name}
                  </Dropdown.Item>
                );
              },
            )}
          </Dropdown>
          <Button color="light">
            <ShareIcon className="size-5" />
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
