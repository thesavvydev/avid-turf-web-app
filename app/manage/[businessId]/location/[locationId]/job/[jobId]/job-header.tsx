"use client";

import { IJob } from "@/types/job";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { Breadcrumb, Button, Dropdown, Tooltip } from "flowbite-react";
import {
  ChevronLeftIcon,
  HardHatIcon,
  MailIcon,
  PhoneCallIcon,
  PhoneIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import PageTabs from "@/components/page-tabs";
import { LOCATION_JOB_STATUS } from "@/constants/location-job-status";
import UpdateCustomerDrawer from "./update-customer-drawer";

export default function JobHeader({ job }: { job: IJob }) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const { businessId, locationId, jobId } = useParams();

  const handleUpdateJobStatus =
    (status: Database["public"]["Enums"]["location_job_status"]) =>
    async () => {
      await supabase
        .from("business_location_jobs")
        .update({ status })
        .eq("id", jobId as string);

      router.refresh();
    };

  const tabs = [
    {
      href: `/manage/${businessId}/location/${locationId}/job/${jobId}`,
      title: "Dashboard",
    },
    {
      href: `/manage/${businessId}/location/${locationId}/job/${jobId}/scheduling`,
      title: "Scheduling",
    },
    {
      href: `/manage/${businessId}/location/${locationId}/job/${jobId}/time-sheets`,
      title: "Time Sheets",
    },
    {
      href: `/manage/${businessId}/location/${locationId}/job/${jobId}/documents`,
      title: "Documents",
    },
    {
      href: `/manage/${businessId}/location/${locationId}/job/${jobId}/invoices`,
      title: "Invoices",
    },
    {
      href: `/manage/${businessId}/location/${locationId}/job/${jobId}/log`,
      title: "Log",
    },
  ];

  const activePageTabTitle = tabs.find((tab) => tab.href === pathname);

  return (
    <>
      <header className="space-y-4 text-gray-500 dark:text-gray-300">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item
            href={`/manage/${businessId}/location/${locationId}/jobs`}
            icon={() => <ChevronLeftIcon className="mr-1" />}
          >
            Back to Jobs
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
          <hgroup>
            <span className="text-3xl font-semibold">{job.full_name}</span>
            <h1 className="flex items-center gap-1 text-sm text-gray-400">
              <HardHatIcon className="size-5" />
              {`Job #${jobId}${activePageTabTitle ? ` ${activePageTabTitle.title}` : ""}`}
            </h1>
          </hgroup>
          <div className="flex flex-wrap gap-2">
            <UpdateCustomerDrawer
              job={job}
              trigger={(setIsUpdateCustomerDrawerVisible) => (
                <Tooltip content={job.full_name}>
                  <Button
                    color="light"
                    className="group whitespace-nowrap"
                    onClick={() =>
                      setIsUpdateCustomerDrawerVisible(
                        (prevState) => !prevState,
                      )
                    }
                  >
                    <SettingsIcon className="mr-1 size-5" />
                    Edit
                  </Button>
                </Tooltip>
              )}
            />
            <Tooltip content={`Email ${job.email}`}>
              <Button color="light" className="group">
                <MailIcon className="size-5 group-hover:hidden" />
                <SendIcon className="hidden size-5 group-hover:block" />
              </Button>
            </Tooltip>
            <Tooltip content={`Call ${job.phone}`}>
              <Button color="light" className="group">
                <PhoneIcon className="size-5 group-hover:hidden" />
                <PhoneCallIcon className="hidden size-5 group-hover:block" />
              </Button>
            </Tooltip>
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
          </div>
        </div>
        <PageTabs>
          {tabs.map((tab) => (
            <PageTabs.Tab
              key={tab.title}
              href={tab.href}
              active={pathname === tab.href}
            >
              {tab.title}
            </PageTabs.Tab>
          ))}
        </PageTabs>
      </header>
    </>
  );
}
