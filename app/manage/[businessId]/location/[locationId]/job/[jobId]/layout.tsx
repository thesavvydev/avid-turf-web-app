import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import JobHeader from "./job-header";
import { IJob } from "./types";

type TLayout = {
  children: ReactNode;
  params: {
    jobId: string;
  };
};

export default async function Layout({ children, params: { jobId } }: TLayout) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business_location_jobs")
    .select("*, closer: closer_id(*), installer: installer_id(*)")
    .eq("id", jobId)
    .limit(1)
    .returns<IJob>()
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return (
    <>
      <JobHeader job={data} />
      {children}
    </>
  );
}
