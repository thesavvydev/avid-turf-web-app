import {
  formatAsReadableDate,
  formatEmptyOrUndefinedWithPlaceholder,
} from "@/utils/formatter";
import { CalendarIcon } from "lucide-react";
import { IJob } from "@/types/job";

type TJobTimelineCard = {
  job: IJob;
};

export default function JobTimelineCard({ job }: TJobTimelineCard) {
  return (
    <div className="grid gap-4 border-b border-dashed border-gray-200 pb-4 dark:border-gray-700 lg:gap-6 lg:pb-6">
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
            <CalendarIcon className="size-4" /> Scheduled
          </dt>
          <dd className="text-nowrap">
            {formatEmptyOrUndefinedWithPlaceholder<string>(
              "--",
              "",
              formatAsReadableDate,
            )}
          </dd>
        </div>
        <div className="flex items-center gap-2 py-2">
          <dt className="flex grow items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="size-4" /> Service Complete
          </dt>
          <dd className="text-nowrap">
            {formatEmptyOrUndefinedWithPlaceholder<string>(
              "--",
              "",
              formatAsReadableDate,
            )}
          </dd>
        </div>
        <div className="flex items-center gap-2 py-2">
          <dt className="flex grow items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="size-4" /> Service Approved
          </dt>
          <dd className="text-nowrap">
            {formatEmptyOrUndefinedWithPlaceholder<string>(
              "--",
              "",
              formatAsReadableDate,
            )}
          </dd>
        </div>
        <div className="flex items-center gap-2 py-2">
          <dt className="flex grow items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="size-4" /> Service Billed
          </dt>
          <dd className="text-nowrap">
            {formatEmptyOrUndefinedWithPlaceholder<string>(
              "--",
              "",
              formatAsReadableDate,
            )}
          </dd>
        </div>
        <div className="flex items-center gap-2 py-2">
          <dt className="flex grow items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="size-4" /> Payment Received
          </dt>
          <dd className="text-nowrap">
            {formatEmptyOrUndefinedWithPlaceholder<string>(
              "--",
              "",
              formatAsReadableDate,
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
