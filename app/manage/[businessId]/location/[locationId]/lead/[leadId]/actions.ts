"use server";

import { Database } from "@/types/supabase";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function UpdateStatus(
  id: number,
  status: Database["public"]["Enums"]["lead_statuses"],
) {
  const supabase = await createSupabaseServerClient();

  return supabase
    .from("business_location_leads")
    .update({ status })
    .eq("id", id);
}
