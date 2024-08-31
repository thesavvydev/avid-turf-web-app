"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import Linky from "@/components/linky";
import { formatAsPercentage } from "@/utils/formatter";
import { Dropdown, Progress, Table, Tooltip } from "flowbite-react";
import {
  EllipsisVertical,
  EyeIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

const jobs = [
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 1,
    progress: 0.9,
    employees:
      "John Doe, Jane Doe, Doe Jean,John Doe, Jane Doe, Doe Jean,John Doe, Jane Doe, Doe Jean",
  },
  {
    address:
      "1161 S Colton Road 1161 S Colton Road 1161 S Colton Road 1161 S Colton Road",
    start_date: "2024-02-02",
    id: 2,
    progress: 0.2,
    employees: "John Doe",
  },
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 3,
    progress: 0.3,
    employees: "John Doe",
  },
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 4,
    progress: 0.4,
    employees: "John Doe",
  },
  {
    address: "1161 S Colton Road",
    start_date: "2024-02-02",
    id: 5,
    progress: 0.5,
    employees: "John Doe",
  },
];

const columns = [
  {
    field: "address",
    name: "Address",
    render: (row: (typeof jobs)[0]) => (
      <div className="w-full text-wrap">
        <Linky href="/">{row.address}</Linky>
      </div>
    ),
  },
  {
    cellClassNames: "hidden md:table-cell",
    field: "start_date",
    name: "Start Date",
    render: (row: (typeof jobs)[0]) => <div>{row.start_date}</div>,
  },
  {
    cellClassNames: "hidden md:table-cell",
    field: "progress",
    name: "Progress",
    render: (row: (typeof jobs)[0]) => {
      const determineColor = (v: number) => {
        if (v >= 0.75) return "lime";
        if (v >= 0.5) return "purple";
        if (v >= 0.25) return "yellow";
        return "red";
      };

      return (
        <Tooltip
          content={`Job is ${formatAsPercentage(row.progress)} complete.`}
        >
          <div className="w-32">
            <Progress
              progress={100 * row.progress}
              aria-label={`${row.address} Progress`}
              color={determineColor(row.progress)}
              size="md"
            />
          </div>
        </Tooltip>
      );
    },
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
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          {columns.map((column) => (
            <Table.HeadCell
              key={column.field}
              className={twMerge(column.cellClassNames)}
            >
              {column.name}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {jobs.map((job) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={job.id}
            >
              {columns.map((column) => (
                <Table.Cell
                  key={column.field}
                  className={twMerge(column.cellClassNames)}
                >
                  {column.render(job)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
