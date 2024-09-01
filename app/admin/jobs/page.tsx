import { createClient } from "@/utils/supabase/server";
import JobsHeader from "./jobs-header";
import JobsTable from "./jobs-table";

export default async function Page() {
  const supabase = createClient();
  const { data: jobs, error } = await supabase.from("jobs").select("*");

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4 lg:gap-8">
      <JobsHeader />
      <JobsTable data={jobs} />
    </div>
  );
}
