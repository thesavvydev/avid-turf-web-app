import { PropsWithChildren } from "react";
import LeadHeader from "./lead-header";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

type TLayout = PropsWithChildren & {
  params: Promise<{ locationId: string; leadId: string }>;
};

export default async function Layout(props: TLayout) {
  const params = await props.params;

  const { leadId } = params;

  const { children } = props;

  const supabase = await createSupabaseServerClient();
  const { data: lead, error } = await supabase
    .from("business_location_leads")
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
