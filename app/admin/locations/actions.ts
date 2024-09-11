"use server";

import initialFormState from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createClient } from "@/utils/supabase/server";

export async function AddLocation<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;

  const fields = Object.fromEntries(formData);

  const { error } = await supabase.from("locations").insert({
    name: fields.name as string,
    address: fields.address as string,
    city: fields.city as string,
    state: fields.state as string,
    postal_code: fields.postal_code as string,
  });

  if (error) {
    return {
      ...state,
      success: false,
      error: error.message,
    };
  }

  return { ...initialFormState, success: true, dismiss: true };
}

export async function UpdateLocation<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;

  const fields = Object.fromEntries(formData);

  const { error } = await supabase
    .from("locations")
    .update({
      name: fields.name as string,
      address: fields.address as string,
      city: fields.city as string,
      state: fields.state as string,
      postal_code: fields.postal_code as string,
    })
    .eq("id", fields.id);

  if (error) {
    return {
      ...state,
      success: false,
      error: error.message,
    };
  }

  return { ...initialFormState, success: true, dismiss: true };
}

export async function DeleteLocation(id: number) {
  const supabase = createClient();
  return supabase.from("locations").delete().eq("id", id);
}
