"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import Linky from "@/components/linky";
import StatusBadge, {
  JOB_STATUSES,
  TStatusesBadgeProps,
} from "@/components/status-badge";
import { formatAsCompactCurrency, formatAsCurrency } from "@/utils/formatter";
import {
  Badge,
  Button,
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
  CircleXIcon,
  EllipsisVertical,
  EyeIcon,
  MapPinIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

const mockJobs = [
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
    render: (row: (typeof mockJobs)[0]) => (
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
    render: (row: (typeof mockJobs)[0]) => row.city,
  },
  {
    cellClassNames: "hidden md:table-cell",
    field: "start_date",
    name: "Start Date",
    render: (row: (typeof mockJobs)[0]) => (
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
    render: (row: (typeof mockJobs)[0]) => (
      <div className="w-28">{formatAsCurrency(row.amount)}</div>
    ),
  },
  {
    field: "status",
    name: "Status",
    render: (row: (typeof mockJobs)[0]) => (
      <div className="flex">
        <StatusBadge status={row.status as keyof TStatusesBadgeProps} />
      </div>
    ),
  },
  {
    field: "actions",
    name: "",
    render: (row: (typeof mockJobs)[0]) => (
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

const JobsTableContext = createContext<{
  data: typeof mockJobs;
  handleUpdateSearchParam: (arg1: string, arg2: string) => void;
  handleRemoveSearchParam: (arg1: string, arg2: string) => void;
  isProcessing: boolean;
}>({
  data: [],
  handleUpdateSearchParam: () => null,
  handleRemoveSearchParam: () => null,
  isProcessing: false,
});

function useJobsTableContext() {
  const context = useContext(JobsTableContext);
  if (context === undefined)
    throw new Error(
      "useJobsTableContext needs to used be in JobsTableContextProvider",
    );

  return context;
}

type TJobsTableProviderProps = PropsWithChildren & { jobs: typeof mockJobs };

function JobsTableProvider({ children, jobs }: TJobsTableProviderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState(jobs);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateSearchParam = useCallback(
    (param: string, value: string) => {
      setIsProcessing(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set(param, value);

      router.push(`${pathname}?${params.toString()}`);
      setIsProcessing(false);
    },
    [pathname, router, searchParams],
  );

  const handleRemoveSearchParam = useCallback(
    (param: string, value: string) => {
      setIsProcessing(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete(param, value);

      router.push(`${pathname}?${params.toString()}`);
      setIsProcessing(false);
    },
    [pathname, router, searchParams],
  );

  const value = useMemo(
    () => ({
      data,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
    }),
    [data, handleUpdateSearchParam, handleRemoveSearchParam, isProcessing],
  );

  return (
    <JobsTableContext.Provider value={value}>
      {children}
    </JobsTableContext.Provider>
  );
}

function TableSearchFilter() {
  const [value, setValue] = useState("");
  const { handleUpdateSearchParam, isProcessing } = useJobsTableContext();

  return (
    <div className="relative">
      <TextInput
        icon={() => <SearchIcon className="mr-2 size-4" />}
        placeholder="Search by job # or address"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        disabled={isProcessing}
      />
      {value.length >= 1 && (
        <div className="absolute bottom-1 right-1">
          <Button
            color="light"
            outline
            size="xs"
            onClick={() => handleUpdateSearchParam("search", value)}
            isProcessing={isProcessing}
          >
            {isProcessing ? "Searching..." : "Search"}
          </Button>
        </div>
      )}
    </div>
  );
}

function StatusTabFilters() {
  const { handleUpdateSearchParam, handleRemoveSearchParam } =
    useJobsTableContext();

  const searchParams = useSearchParams();
  const hasStatusParam = searchParams.has("status");
  const statusParamValue = searchParams.get("status");

  return (
    <Tabs
      onActiveTabChange={(tab) => {
        if (tab === 0) {
          handleRemoveSearchParam("status", statusParamValue ?? "");
        } else {
          handleUpdateSearchParam("status", Object.keys(JOB_STATUSES)[tab - 1]);
        }
      }}
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
        active={!searchParams.has("status")}
      />
      {Object.entries(JOB_STATUSES).map(([statusKey, status]) => (
        <Tabs.Item
          key={status.name}
          title={
            <div className="flex items-center gap-2">
              <span>{status.name}</span>
              <Badge color={status.color}>1M</Badge>
            </div>
          }
          active={hasStatusParam && statusParamValue === statusKey}
        />
      ))}
    </Tabs>
  );
}

function CityFilter() {
  return (
    <Select>
      <option>Select a city</option>
      <option>Hurricane</option>
      <option>Ivins</option>
      <option>Santa Clara</option>
      <option>St George</option>
      <option>Washington</option>
    </Select>
  );
}

function DateRangeFilter() {
  return (
    <>
      <Datepicker />
      <Datepicker />
    </>
  );
}

function TablePagination() {
  return (
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
  );
}

function Content() {
  const { data } = useJobsTableContext();

  return (
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
          <Table.HeadCell key={column.name} className={column.cellClassNames}>
            {column.name}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body>
        {data.map((job) => (
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
  );
}

function TableActiveFilters() {
  const { handleRemoveSearchParam } = useJobsTableContext();
  const searchParams = useSearchParams();
  const searchFilterValue = searchParams.get("search");
  const statusFilterValue = searchParams.get("status");

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    hasFilters && (
      <>
        <p className="px-4 font-light lg:px-6">
          <span className="font-bold">20</span> filtered results
        </p>
        <div className="flex items-center gap-2 px-4 lg:px-6">
          {searchFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Search
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam("search", searchFilterValue)
                }
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{searchFilterValue}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {statusFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Status
              </span>
              <Badge
                color={
                  JOB_STATUSES[statusFilterValue as keyof typeof JOB_STATUSES]
                    ?.color
                }
                onClick={() =>
                  handleRemoveSearchParam("status", statusFilterValue)
                }
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>
                    {
                      JOB_STATUSES[
                        statusFilterValue as keyof typeof JOB_STATUSES
                      ]?.name
                    }
                  </p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          <Button color="red" outline size="sm" href="/manage/jobs">
            <div className="flex items-center gap-1 text-red-500">
              <Trash2Icon className="size-5" />
              Clear
            </div>
          </Button>
        </div>
      </>
    )
  );
}

export default function JobsTable() {
  return (
    <JobsTableProvider jobs={mockJobs}>
      <div className="grid gap-4 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900">
        <StatusTabFilters />
        <div className="track grid gap-4 px-4 md:grid-cols-4 lg:px-6">
          <TableSearchFilter />
          <CityFilter />
          <DateRangeFilter />
        </div>
        <TableActiveFilters />
        <Content />
        <TablePagination />
      </div>
    </JobsTableProvider>
  );
}
