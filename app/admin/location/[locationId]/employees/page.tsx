import { createClient } from "@/utils/supabase/server";
import { Alert } from "flowbite-react";
import { InfoIcon } from "lucide-react";
import EmployeesTable from "./employees-table";

export default async function Page({
  params: { locationId },
}: {
  params: { locationId: string };
}) {
  const supabase = createClient();
  const response = await supabase
    .from("location_profiles")
    .select("*, profile: profiles(*)")
    .eq("location_id", locationId);

  if (response.error) throw response.error;
  if (response.data.length === 0) {
    return (
      <Alert color="failure" icon={() => <InfoIcon className="mr-2" />}>
        <span className="font-medium">No employees found!</span> If this is an
        error, get help.
      </Alert>
    );
  }

  return (
    <>
      <EmployeesTable employees={response.data} />
    </>
  );
}
