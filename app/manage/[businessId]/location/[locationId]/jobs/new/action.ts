"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database, Tables } from "@/types/supabase";
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
    email: fields.email as string,
    full_name: fields.full_name as string,
    phone: fields.phone as string,
    postal_code: fields.postal_code as string,
    state: fields.state as string,
    status: fields.status as Database["public"]["Enums"]["location_job_status"],
  };

  const employeesDictionary = Object.entries(fields).reduce<{
    [key: string]: Pick<
      Tables<"business_location_job_profiles">,
      "profile_id" | "role"
    >;
  }>((dictionary, [key, value]) => {
    const [_, tempId, field] = key.split("__");
    if (!tempId) return dictionary;
    dictionary[tempId] = dictionary[tempId] ?? {};

    if (!field) return dictionary;
    if (field === "role") {
      dictionary[tempId].role =
        value as Database["public"]["Enums"]["job_roles"];
    } else {
      dictionary[tempId].profile_id = value as string;
    }

    return dictionary;
  }, {});

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

  const employeesInsert = Object.values(employeesDictionary).map(
    (employee) => ({
      ...employee,
      business_id: fields.business_id as string,
      location_id: Number(fields.business_location_id),
      job_id: data.id,
    }),
  );

  const { error: addEmployeesError } = await supabase
    .from("business_location_job_profiles")
    .insert(employeesInsert);

  if (addEmployeesError) {
    return formStateResponse({ ...state, error: addEmployeesError.message });
  }

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(employeesInsert),
    message: `Added employees to job`,
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
