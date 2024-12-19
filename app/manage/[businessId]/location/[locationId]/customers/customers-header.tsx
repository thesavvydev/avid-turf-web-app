"use client";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Button } from "flowbite-react";
import { useState } from "react";
import ManageCustomerDrawer from "./manage-customer-drawer";

export default function CustomersHeader() {
  const [isManageCustomerDrawerOpen, setIsManageCustomerDrawerOpen] =
    useState(false);

  return (
    <>
      {isManageCustomerDrawerOpen && (
        <ManageCustomerDrawer
          isOpen
          setIsOpen={setIsManageCustomerDrawerOpen}
        />
      )}
      <PageHeaderWithActions
        title="Customers"
        subtitle="Customer management for your location."
        renderActions={() => (
          <Button
            onClick={() => setIsManageCustomerDrawerOpen(true)}
            color="primary"
          >
            New customer
          </Button>
        )}
      />
    </>
  );
}
