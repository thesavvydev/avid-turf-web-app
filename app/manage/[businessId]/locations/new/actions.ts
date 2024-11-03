"use server";

import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddLocation<T>(...args: ServerActionWithState<T>) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const insert = {
    business_id: fields.business_id as string,
    name: fields.name as string,
    address: fields.address as string,
    address2: fields.address2 as string,
    city: fields.city as string,
    state: fields.state as string,
    postal_code: fields.postal_code as string,
  };

  const { error } = await supabase.from("business_locations").insert(insert);

  if (error) return formStateResponse({ ...state, error: error.message });

  const headersList = await headers();
  const origin = headersList.get("origin");
  revalidatePath("/manage/[businessId]/locations");
  return redirect(`${origin}/manage/${fields.business_id}/locations`);
}
