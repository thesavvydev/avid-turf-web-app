import { createClient } from "@/utils/supabase/server";
import PageForm from "./page-form";

type TPage = {
  params: { locationId: string };
};

export default async function Page({ params: { locationId } }: TPage) {
  const supabase = createClient();
  const { data: profiles, error } = await supabase
    .from("business_location_profiles")
    .select("*, profile: profiles(id,full_name)")
    .eq("location_id", locationId);

  if (error) throw error;

  return <PageForm profiles={profiles ?? []} />;
}
