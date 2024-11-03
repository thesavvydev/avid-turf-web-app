import { createSupabaseServerClient } from "@/utils/supabase/server";

import LocationsHeader from "./locations-header";
import LocationsTable from "./locations-table";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("business_locations").select("*");

  if (error) throw error;

  return (
    <>
      <LocationsHeader />
      <LocationsTable locations={data} />
    </>
  );
}
