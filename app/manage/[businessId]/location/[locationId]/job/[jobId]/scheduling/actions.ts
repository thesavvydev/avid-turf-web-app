"use server";

import {
  formStateResponse,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function generateRevalidationPathForScheduling(
  business_id: FormDataEntryValue,
  location_id: FormDataEntryValue,
  job_id: FormDataEntryValue,
) {
  return `/manage/${business_id}/location/${location_id}/job/${job_id}/scheduling`;
}

export async function AddJobEvent(
  ...args: ServerActionWithState<TInitialFormState>
) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { data: foundEventsDuringTime, error: fetchProfileTimeCheckError } =
    await supabase
      .from("business_location_job_event_profiles")
      .select("*, event: event_id!inner(*)")
      .gte("event.start_datetime", fields.start_datetime as string)
      .lte("event.end_datetime", fields.end_datetime as string)
      .in("profile_id", formData.getAll("profiles"));

  if (fetchProfileTimeCheckError)
    return formStateResponse({
      error: fetchProfileTimeCheckError.message,
    });

  if (foundEventsDuringTime.length) {
    return formStateResponse({
      error: "Found existing event for employees.",
    });
  }

  const insert = {
    business_id: fields.business_id as string,
    end_datetime: fields.end_datetime as string,
    job_id: Number(fields.job_id),
    location_id: Number(fields.location_id),
    start_datetime: fields.start_datetime as string,
    type: fields.type as string,
  };

  const { data: event, error } = await supabase
    .from("business_location_job_events")
    .insert(insert)
    .select("id")
    .single();

  if (error) return formStateResponse({ error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(insert),
    message: `Added job event`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  const profilesInsert = formData.getAll("profiles").map((employeeId) => ({
    business_id: fields.business_id as string,
    event_id: Number(event.id),
    job_id: Number(fields.job_id),
    location_id: Number(fields.location_id),
    profile_id: employeeId as string,
  }));

  const { error: addProfilesError } = await supabase
    .from("business_location_job_event_profiles")
    .insert(profilesInsert);

  if (addProfilesError)
    return formStateResponse({ error: addProfilesError.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(profilesInsert),
    message: `Added profiles to job event`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  revalidatePath(
    generateRevalidationPathForScheduling(
      fields.business_id,
      fields.location_id,
      fields.job_id,
    ),
  );

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function UpdateJobEvent(
  ...args: ServerActionWithState<TInitialFormState>
) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { data: foundEventsDuringTime, error: fetchProfileTimeCheckError } =
    await supabase
      .from("business_location_job_event_profiles")
      .select("*, event: event_id!inner(*)")
      .gte("event.start_datetime", fields.start_datetime as string)
      .lte("event.end_datetime", fields.end_datetime as string)
      .in("profile_id", formData.getAll("profiles"));

  if (fetchProfileTimeCheckError)
    return formStateResponse({
      error: fetchProfileTimeCheckError.message,
    });

  if (foundEventsDuringTime.length) {
    return formStateResponse({
      error: "Found existing event for employees.",
    });
  }

  const update = {
    end_datetime: fields.end_datetime as string,
    start_datetime: fields.start_datetime as string,
    type: fields.type as string,
  };

  const { error } = await supabase
    .from("business_location_job_events")
    .update(update)
    .eq("id", fields.id)
    .select("id")
    .single();

  if (error) return formStateResponse({ error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(update),
    message: `Updated event`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  revalidatePath(
    generateRevalidationPathForScheduling(
      fields.business_id,
      fields.location_id,
      fields.job_id,
    ),
  );

  return formStateResponse({ ...state, success: true, dismiss: true });
}
