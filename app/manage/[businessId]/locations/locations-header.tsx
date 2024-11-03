"use client";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import { useUserContext } from "@/contexts/user";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";

export default function LocationsHeader() {
  const { businessId } = useParams();
  const { user } = useUserContext();

  return (
    <PageHeaderWithActions
      title="Locations"
      subtitle="Location management for your business."
      renderActions={() =>
        user.business?.role &&
        ["admin", "manager"].includes(user.business.role) ? (
          <Button href={`/manage/${businessId}/locations/new`} color="primary">
            New location
          </Button>
        ) : null
      }
    />
  );
}
