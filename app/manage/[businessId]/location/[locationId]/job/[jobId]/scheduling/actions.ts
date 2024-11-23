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

export async function AddJobAppointment(
  ...args: ServerActionWithState<TInitialFormState>
) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const {
    data: foundAppointmentsDuringTime,
    error: fetchProfileTimeCheckError,
  } = await supabase
    .from("business_location_job_appointment_profiles")
    .select(
      "*, appointment: business_location_job_appointments!business_location_job_appointment_profiles_appointment_id_fkey!inner(*)",
    )
    .gte("appointment.start_datetime", fields.start_datetime as string)
    .lte("appointment.end_datetime", fields.end_datetime as string)
    .in("profile_id", formData.getAll("profiles"));

  if (fetchProfileTimeCheckError)
    return formStateResponse({
      error: fetchProfileTimeCheckError.message,
    });

  if (foundAppointmentsDuringTime.length) {
    return formStateResponse({
      error: "Found existing appointment for employees.",
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

  const { data: appointment, error } = await supabase
    .from("business_location_job_appointments")
    .insert(insert)
    .select("id")
    .single();

  if (error) return formStateResponse({ error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(insert),
    message: `Added job appointment`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  const profilesInsert = formData.getAll("profiles").map((employeeId) => ({
    business_id: fields.business_id as string,
    appointment_id: Number(appointment.id),
    job_id: Number(fields.job_id),
    location_id: Number(fields.location_id),
    profile_id: employeeId as string,
  }));

  const { error: addProfilesError } = await supabase
    .from("business_location_job_appointment_profiles")
    .insert(profilesInsert);

  if (addProfilesError)
    return formStateResponse({ error: addProfilesError.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(profilesInsert),
    message: `Added profiles to job appointment`,
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

export async function UpdateJobAppointment(
  ...args: ServerActionWithState<TInitialFormState>
) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const {
    data: foundAppointmentsDuringTime,
    error: fetchProfileTimeCheckError,
  } = await supabase
    .from("business_location_job_appointment_profiles")
    .select("*, appointment: appointment_id!inner(*)")
    .gte("appointment.start_datetime", fields.start_datetime as string)
    .lte("appointment.end_datetime", fields.end_datetime as string)
    .in("profile_id", formData.getAll("profiles"));

  if (fetchProfileTimeCheckError)
    return formStateResponse({
      error: fetchProfileTimeCheckError.message,
    });

  if (foundAppointmentsDuringTime.length) {
    return formStateResponse({
      error: "Found existing appointment for employees.",
    });
  }

  const update = {
    end_datetime: fields.end_datetime as string,
    start_datetime: fields.start_datetime as string,
    type: fields.type as string,
  };

  const { error } = await supabase
    .from("business_location_job_appointments")
    .update(update)
    .eq("id", fields.id)
    .select("id")
    .single();

  if (error) return formStateResponse({ error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(update),
    message: `Updated appointment`,
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