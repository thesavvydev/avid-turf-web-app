"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import { LEAD_SOURCES } from "@/constants/lead-sources";
import { LEAD_STATUSES, TLeadStatus } from "@/constants/lead-statuses";
import { Database, Tables } from "@/types/supabase";
import { formatAsCompactNumber, formatAsCurrency } from "@/utils/formatter";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Datepicker,
  Dropdown,
  Pagination,
  Progress,
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

const LeadsTableContext = createContext<{
  leads: Tables<"location_leads">[];
  leadsCount: number | null;
  handleUpdateSearchParam: (param: string, value: string) => void;
  handleRemoveSearchParam: (param: string, value: string) => void;
  isProcessing: boolean;
  statusCounts: {
    [k in TLeadStatus]: number;
  };
}>({
  leads: [],
  leadsCount: 0,
  handleUpdateSearchParam: () => null,
  handleRemoveSearchParam: () => null,
  isProcessing: false,
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
  leads: Tables<"location_leads">[];
  statusCounts: {
    [k in TLeadStatus]: number;
  };
};

function LeadsTableProvider({
  children,
  leads,
  leadsCount,
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

  const value = useMemo(
    () => ({
      leads,
      leadsCount,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      statusCounts,
    }),
    [
      leads,
      leadsCount,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
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
  const { handleUpdateSearchParam, isProcessing } = useLeadsTableContext();

  return (
    <div className="relative">
      <TextInput
        icon={() => <SearchIcon className="mr-2 size-4" />}
        placeholder="Search by name"
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
        onSelectedDateChanged={(date) =>
          handleUpdateSearchParam(
            "created_after",
            new Date(date).toLocaleDateString(),
          )
        }
      />
      <Datepicker
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
    leads,
    leadsCount,
  } = useLeadsTableContext();
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("per_page") ?? 10);
  const page = Number(searchParams.get("page") ?? 1);

  const numberOfPages = Math.ceil(leads.length / perPage);

  const onPageChange = (page: number) => {
    if (page === 0 || page === 1)
      return handleRemoveSearchParam("page", searchParams.get("page") ?? "");

    handleUpdateSearchParam("page", page.toString());
  };

  return (
    <div className="flex items-center justify-end gap-4 p-4 pt-0 lg:gap-6">
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
        <Pagination
          currentPage={page}
          totalPages={numberOfPages}
          onPageChange={onPageChange}
          showIcons
        />
      )}
    </div>
  );
}

function ActionsCell({ row }: { row: Tables<"location_leads"> }) {
  return (
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
            description={`Are you sure you want to remove ${row.name}?`}
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
            description={`Are you sure you want to remove for ${row.name}?`}
            onConfirmClick={console.log}
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
      render: (row) => (
        <div className="flex items-center gap-1">
          <Avatar size="sm" rounded>
            {row.name}
          </Avatar>
        </div>
      ),
    },
    {
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
      field: "budget",
      header: "Budget",
      render: (row) => formatAsCurrency(Number(row.budget)),
    },
    {
      field: "score",
      header: "Score",
      render: (row) => {
        const determineColor = () => {
          if (row.score > 7) return "indigo";
          if (row.score > 5) return "green";
          if (row.score > 3) return "yellow";
          return "red";
        };
        return (
          <Progress
            size="xl"
            progress={row.score * 10}
            color={determineColor()}
          />
        );
      },
    },
    {
      field: "source",
      header: "Source",
      render: (row) => <span className="capitalize">{row.source}</span>,
    },
    {
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
  const { handleRemoveSearchParam, leads } = useLeadsTableContext();
  const { locationId } = useParams();
  const searchParams = useSearchParams();
  const searchFilterValue = searchParams.get("search");
  const statusFilterValue = searchParams.get("status");
  const sourceFilterValue = searchParams.get("source");
  const createdBeforeFilterValue = searchParams.get("created_before");
  const createdAfterFilterValue = searchParams.get("created_after");
  const pageFilterValue = searchParams.get("page");
  const perPageFilterValue =
    searchParams.get("per_page") && Number(searchParams.get("per_page"));

  const hasFilters = Array.from(searchParams.entries()).length > 0;

  return (
    hasFilters && (
      <>
        <p className="px-4 font-light lg:px-6">
          <span className="font-bold">{leads.length}</span> filtered results
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
                  LEAD_STATUSES[statusFilterValue as keyof typeof LEAD_STATUSES]
                    ?.color
                }
                onClick={() =>
                  handleRemoveSearchParam("status", statusFilterValue)
                }
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>
                    {
                      LEAD_STATUSES[
                        statusFilterValue as keyof typeof LEAD_STATUSES
                      ]?.name
                    }
                  </p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {pageFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">Page</span>
              <Badge
                color="gray"
                onClick={() => handleRemoveSearchParam("page", pageFilterValue)}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{pageFilterValue}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {perPageFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Per Page
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam(
                    "per_page",
                    perPageFilterValue.toString(),
                  )
                }
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{perPageFilterValue}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {sourceFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Source
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam("source", sourceFilterValue)
                }
              >
                <div className="flex cursor-pointer items-center gap-2 capitalize">
                  <p>{sourceFilterValue}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {createdAfterFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Created after
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam(
                    "createed_after",
                    createdAfterFilterValue,
                  )
                }
              >
                <div className="flex cursor-pointer items-center gap-2 capitalize">
                  <p>{createdAfterFilterValue}</p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          {createdBeforeFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Created before
              </span>
              <Badge
                color="gray"
                onClick={() =>
                  handleRemoveSearchParam(
                    "createed_before",
                    createdBeforeFilterValue,
                  )
                }
              >
                <div className="flex cursor-pointer items-center gap-2 capitalize">
                  <p>{createdBeforeFilterValue}</p>
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
  statusCounts,
}: {
  leadsCount: number | null;
  leads: Tables<"location_leads">[];
  statusCounts: {
    [k in TLeadStatus]: number;
  };
}) {
  return (
    <LeadsTableProvider
      leads={leads}
      leadsCount={leadsCount}
      statusCounts={statusCounts}
    >
      <div className="grid gap-4 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900">
        <StatusTabFilters />
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
