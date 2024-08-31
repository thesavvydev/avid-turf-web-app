"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInAction = async (
  _prevState: { error?: string },
  formData: FormData,
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect("/manage");
};
