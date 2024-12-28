import { Tables } from "./supabase";

export interface ILocationEmployee
  extends Tables<"business_location_profiles"> {
  profile: Tables<"profiles"> | null;
}

export interface ILocationCustomer
  extends Tables<"business_location_customers"> {
  creator?: Tables<"profiles">;
  jobs?: Tables<"business_location_jobs">[];
}
