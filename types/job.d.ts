import { Tables } from "./supabase";

export interface IJob extends Tables<"business_location_jobs"> {
  creator?: Tables<"profiles">;
  customer?: Tables<"profiles">;
  installer?: Tables<"profiles">;
  closer?: Tables<"profiles">;
  messages?: IJobMessage[];
  media?: Tables<"business_location_job_media">[];
}

export interface IJobMessage extends Tables<"business_location_job_messages"> {
  author?: Tables<"profiles">;
  business_location_job?: Tables<"business_location_jobs">;
}
