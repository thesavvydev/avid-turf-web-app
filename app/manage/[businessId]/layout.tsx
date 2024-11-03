import { BusinessContextProvider, IBusiness } from "@/contexts/business";
import { createClient } from "@/utils/supabase/server";

import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import ManageSidebar from "./manage-sidebar";
import ManageNav from "./manage-nav";
import AppToasts from "./app-toasts";
import { SidebarProvider } from "@/contexts/sidebar";

export default async function Layout({
  children,
  params: { businessId },
}: PropsWithChildren<{ params: { businessId: string } }>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select(
      "*, profiles: business_profiles(*, profile: profile_id(*)), locations: business_locations(*), products: business_products(*)",
    )
    .eq("id", businessId)
    .limit(1)
    .returns<IBusiness>()
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return (
    <BusinessContextProvider business={data}>
      <SidebarProvider initialCollapsed>
        <ManageNav />
        <main className="relative mt-20 sm:mt-16 md:flex">
          <ManageSidebar />
          <div className="relative max-w-full flex-1 overflow-x-hidden">
            <div className="container relative flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </div>
          </div>
        </main>
        <AppToasts />
      </SidebarProvider>
    </BusinessContextProvider>
  );
}
