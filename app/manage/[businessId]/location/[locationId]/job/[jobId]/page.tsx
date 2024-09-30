import { createClient } from "@/utils/supabase/server";
import { Card, List, ListItem } from "flowbite-react";
import { notFound } from "next/navigation";
import JobCustomerCard from "./job-customer-card";
import JobEmployeesCard from "./job-employees-card";
import JobHistoryTimeline from "./job-history-timeline";
import JobLocationCard from "./job-location-card";
import JobMessagesCard from "./job-messages-card";
import JobTimelineCard from "./job-timeline-card";
import { IJob, IJobMessage } from "@/types/job";

export default async function Page({ params: { jobId = "" } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business_location_jobs")
    .select(
      "*, customer: customer_id(*), closer: closer_id(*), installer: installer_id(*)",
    )
    .eq("id", jobId)
    .limit(1)
    .returns<IJob>()
    .maybeSingle();
  if (error) throw error;
  if (!data) notFound();

  const { data: messages } = await supabase
    .from("business_location_job_messages")
    .select("*, author: author_id(*)")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<IJobMessage[]>();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
      <div className="lg:col-span-2">
        <Card>
          <h6 className="mb-6 text-lg font-semibold tracking-tighter">Media</h6>
          <div className="flex flex-wrap gap-2">
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
            <div className="size-20 bg-gray-200 dark:bg-gray-700" />
          </div>
        </Card>
      </div>

      <div className="row-span-3">
        <Card>
          <div className="grid gap-4 lg:gap-6">
            <div className="grid gap-4 border-b border-dashed border-gray-200 pb-4 dark:border-gray-700 lg:gap-6 lg:pb-6">
              <h6 className="text-lg font-semibold tracking-tighter">
                Quick Links
              </h6>

              <List>
                <ListItem>Send Contract</ListItem>
                <ListItem>Add Appointment</ListItem>
                <ListItem>View Invoice</ListItem>
              </List>
            </div>
            <JobTimelineCard job={data} />
            <JobCustomerCard job={data} />
            <JobEmployeesCard job={data} />
          </div>
        </Card>
      </div>

      <JobMessagesCard messages={messages} />
      <JobLocationCard job={data} />
      <div className="lg:col-span-2">
        <Card>
          <h6 className="mb-6 text-lg font-semibold tracking-tighter">
            History
          </h6>
          <JobHistoryTimeline />
        </Card>
      </div>
    </div>
  );
}
