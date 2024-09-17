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
    <div className="grid gap-4 md:gap-6 lg:gap-8">
      <LeadHeader lead={lead} />
      {children}
    </div>
  );
}
