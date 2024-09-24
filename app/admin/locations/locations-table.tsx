"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import DynamicTable from "@/components/dynamic-table";
import Linky from "@/components/linky";
import { Tables } from "@/types/supabase";
import { Button, Dropdown, Tooltip } from "flowbite-react";
import { EllipsisVerticalIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminUpdateLocationDrawer from "@/components/admin/admin-update-location-drawer";
import { DeleteLocation } from "./actions";

type TLocationAndEmployeeCount = Tables<"business_locations"> & {
  business_location_profiles: { count: number }[];
};

type TLocationsTableProps = {
  data: TLocationAndEmployeeCount[];
};

function LocationActionCell({
  location,
}: {
  location: Tables<"business_locations">;
}) {
  const [isUpdateLocationDrawerOpen, setIsUpdateLocationDrawerOpen] =
    useState(false);
  const router = useRouter();

  return (
    <>
      {isUpdateLocationDrawerOpen && (
        <AdminUpdateLocationDrawer
          isOpen={isUpdateLocationDrawerOpen}
          setIsOpen={setIsUpdateLocationDrawerOpen}
          location={location}
        />
      )}
      <div className="hidden md:flex md:items-center md:gap-1">
        <Button
          color="light"
          outline
          size="xs"
          onClick={() => setIsUpdateLocationDrawerOpen(true)}
        >
          <Tooltip content="Settings" style="auto">
            <SettingsIcon className="size-5" />
          </Tooltip>
        </Button>
        <Tooltip content="Trash" style="auto">
          <ConfirmModal
            description={`Are you sure you want to remove ${location.name}? This action is not reversible.`}
            onConfirmClick={async () => {
              await DeleteLocation(location.id);
              router.refresh();
            }}
            trigger={(toggle) => (
              <Button color="light" size="xs" onClick={toggle} outline>
                <Trash2Icon className="size-5 text-red-500" />
              </Button>
            )}
          />
        </Tooltip>
      </div>
      <div className="md:hidden">
        <Dropdown
          label=""
          renderTrigger={() => <EllipsisVerticalIcon />}
          placement="bottom"
          size="sm"
        >
          <Dropdown.Item onClick={() => setIsUpdateLocationDrawerOpen(true)}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item>
            <ConfirmModal
              description={`Are you sure you want to remove ${location.name}? This action is not reversible.`}
              onConfirmClick={async () => {
                await DeleteLocation(location.id);
                router.refresh();
              }}
              trigger={(toggle) => (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggle();
                  }}
                >
                  Trash
                </span>
              )}
            />
          </Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
}

export default function LocationsTable({ data }: TLocationsTableProps) {
  return (
    <DynamicTable<TLocationAndEmployeeCount>
      columns={[
        {
          field: "name",
          header: "Name",
          renderCell: ({ id, name }) => (
            <Linky href={`/admin/location/${id}`}>{name}</Linky>
          ),
        },
        {
          field: "city",
          header: "City",
          renderCell: ({ city }) => city,
        },
        {
          field: "state",
          header: "State",
          renderCell: ({ state }) => state,
        },
        {
          field: "employees",
          header: "Employees",
          renderCell: ({ business_location_profiles }) =>
            business_location_profiles[0].count,
        },
        {
          cellClassNames: "w-0",
          field: "actions",
          renderCell: (location) => <LocationActionCell location={location} />,
        },
      ]}
      rows={data}
      striped
    />
  );
}
