"use server";

import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";

export async function SearchOrInviteUser<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  if (!fields.profile_id && !fields.inviting_new) {
    const { data: foundUser, error: getUserIdByEmailError } = await supabase
      .rpc("get_user_id_by_email", {
        email: fields.email as string,
      })
      .maybeSingle();

    if (getUserIdByEmailError) {
      return formStateResponse({ error: getUserIdByEmailError.message });
    }

    if (foundUser) {
      const { data: foundUserProfile } = await supabase
        .from("profiles")
        .select("id,full_name,avatar_url")
        .eq("id", foundUser.id)
        .limit(1)
        .single();

      return formStateResponse({ data: foundUserProfile });
    }

    return formStateResponse({ data: "confirm-invite" });
  }

  if (fields.profile_id) {
    const { error } = await supabase.from("location_employees").upsert({
      location_id: Number(fields.location_id) as number,
      profile_id: fields.profile_id as string,
      role: fields.role as Database["public"]["Enums"]["location_employee_roles"],
    });

    if (error) {
      return formStateResponse({ ...state, error: error.message });
    }
  } else if (fields.inviting_new) {
    // if invite present, send invite and then add new user to location_employees with role
  }

  return formStateResponse({ success: true, dismiss: true });
}
