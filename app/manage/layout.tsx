import UserContextProvider from "@/contexts/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect(`/sign-in`);
  if (error) throw new Error(error.message);

  const { data, error: fetchProfileError } = await supabase
    .from("profiles")
    .select(
      "*, businesses(*), business_profiles(*), locations: business_locations(*), location_profiles: business_location_profiles(*)",
    )
    .eq("id", user.id)
    .limit(1)
    .maybeSingle();

  if (fetchProfileError) throw new Error(fetchProfileError.message);
  if (!data) redirect("/sign-in");

  return <UserContextProvider user={data}>{children}</UserContextProvider>;
}
