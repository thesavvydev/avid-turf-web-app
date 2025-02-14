"use server";
import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { formatArrayFormFieldsIntoDictionary } from "@/utils/format-array-form-fields-into-dictionary";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddJob<T>(...args: ServerActionWithState<T>) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);
  const employeesDictionary = formatArrayFormFieldsIntoDictionary(
    "employees",
    fields,
  );

  const productsDictionary = formatArrayFormFieldsIntoDictionary(
    "product",
    fields,
  );

  const newState = {
    ...state,
    data: {
      ...fields,
      employees: Object.values(employeesDictionary),
      products: Object.values(productsDictionary),
    },
  };

  if (Object.values(productsDictionary).length === 0) {
    return formStateResponse({
      ...newState,
      error: "Add products to your job",
    });
  }

  if (Object.values(employeesDictionary).length === 0) {
    return formStateResponse({
      ...newState,
      error: "Add employees to your job",
    });
  }

  const employeesWithRole = (role: string) =>
    Object.values(employeesDictionary).find(
      (employee) => employee.role === role,
    );

  if (!employeesWithRole("closer")) {
    return formStateResponse({
      ...newState,
      error: "A closer employee is required",
    });
  }

  if (fields.lead_type === "setter" && !employeesWithRole("setter")) {
    return formStateResponse({
      ...newState,
      error: "A setter is required for setter generated leads.",
    });
  }

  const customerId =
    fields.customer_id ||
    (await supabase
      .from("business_location_customers")
      .insert({
        address: fields.address as string,
        business_id: fields.business_id as string,
        city: fields.city as string,
        creator_id: fields.creator_id as string,
        disposition_status: "NEW",
        email: fields.email as string,
        full_name: fields.full_name as string,
        lead_source: fields.lead_source as string,
        location_id: Number(fields.business_location_id),
        phone: fields.phone as string,
        postal_code: fields.postal_code as string,
        state: fields.state as string,
      })
      .select("id")
      .single()
      .then(({ data }) => data?.id));

  if (!customerId) {
    return formStateResponse({
      ...newState,
      error: "Unable to create a new customer. Contact an admin for help.",
    });
  }

  const insert = {
    address: fields.address as string,
    business_id: fields.business_id as string,
    business_location_id: Number(fields.business_location_id),
    city: fields.city as string,
    commission: Number(fields.commission),
    creator_id: fields.creator_id as string,
    customer_id: Number(customerId),
    down_payment_collected: Number(fields.down_payment_collected),
    email: fields.email as string,
    estimated_start_date: fields.estimated_start_date
      ? (fields.estimated_start_date as string)
      : null,
    estimated_end_date: fields.estimated_end_date
      ? (fields.estimated_end_date as string)
      : null,
    full_name: fields.full_name as string,
    has_water_rebate: fields.has_water_rebate === "yes",
    hoa_approval_required: fields.hoa_approval_required === "yes",
    hoa_contact_email: fields.hoa_contact_email as string,
    hoa_contact_name: fields.hoa_contact_name as string,
    hoa_contact_phone: fields.hoa_contact_phone as string,
    lead_type: fields.lead_type as string,
    payment_type:
      fields.payment_type as Database["public"]["Enums"]["job_payment_types"],
    phone: fields.phone as string,
    postal_code: fields.postal_code as string,
    state: fields.state as string,
    water_rebate_company: fields.water_rebate_company as string,
  };

  const { data, error } = await supabase
    .from("business_location_jobs")
    .insert(insert)
    .select("id")
    .single();

  if (error) {
    return formStateResponse({ ...newState, error: error.message });
  }

  if (!data) {
    return formStateResponse({ ...newState, error: "No record created." });
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
      role: employee.role as Database["public"]["Enums"]["job_roles"],
      profile_id: employee.profile_id as string,
      business_id: fields.business_id as string,
      location_id: Number(fields.business_location_id),
      job_id: data.id,
    }),
  );

  const { error: addEmployeesError } = await supabase
    .from("business_location_job_profiles")
    .insert(employeesInsert);

  if (addEmployeesError) {
    return formStateResponse({ ...newState, error: addEmployeesError.message });
  }

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(employeesInsert),
    message: `Added employees to job`,
    record_id: data.id.toString(),
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.creator_id as string,
  });

  const productsInsert = Object.values(productsDictionary).flatMap((product) =>
    product.product_id
      ? {
          ...product,
          business_id: fields.business_id as string,
          location_id: Number(fields.business_location_id),
          job_id: data.id,
          product_id: Number(product.product_id),
        }
      : [],
  );

  const { error: insertJobProductsError } = await supabase
    .from("business_location_job_products")
    .insert(productsInsert);

  if (insertJobProductsError) {
    return formStateResponse({
      ...newState,
      error: insertJobProductsError.message,
    });
  }

  await supabase.from("business_logs").insert({
    snapshot: JSON.stringify(productsInsert),
    message: `Added products to job`,
    record_id: data.id.toString(),
    record_table_name: "business_location_jobs",
    business_id: fields.business_id as string,
    profile_id: fields.creator_id as string,
  });

  const origin = (await headers()).get("origin");
  return redirect(
    `${origin}/manage/${fields.business_id}/location/${fields.business_location_id}/job/${data.id}`,
  );
}
