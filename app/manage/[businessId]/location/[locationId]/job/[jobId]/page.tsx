import { IJob, IJobMessage } from "@/types/job";
import { createClient } from "@/utils/supabase/server";
import { Card, List, ListItem } from "flowbite-react";
import { notFound } from "next/navigation";
import JobEmployeesCard from "./job-employees-card";
import JobLocationCard from "./job-location-card";
import JobMediaCard from "./job-media-card";
import JobMessagesCard from "./job-messages-card";
import JobTimelineCard from "./job-timeline-card";

export default async function Page({ params: { jobId = "" } }) {
  const supabase = createClient();
  const fetchJob = supabase
    .from("business_location_jobs")
    .select(
      "*, customer: customer_id(*), closer: closer_id(*), installer: installer_id(*), media: business_location_job_media(*)",
    )
    .eq("id", jobId)
    .limit(1)
    .returns<IJob>()
    .single();

  const fetchMessages = supabase
    .from("business_location_job_messages")
    .select("*, author: author_id(*)")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<IJobMessage[]>();

  const [{ data, error }, { data: messages }] = await Promise.all([
    fetchJob,
    fetchMessages,
  ]);

  if (error) throw error;
  if (!data) notFound();

  const job: IJob = data;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
      <JobMessagesCard messages={messages} />
      <JobLocationCard job={job} />

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
            <JobTimelineCard job={job} />
            <JobEmployeesCard job={job} />
          </div>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <JobMediaCard media={job.media ?? []} />
      </div>
    </div>
  );
}
