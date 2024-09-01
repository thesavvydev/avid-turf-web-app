"use client";

import DynamicTable from "@/components/dynamic-table";
import Linky from "@/components/linky";
import { Tables } from "@/types/supabase";
import { Alert, Button, Dropdown, Tooltip } from "flowbite-react";
import {
  EllipsisVerticalIcon,
  InfoIcon,
  SettingsIcon,
  Trash2Icon,
  VenetianMaskIcon,
} from "lucide-react";

const columns = [
  {
    cellClassNames: "w-full whitespace-nowrap",
    field: "name",
    header: "Name",
    renderCell: (profile: Tables<"profiles">) => (
      <Linky href={`/admin/users/${profile.id}`}>{profile.full_name}</Linky>
    ),
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
    renderCell: (profile: Tables<"profiles">) => "Location A, Location B",
  },
  {
    field: "actions",
    renderCell: () => (
      <>
        <div className="hidden md:block">
          <Button.Group>
            <Button color="light" outline size="sm">
              <Tooltip content="Settings" style="auto">
                <SettingsIcon className="w-5" />
              </Tooltip>
            </Button>
            <Button color="light" outline size="sm">
              <Tooltip content="Impersonate" style="auto">
                <VenetianMaskIcon className="w-5" />
              </Tooltip>
            </Button>
            <Button color="light" outline size="sm">
              <Tooltip content="Trash" style="auto">
                <Trash2Icon className="w-5 text-red-500" />
              </Tooltip>
            </Button>
          </Button.Group>
        </div>
        <div className="md:hidden">
          <Dropdown
            label=""
            renderTrigger={() => <EllipsisVerticalIcon />}
            placement="bottom"
            size="sm"
          >
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Impersonate</Dropdown.Item>
            <Dropdown.Item>Trash</Dropdown.Item>
          </Dropdown>
        </div>
      </>
    ),
  },
];

export default function UsersTable({ data }: { data: Tables<"profiles">[] }) {
  return <DynamicTable<Tables<"profiles">> columns={columns} rows={data} />;
}
