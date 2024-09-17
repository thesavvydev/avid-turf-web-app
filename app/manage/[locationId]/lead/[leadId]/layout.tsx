import { PropsWithChildren } from "react";
import LeadHeader from "./lead-header";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type TLayout = PropsWithChildren & {
  params: { locationId: string; leadId: string };
};

export default async function Layout({
  params: { leadId },
  children,
}: TLayout) {
  const supabase = createClient();
  const { data: lead, error } = await supabase
    .from("location_leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!lead) notFound();

  return (
    <div className="grid gap-4 divide-y divide-gray-100 dark:divide-gray-700 md:gap-6 [&>div]:py-4">
      <LeadHeader lead={lead} />
      {children}
    </div>
  );
}
