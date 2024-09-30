import UserContextProvider from "@/contexts/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";
import ManageSidebar from "./manage-sidebar";
import ManageNav from "./manage-nav";
import AppToasts from "./app-toasts";

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect(`/sign-in`);
  if (error) throw new Error(error.message);

  const { data, error: fetchProfileError } = await supabase
    .from("profiles")
    .select("*,businesses(*),business_locations(*)")
    .eq("id", user.id)
    .limit(1)
    .single();

  if (fetchProfileError) throw new Error(fetchProfileError.message);
  if (!data) redirect("/sign-in");

  return (
    <UserContextProvider user={data}>
      <main className="relative md:flex">
        <ManageSidebar />
        <div className="relative max-w-full flex-1">
          <ManageNav />
          <div className="container relative flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </div>
        </div>
      </main>
      <AppToasts />
    </UserContextProvider>
  );
}
