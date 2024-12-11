import { Tables } from "./supabase";

export interface ILocationEmployee
  extends Tables<"business_location_profiles"> {
  profile: Tables<"profiles"> | null;
}
