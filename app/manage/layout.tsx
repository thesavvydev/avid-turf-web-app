import { PropsWithChildren } from "react";
import ManageNav from "./manage-nav";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import UserContextProvider from "@/contexts/user";

export default async function ManageLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) notFound();

  return (
    <UserContextProvider user={user}>
      <ManageNav />
      {children}
    </UserContextProvider>
  );
}
