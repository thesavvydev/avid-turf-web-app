"use server";

import initialFormState from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { createClient } from "@/utils/supabase/server";
import { isValidEmailInput } from "@/utils/validate-email-input";
import { headers } from "next/headers";

export async function AddNewUser<T>(...args: ServerActionWithState<T>) {
  const origin = headers().get("origin");
  const supabase = createClient({ admin: true });
  const [state, formData] = args;
  const { email, full_name, avatar_url } = Object.fromEntries(formData);

  if (!isValidEmailInput(email as string))
    return { ...state, success: false, error: "Invalid email format" };

  const { error } = await supabase.auth.admin.inviteUserByEmail(
    email as string,
    {
      data: { full_name, avatar_url },
      redirectTo: `${origin}/auth/callback`,
    },
  );

  if (error) {
    return {
      ...state,
      success: false,
      error: error.message,
    };
  }

  return { ...initialFormState, success: true, dismiss: true };
}

export async function UpdateUserAction<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const { avatar_url, full_name, id } = Object.fromEntries(formData);

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: full_name as string,
      avatar_url: avatar_url as string,
    })
    .eq("id", id);

  if (error) {
    return {
      ...state,
      success: false,
      error: error.message,
    };
  }

  return { ...initialFormState, success: true, dismiss: true };
}

export async function DeleteUser(id: string) {
  const supabase = createClient({ admin: true });
  return supabase.auth.admin.deleteUser(id);
}
