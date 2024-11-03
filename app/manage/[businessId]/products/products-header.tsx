"use client";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import { useUserContext } from "@/contexts/user";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";

export default function ProductsHeader() {
  const { businessId } = useParams();
  const { user } = useUserContext();

  return (
    <PageHeaderWithActions
      title="Products"
      subtitle="Inventory for your jobs."
      renderActions={() =>
        user.business?.role &&
        ["admin", "manager"].includes(user.business.role) ? (
          <Button href={`/manage/${businessId}/products/new`} color="primary">
            New product
          </Button>
        ) : null
      }
    />
  );
}
