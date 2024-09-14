import { formatAsCompactNumber, formatAsPercentage } from "@/utils/formatter";
import { createClient } from "@/utils/supabase/server";
import { Alert } from "flowbite-react";
import {
  ArchiveIcon,
  CaptionsOffIcon,
  InfoIcon,
  LandmarkIcon,
  SignpostIcon,
  WorkflowIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import LeadsHeader from "./leads-header";
import LeadsTable from "./leads-table";

export const metadata = {
  title: "Leads",
  description: "",
};

function LeadStatusTiles() {
  const tiles = [
    {
      name: "All",
      value: 1_000_000,
      weekly_change: 0.05,
      classNames: "fill-lime-600/20 stroke-lime-600",
      progressClassNames: "text-lime-700 dark:text-lime-800 ",
      icon: WorkflowIcon,
    },
    {
      name: "New",
      value: 20_000,
      weekly_change: 0.15,
      classNames: "fill-indigo-600/20 stroke-indigo-600",
      progressClassNames: "text-indigo-700 dark:text-indigo-800 ",
      icon: SignpostIcon,
    },
    {
      name: "Qualified",
      value: 1_000,
      weekly_change: -0.05,
      classNames: "fill-green-600/20 stroke-green-600",
      progressClassNames: "text-green-700 dark:text-green-800 ",
      icon: LandmarkIcon,
    },
    {
      name: "Follow Up",
      value: 20_000,
      weekly_change: 0.15,
      classNames: "fill-red-600/20 stroke-red-600",
      progressClassNames: "text-red-700 dark:text-red-800 ",
      icon: CaptionsOffIcon,
    },
    {
      name: "Closed",
      value: 1_000,
      weekly_change: -0.05,
      classNames: " fill-gray-300/20 stroke-gray-300",
      progressClassNames: "text-gray-600 dark:text-gray-800",
      icon: ArchiveIcon,
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
                strokeDashoffset="65"
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
            <p className="text-gray-400">{formatAsCompactNumber(tile.value)}</p>
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

export default async function Page({ searchParams: { limit = 10 } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("location_leads")
    .select("*")
    .limit(limit);

  if (error) throw error;

  return (
    <>
      <LeadsHeader />
      {data.length === 0 ? (
        <Alert color="failure" icon={() => <InfoIcon className="mr-2" />}>
          <span className="font-medium">No rows found!</span> If this is an
          error, get help.
        </Alert>
      ) : (
        <>
          <LeadStatusTiles />
          <LeadsTable leads={data} />
        </>
      )}
    </>
  );
}
