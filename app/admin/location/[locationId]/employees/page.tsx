import { createClient } from "@/utils/supabase/server";
import EmployeesTable from "./employees-table";

export default async function Page({
  params: { locationId },
}: {
  params: { locationId: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("location_employees")
    .select("*, profile: profiles(*)")
    .eq("location_id", locationId);

  if (error) throw error;

  return <EmployeesTable employees={data} />;
}
