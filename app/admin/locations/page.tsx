import { createClient } from "@/utils/supabase/server";
import LocationsPageHeader from "./locations-header";
import LocationsTable from "./locations-table";

export default async function Page() {
  const supabase = createClient();
  const { data: locations, error } = await supabase
    .from("locations")
    .select("*");

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4 lg:gap-8">
      <LocationsPageHeader />
      <LocationsTable data={locations} />
    </div>
  );
}
