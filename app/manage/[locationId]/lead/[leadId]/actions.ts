"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export async function UpdateStatus(
  id: number,
  status: Database["public"]["Enums"]["lead_statuses"],
) {
  const supabase = createClient();

  return supabase.from("location_leads").update({ status }).eq("id", id);
}
