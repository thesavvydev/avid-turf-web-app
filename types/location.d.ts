import { Tables } from "./supabase";

export type TLocationEmployee = Tables<"business_location_profiles"> & {
  profile: Tables<"profiles"> | null;
};
