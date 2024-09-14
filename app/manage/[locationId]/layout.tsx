import UserContextProvider from "@/contexts/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import ManageNav from "./manage-nav";
import ManageSidebar from "./manage-sidebar";

export default async function ManageLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect(`/sign-in`);
  if (error) throw new Error(error.message);

  const { data, error: fetchProfileError } = await supabase
    .from("profiles")
    .select("*, locations(*)")
    .eq("id", user.id)
    .limit(1)
    .single();

  if (!data) redirect("/sign-in");
  if (fetchProfileError) throw new Error(fetchProfileError);

  return (
    <UserContextProvider user={data}>
      <main className="relative md:flex">
        <ManageSidebar />
        <div className="max-w-full flex-1 overflow-x-hidden">
          <ManageNav />
          <div className="container flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </div>
        </div>
      </main>
    </UserContextProvider>
  );
}
