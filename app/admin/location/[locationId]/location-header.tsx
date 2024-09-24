"use client";

import AdminUpdateLocationDrawer from "@/components/admin/admin-update-location-drawer";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Tables } from "@/types/supabase";
import { Breadcrumb, Button, Dropdown } from "flowbite-react";
import { ChevronLeftIcon, EditIcon } from "lucide-react";
import { useState } from "react";

export default function LocationHeader({
  location,
}: {
  location: Tables<"business_locations">;
}) {
  const [isUpdateLocationDrawerOpen, setIsUpdateLocationDrawerOpen] =
    useState(false);
  return (
    <>
      {isUpdateLocationDrawerOpen && (
        <AdminUpdateLocationDrawer
          isOpen={isUpdateLocationDrawerOpen}
          setIsOpen={setIsUpdateLocationDrawerOpen}
          location={location}
        />
      )}
      <PageHeaderWithActions
        title={location.name}
        subtitle="Manage your location"
        renderActions={() => (
          <div className="flex items-center gap-4">
            <Dropdown label="Active" color="light">
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Inactive</Dropdown.Item>
            </Dropdown>
            <Button
              color="primary"
              onClick={() => setIsUpdateLocationDrawerOpen(true)}
            >
              <div className="flex items-center gap-1">
                <EditIcon className="size-5" />
                Edit
              </div>
            </Button>
          </div>
        )}
        renderBreadcrumbs={() => (
          <Breadcrumb aria-label="Admin Location Breadcrumb">
            <Breadcrumb.Item
              href="/admin/locations"
              icon={() => <ChevronLeftIcon className="mr-2" />}
            >
              Back to Locations
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
      />
    </>
  );
}
