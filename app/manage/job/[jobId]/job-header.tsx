"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Breadcrumb, Dropdown, Tabs, theme } from "flowbite-react";
import { ChevronDown, ChevronLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

function JobTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const { jobId } = useParams();

  const tabs = [
    {
      title: "Overview",
      href: `/manage/job/${jobId}`,
      isActive: pathname === `/manage/job/${jobId}`,
    },
    {
      title: "Proposals",
      href: `/manage/job/${jobId}/proposals`,
      isActive: pathname.startsWith(`/manage/job/${jobId}/proposals`),
    },
    {
      title: "Media",
      href: `/manage/job/${jobId}/media`,
      isActive: pathname.startsWith(`/manage/job/${jobId}/media`),
    },
    {
      title: "Billing",
      href: `/manage/job/${jobId}/billing`,
      isActive: pathname.startsWith(`/manage/job/${jobId}/billing`),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Tabs
        aria-label="Job tabs"
        className="hidden md:flex"
        onActiveTabChange={(tabIndex: number) =>
          router.push(tabs[tabIndex].href)
        }
        variant="fullWidth"
        theme={{
          base: twMerge(theme.tabs.base, "gap-0 p-2 pb-0"),
          tabpanel: "hidden",
          tablist: {
            tabitem: {
              variant: {
                fullWidth: {
                  base: twMerge(
                    theme.tabs.tablist.tabitem.variant.fullWidth.base,
                    "bg-gray-100 dark:bg-gray-800 text-base",
                  ),
                  active: {
                    on: twMerge(
                      theme.tabs.tablist.tabitem.variant.fullWidth.active.on,
                      "bg-white dark:bg-gray-900 focus:ring-primary-200 dark:focus:bg-primary-900 text-gray-600 dark:text-gray-400 focus:bg-white dark:focus:bg-gray-900",
                    ),
                    off: twMerge(
                      theme.tabs.tablist.tabitem.variant.fullWidth.active.on,
                      "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
                    ),
                  },
                },
              },
            },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Item key={tab.title} title={tab.title} active={tab.isActive} />
        ))}
      </Tabs>
      <div className="md:hidden">
        <Dropdown
          label=""
          inline
          renderTrigger={() => (
            <div className="bg-whtie flex grow items-center justify-between gap-2 bg-white p-4 dark:bg-gray-900">
              {tabs.find((tab) => tab.isActive)?.title}
              <ChevronDown />
            </div>
          )}
        >
          {tabs.map((tab) => (
            <Dropdown.Item
              key={tab.title}
              href={tab.href}
              className={twMerge(tab.isActive ? "font-bold" : "")}
            >
              {tab.title}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}

export default function JobHeader() {
  return (
    <PageHeaderWithActions
      title="Job"
      subtitle="View and manage this job."
      renderActions={() => (
        <Dropdown label="New" color="primary">
          <Dropdown.Item>Proposal</Dropdown.Item>
          <Dropdown.Item>Photos</Dropdown.Item>
        </Dropdown>
      )}
      renderBreadcrumbs={() => (
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item
            href="/manage/jobs"
            icon={() => <ChevronLeftIcon className="mr-2" />}
          >
            Back to Jobs
          </Breadcrumb.Item>
        </Breadcrumb>
      )}
    >
      <nav className="container">
        <JobTabs />
      </nav>
    </PageHeaderWithActions>
  );
}
