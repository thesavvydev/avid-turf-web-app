"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { LEAD_STATUSES } from "@/constants/lead-statuses";
import { Database, Tables } from "@/types/supabase";
import { Badge, Breadcrumb, Button, Dropdown } from "flowbite-react";
import { ChevronLeft, ReceiptIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { UpdateStatus } from "./actions";

export default function LeadHeader({
  lead,
}: {
  lead: Tables<"location_leads">;
}) {
  const { locationId } = useParams();
  const router = useRouter();

  return (
    <PageHeaderWithActions
      title={`#${lead.id} ${lead.name}`}
      subtitle={
        <div className="mt-2 flex gap-2">
          <span className="inline max-w-fit">
            <Badge color={LEAD_STATUSES[lead.status].color}>
              {LEAD_STATUSES[lead.status].name}
            </Badge>
          </span>
          <p className="text-sm">
            {`Created on ${new Date(lead.created_at).toLocaleDateString()}`}
          </p>
        </div>
      }
      renderActions={() => (
        <div className="flex items-start gap-2">
          <Dropdown
            color={LEAD_STATUSES[lead.status].color}
            label={LEAD_STATUSES[lead.status].name}
            dismissOnClick={false}
            size="sm"
          >
            {Object.entries(LEAD_STATUSES).map(
              ([leadStatusKey, leadStatus]) => (
                <Dropdown.Item
                  key={leadStatusKey}
                  onClick={async () => {
                    await UpdateStatus(
                      lead.id,
                      leadStatusKey as Database["public"]["Enums"]["lead_statuses"],
                    );
                    router.refresh();
                  }}
                >
                  {leadStatus.name}
                </Dropdown.Item>
              ),
            )}
          </Dropdown>

          <Button size="sm">
            <ReceiptIcon className="mr-2 size-5" />
            Add estimate
          </Button>
        </div>
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
