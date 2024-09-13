"use server";

import { initialFormState } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInAction = async <T>(...args: ServerActionWithState<T>) => {
  const [_, formData] = args;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { ...initialFormState, error: error.message };
  }
  redirect("/manage");
  return { ...initialFormState, success: true };
};
