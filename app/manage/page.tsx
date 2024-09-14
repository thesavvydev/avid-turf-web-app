import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect(`/sign-in`);
  if (error) throw new Error(error.message);

  const { data, error: fetchLocationError } = await supabase
    .from("locations")
    .select("*, location_profiles(*)")
    .eq("location_profiles.profile_id", user.id)
    .limit(1)
    .single();

  if (fetchLocationError) throw new Error(fetchLocationError.message);

  if (data) {
    redirect(`/manage/${data.id}`);
  }

  return <div>Redirecting to location...</div>;
}
