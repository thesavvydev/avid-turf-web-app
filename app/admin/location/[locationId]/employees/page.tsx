import { createClient } from "@/utils/supabase/server";
import EmployeesTable from "./employees-table";

export default async function Page({
  params: { locationId },
}: {
  params: { locationId: string };
}) {
  const supabase = createClient();
  const response = await supabase
    .from("business_location_profiles")
    .select("*, profile: profiles(*)")
    .eq("location_id", locationId);

  if (response.error) throw response.error;

  return <EmployeesTable employees={response.data} />;
}
