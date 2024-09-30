import { Tables } from "@/types/supabase";

export interface IJob extends Tables<"business_location_jobs"> {
  customer?: Tables<"profiles">;
  installer?: Tables<"profiles">;
  closer?: Tables<"profiles">;
}

export interface IJobMessage extends Tables<"business_location_job_messages"> {
  author?: Tables<"profiles">;
}
