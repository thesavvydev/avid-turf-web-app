"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export async function UpdateJob<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { error } = await supabase
    .from("business_location_jobs")
    .update({
      address: fields.address as string,
      city: fields.city as string,
      state: fields.state as string,
      postal_code: fields.postal_code as string,
      closer_id: fields.closer_id as string,
      status:
        fields.status as Database["public"]["Enums"]["location_job_status"],
      ...(fields.installer_id
        ? { installer_id: fields.installer_id as string }
        : {}),
      ...(fields.closer_id ? { closer_id: fields.closer_id as string } : {}),
    })
    .eq("id", fields.id as string);

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  await supabase.from("business_logs").insert({
    message: `Quick updated job`,
    record_id: fields.id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ success: true, dismiss: true });
}

export async function DeleteJob(id: number) {
  const supabase = createClient();
  return supabase.from("business_location_jobs").delete().eq("id", id);
}

export async function CreateJobMessage<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { data, error } = await supabase
    .from("business_location_job_messages")
    .insert({
      author_id: fields.author_id as string,
      business_id: fields.business_id as string,
      location_id: Number(fields.location_id) as number,
      job_id: Number(fields.job_id) as number,
      message: fields.message as string,
    })
    .select("id")
    .single();

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  return formStateResponse({ ...state, success: true, data });
}

export async function DeleteJobMessage(message_id: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("business_location_job_messages")
    .delete()
    .eq("id", message_id);

  if (error) throw error;

  return;
}
