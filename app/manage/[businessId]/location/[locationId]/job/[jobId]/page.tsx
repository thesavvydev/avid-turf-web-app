import { JOB_PAYMENT_TYPES } from "@/constants/job-payment-types";
import { IJob, IJobMessage } from "@/types/job";
import { formatAsCurrency } from "@/utils/formatter";
import { createClient } from "@/utils/supabase/server";
import { Card, List, ListItem } from "flowbite-react";
import { notFound } from "next/navigation";
import JobEmployeesCard from "./job-employees-card";
import JobLineitemsCard from "./job-lineitems-card";
import JobLocationCard from "./job-location-card";
import JobMediaCard from "./job-media-card";
import JobMessagesCard from "./job-messages-card";
import JobTimelineCard from "./job-timeline-card";

export default async function Page({ params: { jobId = "" } }) {
  const supabase = createClient();

  const fetchJob = supabase
    .from("business_location_jobs")
    .select(
      "*,  media: business_location_job_media(*), profiles: business_location_job_profiles(*, profile: profile_id(*)), products: business_location_job_products(*, product: business_products(*))",
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
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:col-span-2 xl:gap-6">
        <JobLocationCard job={job} />
        <div className="grid gap-4 xl:gap-6">
          <Card className="group">
            <h6 className="text-lg font-semibold tracking-tighter">
              Payment Information
            </h6>
            <List unstyled>
              <ListItem className="flex items-center justify-between gap-2">
                <dt>Down payment collected</dt>
                <dl>{formatAsCurrency(Number(job.down_payment_collected))}</dl>
              </ListItem>
              <ListItem className="flex items-center justify-between gap-2">
                <dt>Payment Type</dt>
                <dl>{JOB_PAYMENT_TYPES[job.payment_type].name}</dl>
              </ListItem>
            </List>
          </Card>
          <JobTimelineCard job={job} />
        </div>
        <div className="md:col-span-2">
          <JobLineitemsCard job={job} />
        </div>
        <div className="md:col-span-2">
          <JobMediaCard media={job.media ?? []} />
        </div>
      </div>
      <div className="flex flex-col gap-4 xl:gap-6">
        <JobEmployeesCard job={job} />
        <JobMessagesCard messages={messages} />
      </div>
    </div>
  );
}
