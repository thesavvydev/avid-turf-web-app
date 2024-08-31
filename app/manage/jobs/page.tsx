import { formatAsCompactNumber, formatAsPercentage } from "@/utils/formatter";
import { Card, theme } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import JobsTable from "./jobs-table";

const tiles = [
  {
    name: "# of Jobs",
    value: 1_000_000,
    weekly_change: 0.05,
  },
  {
    name: "Completed",
    value: 20_000,
    weekly_change: 0.15,
  },
  {
    name: "Leads",
    value: 1_000,
    weekly_change: -0.05,
  },
  {
    name: "Open Proposals",
    value: 20_000,
    weekly_change: 0.15,
  },
];

export default function Page() {
  return (
    <div className="grid gap-4 lg:gap-8">
      <section className="grid grid-rows-2 grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-1 lg:gap-8">
        {tiles.map((tile) => (
          <Card
            key={tile.name}
            theme={{
              root: {
                base: "shadow-none bg-gray-50 dark:bg-gray-800",
                children: twMerge(theme.card.root.children, "p-2 lg:p-6"),
              },
            }}
          >
            <h6 className="text-xs uppercase sm:capitalize sm:text-xl font-medium text-gray-600 dark:text-gray-400">
              {tile.name}
            </h6>
            <p className="text-2xl sm:text-5xl font-black text-center text-gray-500 dark:text-gray-300">
              {formatAsCompactNumber(tile.value)}
            </p>
            <p className="text-xs text-gray-500 text-center dark:text-gray-300">
              Weekly Change{" "}
              <span
                className={twMerge(
                  tile.weekly_change > 0
                    ? "text-green-500 dark:text-green-300"
                    : "text-red-500 dark:text-red-300"
                )}
              >
                {formatAsPercentage(tile.weekly_change)}
              </span>
            </p>
          </Card>
        ))}
      </section>
      <JobsTable />
    </div>
  );
}
