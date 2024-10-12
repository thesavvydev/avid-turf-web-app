"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddJob<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const insert = {
    address: fields.address as string,
    business_id: fields.business_id as string,
    business_location_id: Number(fields.business_location_id) as number,
    city: fields.city as string,
    creator_id: fields.creator_id as string,
    closer_id: fields.closer_id as string,
    email: fields.email as string,
    installer_id:
      fields.installer_id === "" ? null : (fields.installer_id as string),
    full_name: fields.full_name as string,
    phone: fields.phone as string,
    postal_code: fields.postal_code as string,
    state: fields.state as string,
    status: fields.status as Database["public"]["Enums"]["location_job_status"],
  };

  const { data, error } = await supabase
    .from("business_location_jobs")
    .insert(insert)
    .select("id")
    .single();

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(insert),
    message: `Created new job`,
    record_id: data.id.toString(),
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.creator_id as string,
  });

  const origin = headers().get("origin");
  return redirect(
    `${origin}/manage/${fields.business_id}/location/${fields.business_location_id}/job/${data.id}`,
  );
}
