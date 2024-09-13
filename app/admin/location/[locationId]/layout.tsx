import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import LocationHeader from "./location-header";
import LocationTabs from "./location-tabs";

type TLayout = PropsWithChildren<{
  params: {
    locationId: string;
  };
}>;

export default async function Layout({
  children,
  params: { locationId },
}: TLayout) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("id", locationId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return (
    <section className="grid gap-4">
      <LocationHeader location={data} />
      <div className="overflow-x-auto">
        <LocationTabs />
      </div>
      {children}
    </section>
  );
}
