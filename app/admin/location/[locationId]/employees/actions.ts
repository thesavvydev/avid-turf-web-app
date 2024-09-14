"use server";

import { formStateResponse } from "@/constants/initial-form-state";
import { ServerActionWithState } from "@/types/server-actions";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

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
    const { error } = await supabase.from("location_profiles").upsert({
      location_id: Number(fields.location_id) as number,
      profile_id: fields.profile_id as string,
      role: fields.role as Database["public"]["Enums"]["location_profile_roles"],
    });

    if (error) {
      return formStateResponse({ ...state, error: error.message });
    }
  } else if (fields.inviting_new) {
    // if invite present, send invite and then add new user to location_profiles with role
    const supabaseAdmin = createClient({ admin: true });
    const origin = headers().get("origin");

    const { data, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(fields.email as string, {
        data: { full_name: fields.full_name as string },
        redirectTo: `${origin}/auth/callback`,
      });

    if (inviteError) {
      return formStateResponse({ ...state, error: inviteError.message });
    }

    const { error } = await supabase.from("location_profiles").upsert({
      location_id: Number(fields.location_id) as number,
      profile_id: data.user.id,
      role: fields.role as Database["public"]["Enums"]["location_profile_roles"],
    });

    if (error) {
      return formStateResponse({ ...state, error: error.message });
    }
  }

  return formStateResponse({ success: true, dismiss: true });
}

export async function UpdateEmployee<T>(...args: ServerActionWithState<T>) {
  const supabase = createClient();
  const [state, formData] = args;
  const fields = Object.fromEntries(formData);

  const { error } = await supabase
    .from("location_profiles")
    .update({
      role: fields.role as Database["public"]["Enums"]["location_profile_roles"],
    })
    .match({ location_id: fields.location_id, profile_id: fields.profile_id });

  if (error) {
    return formStateResponse({ ...state, error: error.message });
  }

  return formStateResponse({ success: true, dismiss: true });
}

export async function DeleteEmployee(location_id: number, profile_id: string) {
  const supabase = createClient();
  console.log("Deleting...", { location_id, profile_id });
  return supabase
    .from("location_profiles")
    .delete()
    .match({ location_id, profile_id });
}
