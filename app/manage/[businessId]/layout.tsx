import { BusinessContextProvider, IBusiness } from "@/contexts/business";
import { createClient } from "@/utils/supabase/server";

import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({
  children,
  params: { businessId },
}: PropsWithChildren<{ params: { businessId: string } }>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select(
      "*, profile: business_profiles(*, profile: profile_id(*)), locations: business_locations(*)",
    )
    .eq("id", businessId)
    .limit(1)
    .returns<IBusiness>()
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return (
    <BusinessContextProvider business={data}>
      {children}
    </BusinessContextProvider>
  );
}
