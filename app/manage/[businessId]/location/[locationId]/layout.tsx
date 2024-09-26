import { ILocation, LocationContextProvider } from "@/contexts/location";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({
  children,
  params: { locationId },
}: PropsWithChildren<{ params: { locationId: string } }>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business_locations")
    .select(
      "*, profiles: business_location_profiles!id(*, profile: profiles!profile_id(id, full_name))",
    )
    .eq("id", locationId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return (
    <LocationContextProvider location={data as ILocation}>
      {children}
    </LocationContextProvider>
  );
}
