import { JOB_TYPES } from "@/constants/job-types";
import { IJob, IJobMessage } from "@/types/job";
import { formatAsCurrency } from "@/utils/formatter";
import { createClient } from "@/utils/supabase/server";
import { Button, Card, List, ListItem } from "flowbite-react";
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
      "*, customer: customer_id(*), media: business_location_job_media(*), profiles: business_location_job_profiles(*, profile: profile_id(*))",
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
    <div className="grid gap-4 md:grid-cols-3">
      <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
        <JobLocationCard job={job} />
        <div className="grid gap-4">
          <Card className="group">
            <h6 className="text-lg font-semibold tracking-tighter">Info</h6>
            <List unstyled>
              <ListItem className="flex items-center justify-between gap-2">
                <dt>Type</dt>
                <dl>{JOB_TYPES[job.type].name}</dl>
              </ListItem>
              <ListItem className="flex items-center justify-between gap-2">
                <dt>Total Sq Ft</dt>
                <dl>{job.total_sq_ft}</dl>
              </ListItem>
              <ListItem className="flex items-center justify-between gap-2">
                <dt>Price Per Sq Ft</dt>
                <dl>{formatAsCurrency(Number(job.price_per_sq_ft))}</dl>
              </ListItem>
              <ListItem className="flex items-center justify-between gap-2 border-t border-gray-400 py-2">
                <dt>Total Cost</dt>
                <dl>{formatAsCurrency(Number(job.total_cost))}</dl>
              </ListItem>
            </List>
          </Card>
          <JobTimelineCard job={job} />
        </div>
        <div className="md:col-span-2">
          <JobMediaCard media={job.media ?? []} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <List unstyled>
            <ListItem className="flex items-center justify-between gap-2">
              <dt>Financing</dt>
              <dl>{job.financing ? "Yes" : "No"}</dl>
            </ListItem>
            <ListItem className="flex items-center justify-between gap-2">
              <dt>Down Payment Collected</dt>
              <dl>{formatAsCurrency(Number(job.down_payment_collected))}</dl>
            </ListItem>
          </List>
          <Button color="light">Send document for docusign</Button>
        </Card>
        <JobEmployeesCard job={job} />
      </div>
      <div className="md:col-span-3">
        <JobMessagesCard messages={messages} />
      </div>
    </div>
  );
}
