import {
  formatAsReadableDate,
  formatEmptyOrUndefinedWithPlaceholder,
} from "@/utils/formatter";
import { CalendarIcon } from "lucide-react";
import { IJob } from "@/types/job";
import { Card } from "flowbite-react";

type TJobTimelineCard = {
  job: IJob;
};

export default function JobTimelineCard({ job }: TJobTimelineCard) {
  return (
    <Card className="grid gap-4">
      <h6 className="text-lg font-semibold tracking-tighter">Timeline</h6>
      <dl className="grid divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex items-center gap-2 py-2">
          <dt className="flex grow items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="size-4" /> Created
          </dt>
          <dd className="text-nowrap">
            {formatAsReadableDate(job.created_at)}
          </dd>
        </div>
        <div className="flex items-center gap-2 py-2">
          <dt className="flex grow items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="size-4" /> Installation
          </dt>
          <dd className="text-nowrap">
            {formatEmptyOrUndefinedWithPlaceholder<string>(
              "Not Scheduled",
              "",
              formatAsReadableDate,
            )}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
