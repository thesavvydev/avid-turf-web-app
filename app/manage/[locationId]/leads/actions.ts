"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export async function AddLead<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { error } = await supabase.from("location_leads").insert({
    budget: Number(fields.budget) as number,
    score: Number(fields.score) as number,
    creator_id: fields.creator_id as string,
    name: fields.name as string,
    source: fields.source as Database["public"]["Enums"]["lead_sources"],
    status: fields.status as Database["public"]["Enums"]["lead_statuses"],
    location_id: Number(fields.location_id) as number,
  });

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  return formStateResponse({ success: true, dismiss: true });
}
