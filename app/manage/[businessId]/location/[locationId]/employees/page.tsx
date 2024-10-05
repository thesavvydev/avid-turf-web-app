import { createClient } from "@/utils/supabase/server";
import EmployeesHeader from "./employees-header";
import { Tables } from "@/types/supabase";
import EmployeesTable from "./employees-table";

type TPage = {
  params: { locationId: string };
};

export interface IEmployee extends Tables<"business_location_profiles"> {
  profile?: Tables<"profiles">;
}

export default async function Page({ params: { locationId } }: TPage) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("business_location_profiles")
    .select("*, profile: profile_id(*)")
    .eq("location_id", Number(locationId))
    .returns<IEmployee[]>();

  if (error) throw error;

  const roleCounts = (data ?? []).reduce(
    (dictionary, job) => {
      dictionary[job.role] = Number(dictionary[job.role] ?? 0) + 1;

      return dictionary;
    },
    {
      admin: 0,
      manager: 0,
      base: 0,
    },
  );

  return (
    <>
      <EmployeesHeader />
      <EmployeesTable
        employeesCount={0}
        employees={data}
        paginatedTotal={0}
        roleCounts={roleCounts}
      />
    </>
  );
}
