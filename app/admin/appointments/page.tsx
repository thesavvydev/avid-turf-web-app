import { createClient } from "@/utils/supabase/server";
import AppointmentsHeader from "./appointments-header";
import AppointmentsTable from "./appointments-table";

export default async function Page() {
  const supabase = createClient();
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*");

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4 lg:gap-8">
      <AppointmentsHeader />
      <AppointmentsTable data={appointments} />
    </div>
  );
}
