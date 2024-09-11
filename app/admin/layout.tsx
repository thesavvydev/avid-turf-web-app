import { PropsWithChildren } from "react";
import AdminNav from "./admin-nav";
import AdminSideBar from "./admin-sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserContextProvider from "@/contexts/user";

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
    .select("*")
    .eq("id", user.id)
    .limit(1)
    .single();

  if (!data) redirect("/sign-in");
  if (fetchProfileError) throw new Error(fetchProfileError);

  return (
    <UserContextProvider user={data}>
      <AdminNav />
      <div className="container flex gap-4 p-4 lg:gap-8 lg:p-8">
        <AdminSideBar />
        <div className="w-full">{children}</div>
      </div>
    </UserContextProvider>
  );
}
