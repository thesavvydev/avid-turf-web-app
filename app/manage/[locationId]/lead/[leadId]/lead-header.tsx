"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { LEAD_STATUSES } from "@/constants/lead-statuses";
import { Tables } from "@/types/supabase";
import { Breadcrumb, Button } from "flowbite-react";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function LeadHeader({
  lead,
}: {
  lead: Tables<"location_leads">;
}) {
  const { locationId } = useParams();
  return (
    <PageHeaderWithActions
      title={`#${lead.id} ${lead.name}`}
      subtitle={`Created on ${new Date(lead.created_at).toLocaleDateString()}`}
      renderActions={() => (
        <Button color={LEAD_STATUSES[lead.status].color}>
          {LEAD_STATUSES[lead.status].name}
        </Button>
      )}
      renderBreadcrumbs={() => (
        <Breadcrumb>
          <Breadcrumb.Item
            icon={() => <ChevronLeft />}
            href={`/manage/${locationId}/leads`}
          >
            Back to Leads
          </Breadcrumb.Item>
        </Breadcrumb>
      )}
    />
  );
}
