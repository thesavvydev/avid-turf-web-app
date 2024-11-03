import { Tables } from "./supabase";

interface IJobProfile extends Tables<"business_location_job_profiles"> {
  profile: Tables<"profiles">;
}

interface IJobProduct extends Tables<"business_location_job_products"> {
  product: Tables<"business_products">;
}

export interface IJob extends Tables<"business_location_jobs"> {
  creator?: Tables<"profiles">;
  customer?: Tables<"profiles">;
  installer?: Tables<"profiles">;
  closer?: Tables<"profiles">;
  messages?: IJobMessage[];
  media?: Tables<"business_location_job_media">[];
  profiles?: IJobProfile[];
  products?: IJobProduct[];
}

export interface IJobMessage extends Tables<"business_location_job_messages"> {
  author?: Tables<"profiles">;
  business_location_job?: Tables<"business_location_jobs">;
}
