import { TLeadStatus } from "@/constants/lead-statuses";
import { Database, Tables } from "@/types/supabase";
import { formatAsCompactNumber, formatAsPercentage } from "@/utils/formatter";
import { createClient } from "@/utils/supabase/server";
import {
  ArchiveIcon,
  CaptionsOffIcon,
  LandmarkIcon,
  SignpostIcon,
  WorkflowIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import LeadsHeader from "./leads-header";
import LeadsTable from "./leads-table";
import { percentageChange } from "@/utils/percentage-change";

export const metadata = {
  title: "Leads",
  description: "",
};

function LeadStatusTiles({
  previousWeek,
  leadsCount,
  statusCounts,
}: {
  previousWeek: Partial<Tables<"location_leads">>[] | null;
  leadsCount: number;
  statusCounts: {
    [k in TLeadStatus]: number;
  };
}) {
  const previousWeekStatusCounts = (previousWeek ?? []).reduce(
    (dictionary, lead) => {
      dictionary[lead.status as Database["public"]["Enums"]["lead_statuses"]] =
        Number(
          dictionary[
            lead.status as Database["public"]["Enums"]["lead_statuses"]
          ] ?? 0,
        ) + 1;

      return dictionary;
    },
    {
      new: 0,
      qualified: 0,
      nurturing: 0,
      "follow-up": 0,
      lost: 0,
      inactive: 0,
    },
  );

  const tiles = [
    {
      name: "All",
      value: formatAsCompactNumber(leadsCount),
      weekly_change: percentageChange(previousWeek?.length ?? 0, leadsCount),
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
      progress: 100 - (statusCounts.new / leadsCount) * 100,
    },
    {
      name: "Qualified",
      status: "qualified",
      value: formatAsCompactNumber(statusCounts.qualified),
      weekly_change: percentageChange(
        previousWeekStatusCounts.qualified,
        statusCounts.qualified,
      ),
      classNames: "fill-green-600/20 stroke-green-600",
      progressClassNames: "text-green-700 dark:text-green-800 ",
      icon: LandmarkIcon,
      progress: 100 - (statusCounts.qualified / leadsCount) * 100,
    },
    {
      name: "Follow Up",
      status: "follow-up",
      value: formatAsCompactNumber(statusCounts["follow-up"]),
      weekly_change: percentageChange(
        previousWeekStatusCounts["follow-up"],
        statusCounts["follow-up"],
      ),
      classNames: "fill-red-600/20 stroke-red-600",
      progressClassNames: "text-red-700 dark:text-red-800 ",
      icon: CaptionsOffIcon,
      progress: 100 - (statusCounts["follow-up"] / leadsCount) * 100,
    },
    {
      name: "Lost",
      status: "lost",
      value: formatAsCompactNumber(statusCounts.lost),
      weekly_change: percentageChange(
        previousWeekStatusCounts.lost,
        statusCounts.lost,
      ),
      classNames: "fill-gray-300/20 stroke-gray-300",
      progressClassNames: "text-gray-600 dark:text-gray-800",
      icon: ArchiveIcon,
      progress: 100 - (statusCounts.lost / leadsCount) * 100,
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
            <h6 className="whitespace-nowrap font-medium">{tile.name}</h6>
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

export default async function Page({
  searchParams: {
    page = 0,
    per_page = 10,
    status = null,
    source = null,
    created_after = null,
    created_before = null,
  },
}) {
  const supabase = createClient();

  const { data: all, count } = await supabase
    .from("location_leads")
    .select("status", { count: "exact" });

  const lastWeekDate = new Date(new Date().setDate(new Date().getDate() - 5));

  const { data: previousWeek } = await supabase
    .from("location_leads")
    .select("id,status")
    .lte("created_at", lastWeekDate.toISOString());

  const startRange =
    page > 1
      ? Number(page - 1) * Number(per_page)
      : Number(page) * Number(per_page);

  const endRange = page > 1 ? startRange + Number(per_page) : per_page;

  const { data, error } = await supabase
    .from("location_leads")
    .select("*")
    .match({ ...(status ? { status } : {}), ...(source ? { source } : {}) })
    .range(startRange, endRange)
    .gte("created_at", new Date(created_after ?? "0").toISOString())
    .lte("created_at", new Date(created_before ?? "3000-01-01").toISOString())
    .order("created_at", { ascending: false });

  if (error) throw error;

  const { count: paginatedTotal } = await supabase
    .from("location_leads")
    .select(undefined, { count: "exact" })
    .match({ ...(status ? { status } : {}), ...(source ? { source } : {}) })
    .gte("created_at", new Date(created_after ?? "0").toISOString())
    .lte("created_at", new Date(created_before ?? "3000-01-01").toISOString());

  if (error) throw error;

  const statusCounts = (all ?? []).reduce(
    (dictionary, lead) => {
      dictionary[lead.status] = Number(dictionary[lead.status] ?? 0) + 1;

      return dictionary;
    },
    {
      new: 0,
      qualified: 0,
      nurturing: 0,
      "follow-up": 0,
      lost: 0,
      inactive: 0,
    },
  );

  return (
    <>
      <LeadsHeader />
      <LeadStatusTiles
        previousWeek={previousWeek}
        leadsCount={count ?? 0}
        statusCounts={statusCounts}
      />
      <LeadsTable
        paginatedTotal={paginatedTotal ?? 0}
        leads={data}
        leadsCount={count}
        statusCounts={statusCounts}
      />
    </>
  );
}
