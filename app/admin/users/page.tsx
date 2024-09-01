import { createClient } from "@/utils/supabase/server";
import UsersPageHeader from "./users-header";
import UsersTable from "./users-table";

export default async function Page() {
  const supabase = createClient();
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*, location_employees(*)");

  if (error) throw new Error(error.message);

  return (
    <div className="grid gap-4 lg:gap-8">
      <UsersPageHeader />
      <UsersTable data={profiles} />
    </div>
  );
}
