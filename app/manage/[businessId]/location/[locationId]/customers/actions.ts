"use server";

import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function AddLocationCustomer<T>(
  ...args: ServerActionWithState<T>
) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const insert = {
    business_id: fields.business_id as string,
    creator_id: fields.profile_id as string,
    email: fields.email as string,
    full_name: fields.full_name as string,
    location_id: Number(fields.location_id),
    phone: fields.phone as string,
  };

  const { error } = await supabase
    .from("business_location_customers")
    .insert(insert);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(insert),
    message: `Add new customer`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_customers",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  revalidatePath(
    `/manage/${fields.business_id}/location/${fields.location_id}/customers`,
    "page",
  );

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function UpdateLocationCustomer<T>(
  ...args: ServerActionWithState<T>
) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const updates = {
    email: fields.email as string,
    full_name: fields.full_name as string,
    phone: fields.phone as string,
  };

  const { error } = await supabase
    .from("business_location_customers")
    .update(updates)
    .eq("id", fields.id);

  if (error) return formStateResponse({ ...state, error: error.message });

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(updates),
    message: `Updated customer`,
    record_id: fields.job_id as string,
    record_table_name: "business_location_customers",
    business_id: fields.business_id as string,
    profile_id: fields.profile_id as string,
  });

  revalidatePath(
    `/manage/${fields.business_id}/location/${fields.location_id}/customers`,
    "page",
  );

  return formStateResponse({ ...state, success: true, dismiss: true });
}

export async function DeleteLocationCustomer(location_id: number, id: number) {
  const supabase = await createSupabaseServerClient();

  return supabase
    .from("business_location_customers")
    .delete()
    .match({ location_id, id });
}
