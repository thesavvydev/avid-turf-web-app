"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddLead<T>(...args: ServerActionWithState<T>) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { data, error } = await supabase
    .from("business_location_leads")
    .insert({
      address: fields.address as string,
      budget: Number(fields.budget) as number,
      business_id: fields.business_id as string,
      business_location_id: Number(fields.business_location_id) as number,
      city: fields.city as string,
      completion_date: fields.completion_date as string,
      creator_id: fields.creator_id as string,
      email: fields.email as string,
      follow_up_date: fields.follow_up_date as string,
      name: fields.name as string,
      notes: fields.notes as string,
      phone: fields.phone as string,
      postal_code: fields.postal_code as string,
      score: Number(fields.score) as number,
      source: fields.source as Database["public"]["Enums"]["lead_sources"],
      state: fields.state as string,
      status: fields.status as Database["public"]["Enums"]["lead_statuses"],
      type: fields.type as Database["public"]["Enums"]["lead_type"],
    })
    .select("id")
    .single();

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  const origin = (await headers()).get("origin");
  return redirect(
    `${origin}/manage/${fields.business_id}/location/${fields.location_id}/lead/${data.id}`,
  );
}
