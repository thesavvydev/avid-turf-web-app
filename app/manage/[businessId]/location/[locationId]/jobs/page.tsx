import { Database, Tables } from "@/types/supabase";
import { formatAsCompactNumber, formatAsPercentage } from "@/utils/formatter";
import { percentageChange } from "@/utils/percentage-change";
import { createClient } from "@/utils/supabase/server";
import {
  ArchiveIcon,
  CaptionsOffIcon,
  FilterIcon,
  LandmarkIcon,
  SignpostIcon,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import JobsHeader from "./jobs-header";
import JobsTable from "./jobs-table";

export const metadata = {
  title: "Jobs",
  description: "",
};

function JobStatusTiles({
  previousWeek,
  jobsCount,
  statusCounts,
}: {
  previousWeek: Partial<Tables<"business_location_jobs">>[] | null;
  jobsCount: number;
  statusCounts: {
    [k in Database["public"]["Enums"]["location_job_status"]]: number;
  };
}) {
  const previousWeekStatusCounts = (previousWeek ?? []).reduce(
    (dictionary, job) => {
      dictionary[
        job.status as Database["public"]["Enums"]["location_job_status"]
      ] =
        Number(
          dictionary[
            job.status as Database["public"]["Enums"]["location_job_status"]
          ] ?? 0,
        ) + 1;

      return dictionary;
    },
    {
      new: 0,
      scheduled: 0,
      pending: 0,
      approved: 0,
      billed: 0,
      canceled: 0,
      complete: 0,
    },
  );

  const tiles = [
    {
      name: "All",
      value: formatAsCompactNumber(jobsCount),
      weekly_change: percentageChange(previousWeek?.length ?? 0, jobsCount),
      classNames: "fill-lime-600/20 stroke-lime-600",
      progressClassNames: "text-lime-700 dark:text-lime-800 ",
      icon: WorkflowIcon,
      progress: 0,
    },
    {
      name: "New",
      status: "new",
      value: formatAsCompactNumber(statusCounts.new),
      weekly_change: percentageChange(
        previousWeekStatusCounts.new,
        statusCounts.new,
      ),
      classNames: "fill-indigo-600/20 stroke-indigo-600",
      progressClassNames: "text-indigo-700 dark:text-indigo-800 ",
      icon: SignpostIcon,
      progress: 100 - (statusCounts.new / jobsCount) * 100,
    },
    {
      name: "Scheduled",
      status: "scheduled",
      value: formatAsCompactNumber(statusCounts.scheduled),
      weekly_change: percentageChange(
        previousWeekStatusCounts.scheduled,
        statusCounts.scheduled,
      ),
      classNames: "fill-green-600/20 stroke-green-600",
      progressClassNames: "text-green-700 dark:text-green-800 ",
      icon: LandmarkIcon,
      progress: 100 - (statusCounts.scheduled / jobsCount) * 100,
    },
    {
      name: "Canceled",
      status: "canceled",
      value: formatAsCompactNumber(statusCounts.canceled),
      weekly_change: percentageChange(
        previousWeekStatusCounts.canceled,
        statusCounts.canceled,
      ),
      classNames: "fill-red-600/20 stroke-red-600",
      progressClassNames: "text-red-700 dark:text-red-800 ",
      icon: CaptionsOffIcon,
      progress: 100 - (statusCounts.canceled / jobsCount) * 100,
    },
    {
      name: "Complete",
      status: "complete",
      value: formatAsCompactNumber(statusCounts.complete),
      weekly_change: percentageChange(
        previousWeekStatusCounts.complete,
        statusCounts.complete,
      ),
      classNames: "fill-gray-300/20 stroke-gray-300",
      progressClassNames: "text-gray-600 dark:text-gray-800",
      icon: ArchiveIcon,
      progress: 100 - (statusCounts.complete / jobsCount) * 100,
    },
  ];

  return (
    <div className="flex max-w-full items-center divide-x divide-gray-100 overflow-x-auto rounded-lg border border-gray-100 bg-white py-4 shadow-lg shadow-gray-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900 lg:py-6">
      {tiles.map((tile) => (
        <div
          key={tile.name}
          className="flex grow items-center justify-center gap-4 px-4 lg:gap-6"
        >
          <div className="relative size-16 flex-shrink-0">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                className="stroke-current text-gray-200 dark:text-neutral-700"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                className={twMerge(
                  "stroke-current text-lime-600 dark:text-lime-500",
                  tile.progressClassNames,
                )}
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={tile.progress}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <tile.icon
                className={twMerge(
                  "size-6 fill-lime-600/20 stroke-lime-600 stroke-2",
                  tile.classNames,
                )}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h6 className="whitespace-nowrap font-medium">{tile.name}</h6>
              <Link
                href={tile.status ? `?status=${tile.status ?? ""}` : "?"}
                className="rounded p-1 hover:bg-gray-50"
              >
                <FilterIcon className="size-5" />
              </Link>
            </div>
            <p className="text-gray-400">
              {formatAsCompactNumber(Number(tile.value))}
            </p>
            <p className="whitespace-nowrap text-xs">
              Weekly Change{" "}
              <span
                className={twMerge(
                  tile.weekly_change > 0
                    ? "text-green-500 dark:text-green-300"
                    : "text-red-500 dark:text-red-300",
                )}
              >
                {formatAsPercentage(tile.weekly_change)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface IJob extends Tables<"business_location_jobs"> {
  closer: Partial<Tables<"profiles">>;
  installer: Partial<Tables<"profiles">>;
}

export default async function Page({
  searchParams: {
    page = 0,
    per_page = 10,
    created_after = null,
    created_before = null,
    status = "",
    closer_id = "",
    installer_id = "",
  },
  params: { locationId = "" },
}) {
  const supabase = createClient();

  const startRange =
    page > 1
      ? Number(page - 1) * Number(per_page)
      : Number(page) * Number(per_page);

  const endRange = page > 1 ? startRange + Number(per_page) : per_page;

  const fetchAllJobs = supabase
    .from("business_location_jobs")
    .select("status", { count: "exact" })
    .eq("business_location_id", locationId);

  const lastWeekDate = new Date(new Date().setDate(new Date().getDate() - 5));
  const fetchAllPreviousWeekJobs = supabase
    .from("business_location_jobs")
    .select("id,status")
    .eq("business_location_id", locationId)
    .lte("created_at", lastWeekDate.toISOString());

  const fetchTableData = supabase
    .from("business_location_jobs")
    .select(
      "*, closer: profiles!closer_id(id,full_name,avatar_url), installer: profiles!installer_id(id,full_name,avatar_url)",
      { count: "exact" },
    )
    .match({
      business_location_id: locationId,
      ...(status ? { status } : {}),
      ...(closer_id ? { closer_id } : {}),
      ...(installer_id ? { installer_id } : {}),
    })
    .range(startRange, endRange)
    .gte("created_at", new Date(created_after ?? "0").toISOString())
    .lte("created_at", new Date(created_before ?? "3000-01-01").toISOString())
    .order("created_at", { ascending: false });

  const [
    { data: all, count },
    { data: previousWeek },
    { data, error, count: paginatedTotal },
  ] = await Promise.all([
    fetchAllJobs,
    fetchAllPreviousWeekJobs,
    fetchTableData,
  ]);

  if (error) throw error;

  const statusCounts = (all ?? []).reduce(
    (dictionary, job) => {
      dictionary[job.status] = Number(dictionary[job.status] ?? 0) + 1;

      return dictionary;
    },
    {
      new: 0,
      scheduled: 0,
      pending: 0,
      approved: 0,
      billed: 0,
      canceled: 0,
      complete: 0,
    },
  );

  return (
    <>
      <JobsHeader />
      <JobStatusTiles
        previousWeek={previousWeek}
        jobsCount={count ?? 0}
        statusCounts={statusCounts}
      />
      <JobsTable
        jobsCount={count ?? 0}
        jobs={data as IJob[]}
        paginatedTotal={paginatedTotal ?? 0}
        statusCounts={statusCounts}
      />
    </>
  );
}
