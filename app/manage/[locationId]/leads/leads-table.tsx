"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import Linky from "@/components/linky";
import { LEAD_SOURCES } from "@/constants/lead-sources";
import { LEAD_STATUSES, TLeadStatus } from "@/constants/lead-statuses";
import { Database, Tables } from "@/types/supabase";
import { formatAsCompactNumber, formatAsCurrency } from "@/utils/formatter";
import {
  Alert,
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
  EyeIcon,
  InfoIcon,
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
import { DeleteLead } from "./actions";
import UpdateLeadDrawer from "./update-lead-drawer";

const LeadsTableContext = createContext<{
  leads: Tables<"location_leads">[];
  leadsCount: number | null;
  handleUpdateSearchParam: (param: string, value: string) => void;
  handleRemoveSearchParam: (param: string, value: string) => void;
  isProcessing: boolean;
  paginatedTotal: number;
  statusCounts: {
    [k in TLeadStatus]: number;
  };
}>({
  leads: [],
  leadsCount: 0,
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

function useLeadsTableContext() {
  const context = useContext(LeadsTableContext);
  if (context === undefined)
    throw new Error(
      "useLeadsTableContext needs to used be in LeadsTableContextProvider",
    );

  return context;
}

type TLeadsTableProviderProps = PropsWithChildren & {
  leadsCount: number | null;
  paginatedTotal: number;
  leads: Tables<"location_leads">[];
  statusCounts: {
    [k in TLeadStatus]: number;
  };
};

function LeadsTableProvider({
  children,
  leads,
  leadsCount,
  paginatedTotal,
  statusCounts,
}: TLeadsTableProviderProps) {
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

  const filteredLeads = leads.filter((item) =>
    searchParams.get("search")
      ? item.name
          .toLowerCase()
          .includes(searchParams.get("search")?.toLowerCase() ?? "")
      : true,
  );

  const value = useMemo(
    () => ({
      leads: filteredLeads,
      leadsCount,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      paginatedTotal,
      statusCounts,
    }),
    [
      filteredLeads,
      leadsCount,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      paginatedTotal,
      statusCounts,
    ],
  );

  return (
    <LeadsTableContext.Provider value={value}>
      {children}
    </LeadsTableContext.Provider>
  );
}

function TableSearchFilter() {
  const [value, setValue] = useState("");
  const { handleUpdateSearchParam, handleRemoveSearchParam, isProcessing } =
    useLeadsTableContext();

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
    leadsCount,
  } = useLeadsTableContext();

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
            Object.keys(LEAD_STATUSES)[tab - 1],
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
            <Badge color="lime">{formatAsCompactNumber(leadsCount ?? 0)}</Badge>
          </div>
        }
        active={!searchParams.has("status")}
      />
      {Object.entries(LEAD_STATUSES).map(([statusKey, status]) => (
        <Tabs.Item
          key={status.name}
          title={
            <div className="flex items-center gap-2">
              <span>{status.name}</span>
              <Badge color={status.color}>
                {formatAsCompactNumber(
                  statusCounts[
                    statusKey as Database["public"]["Enums"]["lead_statuses"]
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

function SourceFilter() {
  const searchParams = useSearchParams();
  const { handleUpdateSearchParam, handleRemoveSearchParam } =
    useLeadsTableContext();

  return (
    <Select
      name="source"
      onChange={(e) => {
        if (e.target.value === "") {
          handleRemoveSearchParam("source", searchParams.get("source") ?? "");
        } else {
          handleUpdateSearchParam("source", e.target.value);
        }
      }}
    >
      <option value="">Select a source</option>
      {Object.entries(LEAD_SOURCES).map(([leadSourceKey, leadSource]) => (
        <option key={leadSourceKey} value={leadSourceKey}>
          {leadSource.name}
        </option>
      ))}
    </Select>
  );
}

function DateRangeFilter() {
  const { handleUpdateSearchParam } = useLeadsTableContext();

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
    leadsCount,
  } = useLeadsTableContext();
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
      {(leadsCount ?? 0) >= 10 && (
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

function ActionsCell({ row }: { row: Tables<"location_leads"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    await DeleteLead(row.id);
    router.refresh();
  };

  return (
    <>
      {isOpen && (
        <UpdateLeadDrawer
          locationLead={row}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <div className="relative hidden items-center gap-2 sm:flex">
        <Tooltip content="Details">
          <span
            className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300"
            onClick={() =>
              router.push(`/manage/${row.location_id}/lead/${row.id}`)
            }
          >
            <EyeIcon />
          </span>
        </Tooltip>
        <Tooltip content="Settings">
          <span
            className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300"
            onClick={() => setIsOpen(true)}
          >
            <SettingsIcon />
          </span>
        </Tooltip>
        <Tooltip content="Delete">
          <ConfirmModal
            description={`Are you sure you want to remove ${row.name}?`}
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
      </div>
      <div className="w-2 sm:hidden">
        <Dropdown
          label=""
          renderTrigger={() => <EllipsisVertical />}
          size="sm"
          dismissOnClick={false}
        >
          <Dropdown.Item
            onClick={() =>
              router.push(`/manage/${row.location_id}/lead/${row.id}`)
            }
          >
            Details
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setIsOpen(true)}>
            Settings
          </Dropdown.Item>
          <ConfirmModal
            description={`Are you sure you want to remove for ${row.name}?`}
            onConfirmClick={handleDelete}
            trigger={(toggle) => (
              <Dropdown.Item onClick={toggle}>Delete</Dropdown.Item>
            )}
          />
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
  const { leads } = useLeadsTableContext();

  const columns: IColumn<(typeof leads)[0]>[] = [
    {
      field: "name",
      header: "Name",
      render: (row) => {
        const determineColor = () => {
          if (row.score > 7) return "stroke-indigo-500";
          if (row.score > 5) return "stroke-green-500";
          if (row.score > 3) return "stroke-yellow-500";
          return "stroke-red-500";
        };
        return (
          <div className="flex items-center gap-2">
            <div className="relative size-8 flex-shrink-0">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 34 34"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="17"
                  cy="17"
                  r="14"
                  fill="none"
                  className="stroke-current text-gray-200 dark:text-neutral-700"
                  strokeWidth="2"
                />
                <circle
                  cx="17"
                  cy="17"
                  r="14"
                  fill="none"
                  className={twMerge(
                    "stroke-current text-lime-600 dark:text-lime-500",
                    determineColor(),
                  )}
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset={100 - row.score * 10}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs font-bold text-gray-400">
                {row.score}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Linky href={`/manage/${row.location_id}/lead/${row.id}`}>
                {row.name}
              </Linky>
              <div className="sm:hidden">
                <Badge color={LEAD_STATUSES[row.status].color}>
                  {LEAD_STATUSES[row.status].name}
                </Badge>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      cellClassNames: "w-0 text-nowrap hidden sm:table-cell",
      field: "status",
      header: "Status",
      render: (row) => (
        <div className="flex">
          <Badge color={LEAD_STATUSES[row.status].color}>
            {LEAD_STATUSES[row.status].name}
          </Badge>
        </div>
      ),
    },
    {
      cellClassNames: "text-right hidden sm:table-cell",
      field: "budget",
      header: "Budget",
      render: (row) => formatAsCurrency(Number(row.budget)),
    },
    {
      cellClassNames: "hidden sm:table-cell",
      field: "source",
      header: "Source",
      render: (row) => <span className="capitalize">{row.source}</span>,
    },
    {
      cellClassNames: "hidden sm:table-cell",
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
        {leads.map((lead) => (
          <Table.Row
            key={lead.id}
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
                {column.render(lead)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function TableActiveFilters() {
  const { handleRemoveSearchParam, paginatedTotal } = useLeadsTableContext();
  const { locationId } = useParams();
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
  const hasFilters = Array.from(searchParams.entries()).length > 0;

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
                  LEAD_STATUSES[status as keyof typeof LEAD_STATUSES]?.color
                }
                onClick={() => handleRemoveSearchParam("status", status)}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>
                    {LEAD_STATUSES[status as keyof typeof LEAD_STATUSES]?.name}
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
            href={`/manage/${locationId}/leads`}
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

export default function LeadsTable({
  leadsCount,
  leads,
  paginatedTotal,
  statusCounts,
}: {
  leadsCount: number | null;
  leads: Tables<"location_leads">[];
  paginatedTotal: number;
  statusCounts: {
    [k in TLeadStatus]: number;
  };
}) {
  return (
    <LeadsTableProvider
      leads={leads}
      leadsCount={leadsCount}
      statusCounts={statusCounts}
      paginatedTotal={paginatedTotal}
    >
      <div className="grid gap-4 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900">
        <div className="overflow-x-auto">
          <StatusTabFilters />
        </div>
        <div className="track grid gap-4 px-4 md:grid-cols-4 lg:px-6">
          <TableSearchFilter />
          <SourceFilter />
          <DateRangeFilter />
        </div>
        <TableActiveFilters />
        {leads.length === 0 ? (
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
    </LeadsTableProvider>
  );
}
