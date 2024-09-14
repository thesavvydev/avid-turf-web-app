import { Tables } from "./supabase";

export type TLocationEmployee = Tables<"location_profiles"> & {
  profile: Tables<"profiles"> | null;
};
