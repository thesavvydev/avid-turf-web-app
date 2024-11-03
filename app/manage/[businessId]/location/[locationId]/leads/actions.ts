"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function UpdateLead<T>(...args: ServerActionWithState<T>) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { error } = await supabase
    .from("business_location_leads")
    .update({
      budget: Number(fields.budget) as number,
      score: Number(fields.score) as number,
      name: fields.name as string,
      source: fields.source as Database["public"]["Enums"]["lead_sources"],
      status: fields.status as Database["public"]["Enums"]["lead_statuses"],
    })
    .eq("id", fields.id as string);

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  return formStateResponse({ success: true, dismiss: true });
}

export async function DeleteLead(id: number) {
  const supabase = await createSupabaseServerClient();
  return supabase.from("business_location_leads").delete().eq("id", id);
}
