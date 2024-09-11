"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import DynamicTable from "@/components/dynamic-table";
import { Tables } from "@/types/supabase";
import { Button, Dropdown, Tooltip } from "flowbite-react";
import { EllipsisVerticalIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteUser } from "./actions";
import UpdateProfileDrawer from "./update-profile-drawer";

function UserActionCell({ profile }: { profile: Tables<"profiles"> }) {
  const [isUpdateProfileDrawerOpen, setIsUpdateProfileDrawerOpen] =
    useState(false);
  const router = useRouter();

  return (
    <>
      {isUpdateProfileDrawerOpen && (
        <UpdateProfileDrawer
          isOpen={isUpdateProfileDrawerOpen}
          setIsOpen={setIsUpdateProfileDrawerOpen}
          user={profile}
        />
      )}
      <div className="hidden md:flex md:items-center md:gap-1">
        <Button
          color="light"
          outline
          size="xs"
          onClick={() => setIsUpdateProfileDrawerOpen(true)}
        >
          <Tooltip content="Settings" style="auto">
            <SettingsIcon className="size-5" />
          </Tooltip>
        </Button>
        <Tooltip content="Trash" style="auto">
          <ConfirmModal
            description={`Are you sure you want to remove ${profile.full_name}? This action is not reversible.`}
            onConfirmClick={async () => {
              await DeleteUser(profile.id);
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
          <Dropdown.Item onClick={() => setIsUpdateProfileDrawerOpen(true)}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item>
            <ConfirmModal
              description={`Are you sure you want to remove ${profile.full_name}? This action is not reversible.`}
              onConfirmClick={async () => {
                await DeleteUser(profile.id);
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

export default function UsersTable({ data }: { data: Tables<"profiles">[] }) {
  const columns = [
    {
      cellClassNames: "w-full whitespace-nowrap",
      field: "name",
      header: "Name",
      renderCell: (profile: Tables<"profiles">) => profile.full_name,
    },
    {
      cellClassNames: "w-full hidden lg:table-cell",
      field: "created_at",
      header: "Joined On",
      renderCell: (profile: Tables<"profiles">) =>
        new Date(profile.created_at).toLocaleDateString(),
    },
    {
      cellClassNames: "whitespace-nowrap hidden lg:table-cell",
      field: "locations",
      header: "Locations",
      renderCell: () => "Location A, Location B",
    },
    {
      field: "actions",
      renderCell: (profile: Tables<"profiles">) => (
        <UserActionCell profile={profile} />
      ),
    },
  ];

  return (
    <DynamicTable<Tables<"profiles">> columns={columns} rows={data} striped />
  );
}
