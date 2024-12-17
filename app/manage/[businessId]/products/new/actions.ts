"use server";

import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddProduct<T>(...args: ServerActionWithState<T>) {
  const supabase = await createSupabaseServerClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const insert = {
    business_id: fields.business_id as string,
    name: fields.name as string,
    unit: fields.unit as string,
    unit_price: Number(fields.unit_price),
    units_in_stock: Number(fields.units_in_stock),
  };

  const { error } = await supabase.from("business_products").insert(insert);

  if (error) return formStateResponse({ ...state, error: error.message });

  const headersList = await headers();
  const origin = headersList.get("origin");
  revalidatePath("/manage/[businessId]/products");
  return redirect(`${origin}/manage/${fields.business_id}/products`);
}
