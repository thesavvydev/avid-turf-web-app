"use client";

import { Tables } from "@/types/supabase";
import { Button, Timeline } from "flowbite-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { CodeIcon } from "lucide-react";
dayjs.extend(relativeTime);

type TLog = Tables<"business_logs"> & {
  profile: Tables<"profiles">;
};

export default function JobHistoryTimelineItem({ log }: { log: TLog }) {
  const [showMore, setShowMore] = useState(true);

  return (
    <Timeline.Item key={log.id} className="mb-6">
      <Timeline.Point />
      <Timeline.Content>
        <Timeline.Title>{log.message}</Timeline.Title>
        <Timeline.Time>{`${dayjs(log.created_at).fromNow()} by ${log.profile.full_name}`}</Timeline.Time>
        {log.snapshot && (
          <>
            <Button
              className="my-2"
              color="light"
              size="xs"
              onClick={() => setShowMore((prevState) => !prevState)}
            >
              <CodeIcon className="mr-2 size-4" />
              {`${showMore ? "Hide" : "Show"} snapshot`}
            </Button>
            {showMore && (
              <Timeline.Body className="overflow-x-scroll rounded bg-gray-700 p-4 text-gray-100">
                <pre className="text-xs">
                  {JSON.stringify(
                    JSON.parse(log.snapshot as string),
                    undefined,
                    2,
                  )}
                </pre>
              </Timeline.Body>
            )}
          </>
        )}
      </Timeline.Content>
    </Timeline.Item>
  );
}
