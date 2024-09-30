"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import Linky from "@/components/linky";
import { LOCATION_JOB_STATUS } from "@/constants/location-job-status";
import { useLocationContext } from "@/contexts/location";
import { useUserContext } from "@/contexts/user";
import { Database, Tables } from "@/types/supabase";
import { formatAsCompactNumber } from "@/utils/formatter";
import getInitials from "@/utils/get-initials";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Datepicker,
  Dropdown,
  Pagination,
  Select,
  Table,
  Tabs,
  TextInput,
  theme,
  Tooltip,
} from "flowbite-react";
import {
  CircleXIcon,
  EllipsisVertical,
  InfoIcon,
  MessageCircleIcon,
  SearchIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { DeleteJob } from "./actions";
import JobMessagesDrawer from "./job-messages-drawer";
import UpdateJobDrawer from "./update-job-drawer";
import { IJob } from "@/types/job";

const JobsTableContext = createContext<{
  jobs: IJob[];
  jobsCount: number | null;
  handleUpdateSearchParam: (param: string, value: string) => void;
  handleRemoveSearchParam: (param: string, value: string) => void;
  isProcessing: boolean;
  paginatedTotal: number;
  statusCounts: {
    [k: string]: number;
  };
}>({
  jobs: [],
  jobsCount: 0,
  handleUpdateSearchParam: () => null,
  handleRemoveSearchParam: () => null,
  isProcessing: false,
  paginatedTotal: 0,
  statusCounts: {
    new: 0,
    qualified: 0,
    nurturing: 0,
    "follow-up": 0,
    lost: 0,
    inactive: 0,
  },
});

function useJobsTableContext() {
  const context = useContext(JobsTableContext);
  if (context === undefined)
    throw new Error(
      "useJobsTableContext needs to used be in JobsTableContextProvider",
    );

  return context;
}

type TJobsTableProviderProps = PropsWithChildren & {
  jobsCount: number | null;
  paginatedTotal: number;
  jobs: IJob[];
  statusCounts: {
    [k: string]: number;
  };
};

function JobsTableProvider({
  children,
  jobs,
  jobsCount,
  paginatedTotal,
  statusCounts,
}: TJobsTableProviderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
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

  const filteredjobs = jobs.filter((item) =>
    searchParams.get("search")
      ? item.address
          ?.toLowerCase()
          .includes(searchParams.get("search")?.toLowerCase() ?? "")
      : true,
  );

  const value = useMemo(
    () => ({
      jobs: filteredjobs,
      jobsCount,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      paginatedTotal,
      statusCounts,
    }),
    [
      filteredjobs,
      jobsCount,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      paginatedTotal,
      statusCounts,
    ],
  );

  return (
    <JobsTableContext.Provider value={value}>
      {children}
    </JobsTableContext.Provider>
  );
}

function TableSearchFilter() {
  const [value, setValue] = useState("");
  const { handleUpdateSearchParam, handleRemoveSearchParam, isProcessing } =
    useJobsTableContext();

  return (
    <div className="relative">
      <TextInput
        autoComplete="off"
        id="name"
        icon={() => <SearchIcon className="mr-2 size-4" />}
        placeholder="Search by name"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (value === "") {
              handleRemoveSearchParam("search", value);
            } else {
              handleUpdateSearchParam("search", value);
            }
          }
        }}
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
  const {
    handleUpdateSearchParam,
    handleRemoveSearchParam,
    statusCounts,
    jobsCount,
  } = useJobsTableContext();

  const searchParams = useSearchParams();
  const hasStatusParam = searchParams.has("status");
  const statusParamValue = searchParams.get("status");

  return (
    <Tabs
      onActiveTabChange={(tab) => {
        if (tab === 0) {
          handleRemoveSearchParam("status", statusParamValue ?? "");
        } else {
          handleUpdateSearchParam(
            "status",
            Object.keys(LOCATION_JOB_STATUS)[tab - 1],
          );
        }
      }}
      variant="underline"
      theme={{
        tablist: {
          base: twMerge(theme.tabs.tablist.base, "pt-1 pl-1 text-nowrap"),
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
            All{" "}
            <Badge color="lime">{formatAsCompactNumber(jobsCount ?? 0)}</Badge>
          </div>
        }
        active={!searchParams.has("status")}
      />
      {Object.entries(LOCATION_JOB_STATUS).map(([statusKey, status]) => (
        <Tabs.Item
          key={status.name}
          title={
            <div className="flex items-center gap-2">
              <span>{status.name}</span>
              <Badge color={status.color}>
                {formatAsCompactNumber(
                  statusCounts[
                    statusKey as Database["public"]["Enums"]["location_job_status"]
                  ] ?? 0,
                )}
              </Badge>
            </div>
          }
          active={hasStatusParam && statusParamValue === statusKey}
        />
      ))}
    </Tabs>
  );
}

function CloserFilter() {
  const {
    location: { profiles },
  } = useLocationContext();
  const searchParams = useSearchParams();
  const { handleUpdateSearchParam, handleRemoveSearchParam } =
    useJobsTableContext();

  return (
    <Select
      name="closer_id"
      onChange={(e) => {
        if (e.target.value === "") {
          handleRemoveSearchParam(
            "closer_id",
            searchParams.get("closer_id") ?? "",
          );
        } else {
          handleUpdateSearchParam("closer_id", e.target.value);
        }
      }}
    >
      <option value="">Select a closer</option>
      {profiles.map(({ profile_id, profile }) => (
        <option key={profile_id} value={profile_id}>
          {profile.full_name}
        </option>
      ))}
    </Select>
  );
}

function InstallerFilter() {
  const {
    location: { profiles },
  } = useLocationContext();
  const searchParams = useSearchParams();
  const { handleUpdateSearchParam, handleRemoveSearchParam } =
    useJobsTableContext();

  return (
    <Select
      name="installer_id"
      onChange={(e) => {
        if (e.target.value === "") {
          handleRemoveSearchParam(
            "installer_id",
            searchParams.get("installer_id") ?? "",
          );
        } else {
          handleUpdateSearchParam("installer_id", e.target.value);
        }
      }}
    >
      <option value="">Select an installer</option>
      {profiles.map(({ profile_id, profile }) => (
        <option key={profile_id} value={profile_id}>
          {profile.full_name}
        </option>
      ))}
    </Select>
  );
}

function DateRangeFilter() {
  const { handleUpdateSearchParam } = useJobsTableContext();

  return (
    <>
      <Datepicker
        id="created_after"
        onSelectedDateChanged={(date) =>
          handleUpdateSearchParam(
            "created_after",
            new Date(date).toLocaleDateString(),
          )
        }
      />
      <Datepicker
        id="created_before"
        onSelectedDateChanged={(date) =>
          handleUpdateSearchParam(
            "created_before",
            new Date(date).toLocaleDateString(),
          )
        }
      />
    </>
  );
}

function TablePagination() {
  const {
    handleUpdateSearchParam,
    handleRemoveSearchParam,
    paginatedTotal,
    jobsCount,
  } = useJobsTableContext();
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("per_page") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);

  const numberOfPages = Math.ceil(paginatedTotal / perPage);

  const onPageChange = (page: number) => {
    if (page === 0 || page === 1)
      return handleRemoveSearchParam("page", searchParams.get("page") ?? "");

    handleUpdateSearchParam("page", page.toString());
  };

  return (
    <div className="flex flex-col items-center justify-end gap-4 p-4 pt-0 sm:flex-row lg:gap-6">
      {(jobsCount ?? 0) >= 10 && (
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <Dropdown inline label={perPage}>
            <Dropdown.Item
              onClick={() => handleUpdateSearchParam("per_page", "5")}
            >
              5
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleUpdateSearchParam("per_page", "10")}
            >
              10
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleUpdateSearchParam("per_page", "15")}
            >
              15
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleUpdateSearchParam("per_page", "20")}
            >
              20
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
      {numberOfPages > 1 && (
        <>
          <div className="hidden sm:block">
            <Pagination
              currentPage={page}
              totalPages={numberOfPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
          <div className="sm:hidden">
            <Pagination
              layout="navigation"
              currentPage={page}
              totalPages={numberOfPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </>
      )}
    </div>
  );
}

function ActionsCell({ row }: { row: Tables<"business_location_jobs"> }) {
  const [isJobDrawerOpen, setIsJobDrawerOpen] = useState(false);
  const [isJobMessageDrawerOpen, setIsJobMessageDrawerOpen] = useState(false);
  const router = useRouter();
  const { user } = useUserContext();

  const isCreator = user.id === row.creator_id;

  const handleDelete = async () => {
    await DeleteJob(row.id);
    router.refresh();
  };

  return (
    <>
      {isJobDrawerOpen && (
        <UpdateJobDrawer
          job={row}
          isOpen={isJobDrawerOpen}
          setIsOpen={setIsJobDrawerOpen}
        />
      )}
      {isJobMessageDrawerOpen && (
        <JobMessagesDrawer
          job={row}
          isOpen={isJobMessageDrawerOpen}
          setIsOpen={setIsJobMessageDrawerOpen}
        />
      )}
      <div className="relative hidden items-center gap-2 sm:flex">
        <Tooltip content="Messages">
          <span
            className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300"
            onClick={() => setIsJobMessageDrawerOpen(true)}
          >
            <MessageCircleIcon />
          </span>
        </Tooltip>
        {isCreator && (
          <>
            <Tooltip content="Settings">
              <span
                className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300"
                onClick={() => setIsJobDrawerOpen(true)}
              >
                <SettingsIcon />
              </span>
            </Tooltip>
            <Tooltip content="Delete">
              <ConfirmModal
                description={`Are you sure you want to remove JOB-${row.id}?`}
                onConfirmClick={handleDelete}
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
          </>
        )}
      </div>
      <div className="w-2 sm:hidden">
        <Dropdown
          label=""
          renderTrigger={() => <EllipsisVertical />}
          size="sm"
          dismissOnClick={false}
        >
          <Dropdown.Item onClick={() => setIsJobMessageDrawerOpen(true)}>
            Messages
          </Dropdown.Item>
          {isCreator && (
            <>
              <Dropdown.Item onClick={() => setIsJobDrawerOpen(true)}>
                Settings
              </Dropdown.Item>
              <ConfirmModal
                description={`Are you sure you want to remove for JOB-${row.id}?`}
                onConfirmClick={handleDelete}
                trigger={(toggle) => (
                  <Dropdown.Item onClick={toggle}>Delete</Dropdown.Item>
                )}
              />
            </>
          )}
        </Dropdown>
      </div>
    </>
  );
}

interface IColumn<RowData> {
  cellClassNames?: string;
  field?: string;
  header?: string;
  render: (arg: RowData) => ReactNode;
}

function Content() {
  const { jobs } = useJobsTableContext();

  const columns: IColumn<(typeof jobs)[0]>[] = [
    {
      field: "name",
      header: "Name",
      render: (row) => (
        <Avatar
          theme={{
            root: { base: twMerge(theme.avatar.root.base, "justify-start") },
          }}
        >
          <div>
            <Linky
              href={`/manage/${row.business_id}/location/${row.business_location_id}/job/${row.id}`}
            >
              {row.full_name ?? "John Doe"}
            </Linky>
            <p className="text-xs text-gray-400">{`JOB-${row.id}`}</p>
          </div>
        </Avatar>
      ),
    },
    {
      cellClassNames: "w-0 text-nowrap hidden sm:table-cell",
      field: "address",
      header: "Address",
      render: (row) => (
        <p>
          {`${row.address}`}
          <br />
          {`${row.city ? `${row.city}, ` : ""}${row.state ? `${row.state} ` : ""}${row.postal_code ? row.postal_code : ""}`}
        </p>
      ),
    },
    {
      cellClassNames: "hidden sm:table-cell w-0 text-nowrap",
      field: "closer",
      header: "Closer",
      render: (row) =>
        row.closer ? (
          <Tooltip content={row.closer.full_name}>
            <Avatar
              placeholderInitials={getInitials(row.closer.full_name ?? "")}
              rounded
              {...(row.closer.avatar_url ? { img: row.closer.avatar_url } : {})}
            />
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      cellClassNames: "hidden sm:table-cell w-0 text-nowrap",
      field: "installer",
      header: "Installer",
      render: (row) =>
        row.installer ? (
          <Tooltip content={row.installer.full_name}>
            <Avatar
              placeholderInitials={getInitials(row.installer.full_name ?? "")}
              rounded
              {...(row.installer?.avatar_url
                ? { img: row.installer.avatar_url }
                : {})}
            />
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      cellClassNames: "w-0 text-nowrap hidden sm:table-cell",
      field: "status",
      header: "Status",
      render: (row) => (
        <div className="flex">
          <Badge color={LOCATION_JOB_STATUS[row.status].color}>
            {LOCATION_JOB_STATUS[row.status].name}
          </Badge>
        </div>
      ),
    },
    {
      cellClassNames: "hidden sm:table-cell w-0 text-nowrap",
      field: "created",
      header: "Created",
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      cellClassNames: "w-0",
      field: "actions",
      header: "",
      render: (row) => <ActionsCell row={row} />,
    },
  ];

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
          <Table.HeadCell key={column.header} className={column.cellClassNames}>
            {column.header}
          </Table.HeadCell>
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
                key={column.header}
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
  const { handleRemoveSearchParam, paginatedTotal } = useJobsTableContext();
  const { locationId, businessId } = useParams();
  const searchParams = useSearchParams();
  const {
    search,
    status,
    source,
    created_before,
    created_after,
    page,
    per_page,
  } = Object.fromEntries(searchParams);
  const hasFilters = Array.from(searchParams.entries())?.length > 0;

  return (
    hasFilters && (
      <>
        <p className="px-4 font-light lg:px-6">
          <span className="font-bold">{paginatedTotal}</span> filtered results
        </p>
        <div className="flex flex-col gap-2 px-4 sm:flex-row sm:items-center lg:px-6">
          {search && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Search
              </span>
              <Badge
                color="gray"
                onClick={() => handleRemoveSearchParam("search", search)}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{search}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {status && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Status
              </span>
              <Badge
                color={
                  LOCATION_JOB_STATUS[
                    status as keyof typeof LOCATION_JOB_STATUS
                  ]?.color
                }
                onClick={() => handleRemoveSearchParam("status", status)}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>
                    {
                      LOCATION_JOB_STATUS[
                        status as keyof typeof LOCATION_JOB_STATUS
                      ]?.name
                    }
                  </p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {page && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">Page</span>
              <Badge
                color="gray"
                onClick={() => handleRemoveSearchParam("page", page)}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{page}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {per_page && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Per Page
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam("per_page", per_page.toString())
                }
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{per_page}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {source && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Source
              </span>
              <Badge
                color="gray"
                onClick={() => handleRemoveSearchParam("source", source)}
              >
                <div className="flex cursor-pointer items-center gap-2 capitalize">
                  <p>{source}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {created_after && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Created after
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam("createed_after", created_after)
                }
              >
                <div className="flex cursor-pointer items-center gap-2 capitalize">
                  <p>{created_after}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {created_before && (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Created before
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam("createed_before", created_before)
                }
              >
                <div className="flex cursor-pointer items-center gap-2 capitalize">
                  <p>{created_before}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          <Button
            color="red"
            outline
            size="sm"
            href={`/manage/${businessId}/location/${locationId}/jobs`}
          >
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

export default function JobsTable({
  jobsCount,
  jobs,
  paginatedTotal,
  statusCounts,
}: {
  jobsCount: number | null;
  jobs: IJob[];
  paginatedTotal: number;
  statusCounts: {
    [k: string]: number;
  };
}) {
  return (
    <JobsTableProvider
      jobs={jobs}
      jobsCount={jobsCount}
      statusCounts={statusCounts}
      paginatedTotal={paginatedTotal}
    >
      <div className="grid gap-4 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900">
        <div className="overflow-x-auto">
          <StatusTabFilters />
        </div>
        <div className="track grid gap-4 px-4 md:grid-cols-5 lg:px-6">
          <TableSearchFilter />
          <CloserFilter />
          <InstallerFilter />
          <DateRangeFilter />
        </div>
        <TableActiveFilters />
        {jobs?.length === 0 ? (
          <div className="px-4">
            <Alert color="failure" icon={() => <InfoIcon className="mr-2" />}>
              <span className="font-medium">No rows found!</span> If this is an
              error, get help.
            </Alert>
          </div>
        ) : (
          <Content />
        )}

        <TablePagination />
      </div>
    </JobsTableProvider>
  );
}
