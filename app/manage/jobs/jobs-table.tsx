"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import Linky from "@/components/linky";
import StatusBadge, { TStatusesBadgeProps } from "@/components/status-badge";
import { formatAsCompactCurrency, formatAsCurrency } from "@/utils/formatter";
import {
  Badge,
  Checkbox,
  Datepicker,
  Dropdown,
  Select,
  Table,
  Tabs,
  TextInput,
  theme,
  Tooltip,
} from "flowbite-react";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  EyeIcon,
  MapPinIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

const jobs = [
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 1,
    city: "Washington",
    amount: 10_000,
    status: "lead",
    employees:
      "John Doe, Jane Doe, Doe Jean,John Doe, Jane Doe, Doe Jean,John Doe, Jane Doe, Doe Jean",
  },
  {
    address:
      "1161 S Colton Road 1161 S Colton Road 1161 S Colton Road 1161 S Colton Road",
    start_date: "2024-02-02",
    id: 2,
    city: "Ivins",
    amount: 20_000,
    status: "complete",
    employees: "John Doe",
  },
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 3,
    city: "Santa Clara",
    amount: 30_000,
    status: "lead",
    employees: "John Doe",
  },
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 4,
    city: "St George",
    amount: 40_000,
    status: "closed",
    employees: "John Doe",
  },
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 5,
    city: "St George",
    amount: 50_000,
    status: "archived",
    employees: "John Doe",
  },
];

const columns = [
  {
    field: "address",
    name: "Address",
    render: (row: (typeof jobs)[0]) => (
      <div className="flex items-center gap-1">
        <MapPinIcon className="hidden size-6 text-gray-400 md:block" />
        <div>
          <p>
            <Linky href={`/manage/job/${row.id}`}>{row.address}</Linky>
          </p>
          <p className="text-sm text-gray-400">{`ORDER-${row.id}`}</p>
        </div>
      </div>
    ),
  },
  {
    cellClassNames: "hidden md:table-cell",
    field: "city",
    name: "City",
    render: (row: (typeof jobs)[0]) => row.city,
  },
  {
    cellClassNames: "hidden md:table-cell",
    field: "start_date",
    name: "Start Date",
    render: (row: (typeof jobs)[0]) => (
      <div className="w-28">
        {new Date(row.start_date).toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
      </div>
    ),
  },
  {
    cellClassNames: "hidden md:table-cell",
    field: "amount",
    name: "Amount",
    render: (row: (typeof jobs)[0]) => (
      <div className="w-28">{formatAsCurrency(row.amount)}</div>
    ),
  },
  {
    field: "status",
    name: "Status",
    render: (row: (typeof jobs)[0]) => (
      <div className="flex">
        <StatusBadge status={row.status as keyof TStatusesBadgeProps} />
      </div>
    ),
  },
  {
    field: "actions",
    name: "",
    render: (row: (typeof jobs)[0]) => (
      <>
        <div className="relative hidden items-center gap-2 sm:flex">
          <Tooltip content="Details">
            <span className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Settings">
            <span className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300">
              <SettingsIcon />
            </span>
          </Tooltip>
          <Tooltip content="Delete">
            <ConfirmModal
              description={`Are you sure you want to remove this job for ${row.address}?`}
              onConfirmClick={console.log}
              trigger={(toggle) => (
                <span
                  className="cursor-pointer text-lg text-red-500 active:opacity-50"
                  onClick={toggle}
                >
                  <Trash2Icon />
                </span>
              )}
            />
          </Tooltip>
        </div>
        <div className="w-2 sm:hidden">
          <Dropdown
            label=""
            renderTrigger={() => <EllipsisVertical />}
            size="sm"
            dismissOnClick={false}
          >
            <Dropdown.Item>Details</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <ConfirmModal
              description={`Are you sure you want to remove this job for ${row.address}?`}
              onConfirmClick={console.log}
              trigger={(toggle) => (
                <Dropdown.Item onClick={toggle}>Delete</Dropdown.Item>
              )}
            />
          </Dropdown>
        </div>
      </>
    ),
  },
];

export default function JobsTable() {
  return (
    <div className="grid overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900">
      <Tabs
        variant="underline"
        theme={{
          tablist: {
            base: twMerge(theme.tabs.tablist.base, "pt-1 pl-1"),
            tabitem: {
              variant: {
                underline: {
                  base: "font-light",
                  active: {
                    on: twMerge(
                      theme.tabs.tablist.tabitem.variant.underline.active.on,
                      "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400 focus:ring-primary-400 focus:ring-1 rounded-none",
                    ),
                  },
                },
              },
            },
          },
          tabpanel: "hidden",
        }}
      >
        <Tabs.Item
          title={
            <div className="flex items-center gap-2">
              All <Badge color="lime">1M</Badge>
            </div>
          }
        />
        <Tabs.Item
          title={
            <div className="flex items-center gap-2">
              Leads <Badge color="indigo">20K</Badge>
            </div>
          }
        />
        <Tabs.Item
          title={
            <div className="flex items-center gap-2">
              Complete <Badge color="green">1K</Badge>
            </div>
          }
        />
        <Tabs.Item
          title={
            <div className="flex items-center gap-2">
              Closed <Badge color="red">20K</Badge>
            </div>
          }
        />
        <Tabs.Item
          title={
            <div className="flex items-center gap-2">
              Archive <Badge color="gray">1K</Badge>
            </div>
          }
        />
      </Tabs>
      <div className="track grid gap-4 p-4 md:grid-cols-4 lg:p-6">
        <TextInput
          icon={() => <SearchIcon className="mr-2 size-4" />}
          placeholder="Search by job # or address"
        />
        <Select>
          <option>Select a city</option>
          <option>Hurricane</option>
          <option>Ivins</option>
          <option>Santa Clara</option>
          <option>St George</option>
          <option>Washington</option>
        </Select>
        <Datepicker />
        <Datepicker />
      </div>
      <Table>
        <Table.Head
          theme={{
            base: "rounded-none",
            cell: {
              base: twMerge(
                theme.table.head.cell.base,
                "capitalize tracking-wide text-gray-500 text-sm font-normal",
              ),
            },
          }}
        >
          {columns.map((column) => (
            <Table.HeadCell key={column.name}>{column.name}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {jobs.map((job) => (
            <Table.Row
              key={job.id}
              className="border-b border-dashed border-gray-200 dark:border-gray-700"
            >
              {columns.map((column) => (
                <Table.Cell
                  key={column.name}
                  theme={{
                    base: twMerge(
                      theme.table.body.cell.base,
                      column.cellClassNames,
                      "p-5",
                    ),
                  }}
                >
                  {column.render(job)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-end gap-4 p-4 lg:gap-6">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Dropdown inline label="5">
            <Dropdown.Item>5</Dropdown.Item>
            <Dropdown.Item>10</Dropdown.Item>
            <Dropdown.Item>15</Dropdown.Item>
            <Dropdown.Item>20</Dropdown.Item>
          </Dropdown>
        </div>
        <p>1-5 of 20</p>
        <div className="flex items-center gap-2">
          <div className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronLeft />
          </div>
          <div className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}
