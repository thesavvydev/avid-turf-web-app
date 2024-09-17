"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddLead<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { data, error } = await supabase
    .from("location_leads")
    .insert({
      budget: Number(fields.budget) as number,
      score: Number(fields.score) as number,
      creator_id: fields.creator_id as string,
      name: fields.name as string,
      source: fields.source as Database["public"]["Enums"]["lead_sources"],
      status: fields.status as Database["public"]["Enums"]["lead_statuses"],
      location_id: Number(fields.location_id) as number,
      phone: fields.phone as string,
      email: fields.email as string,
      address: fields.address as string,
      city: fields.city as string,
      state: fields.state as string,
      postal_code: fields.postal_code as string,
      type: fields.type as Database["public"]["Enums"]["lead_type"],
      completion_date: fields.completion_date as string,
      follow_up_date: fields.follow_up_date as string,
      notes: fields.notes as string,
    })
    .select("id")
    .single();

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  const origin = headers().get("origin");
  return redirect(`${origin}/manage/${fields.location_id}/lead/${data.id}`);
}
