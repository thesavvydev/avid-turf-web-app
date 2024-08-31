import UserContextProvider from "@/contexts/user";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import ManageNav from "./manage-nav";

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
    .select("*")
    .eq("id", user.id)
    .limit(1)
    .single();

  if (!data) redirect("/sign-in");
  if (fetchProfileError) throw new Error(fetchProfileError.message);

  return (
    <UserContextProvider user={data}>
      <ManageNav />
      <main>{children}</main>
    </UserContextProvider>
  );
}
