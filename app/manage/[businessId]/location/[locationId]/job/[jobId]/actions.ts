"use server";

import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

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

export async function UpdateJobCustomer<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const updates = {
    full_name: fields.full_name as string,
    email: fields.email as string,
    phone: fields.phone as string,
  };

  const { error } = await supabase
    .from("business_location_jobs")
    .update(updates)
    .eq("id", fields.job_id);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(updates),
    message: `Updated customer information`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function UpdateJobEmployees<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const updates = {
    closer_id: fields.closer_id as string,
    installer_id: fields.installer_id as string,
  };

  const { error } = await supabase
    .from("business_location_jobs")
    .update(updates)
    .eq("id", fields.job_id);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(updates),
    message: `Updated employees`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function AddJobProfile<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const insert = {
    business_id: fields.business_id as string,
    location_id: Number(fields.location_id) as number,
    profile_id: fields.profile_id as string,
    job_id: Number(fields.job_id) as number,
    role: fields.role as Database["public"]["Enums"]["job_roles"],
  };

  const { error } = await supabase
    .from("business_location_job_profiles")
    .insert(insert);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(insert),
    message: `Added employee`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function UpdateJobProfile<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const update = {
    profile_id: fields.profile_id as string,
    role: fields.role as Database["public"]["Enums"]["job_roles"],
  };

  const { error } = await supabase
    .from("business_location_job_profiles")
    .update(update)
    .eq("id", fields.id);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(update),
    message: `Updated employee`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function UpdateJobLocation<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const updates = {
    address: fields.address as string,
    city: fields.city as string,
    state: fields.state as string,
    postal_code: fields.postal_code as string,
  };

  const { error } = await supabase
    .from("business_location_jobs")
    .update(updates)
    .eq("id", fields.job_id);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(updates),
    message: `Updated job location`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ ...state, success: true, dismiss: true });
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

export async function AddJobMedia<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const insert = {
    business_id: fields.business_id as string,
    location_id: Number(fields.location_id),
    job_id: Number(fields.job_id),
    name: fields.name as string,
    path: fields.path as string,
  };

  const { data, error } = await supabase
    .from("business_location_job_media")
    .insert(insert)
    .select("id")
    .single();

  if (error) return formStateResponse({ ...state, error: error.message });
  if (!data) return formStateResponse({ ...state, error: "No record." });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(insert),
    message: `Added new media`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function UpdateJobMedia<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const updates = {
    name: fields.name as string,
    path: fields.path as string,
  };

  const { error } = await supabase
    .from("business_location_job_media")
    .update(updates)
    .eq("id", fields.id);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase
    .from("business_logs")
    .insert({
      snapshot: JSON.stringify(updates),
      message: `Updated media`,
      record_id: fields.job_id as string,
      record_table_name: "business_location_jobs",
      business_id: fields.business_id as string,
      profile_id: fields.profile_id as string,
    })
    .then(console.log);

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function DeleteJobProfile(id: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("business_location_job_profiles")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return;
}

export async function DeleteJobMedia(id: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("business_location_job_media")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return;
}
