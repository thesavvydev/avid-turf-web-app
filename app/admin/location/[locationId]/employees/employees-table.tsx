"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import {
  LOCATION_PROFILE_ROLES,
  TLocationProfileRoles,
} from "@/constants/location_profile_roles";
import { TLocationEmployee } from "@/types/location";
import { formatAsCompactNumber, formatAsPercentage } from "@/utils/formatter";
import {
  Alert,
  Badge,
  Button,
  Dropdown,
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
  InfoIcon,
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
import SearchOrInviteUserDrawer from "./search-or-invite-user-drawer";
import UpdateEmployeeDrawer from "./update-employee-drawer";
import { DeleteEmployee } from "./actions";
const EmployeesTableContext = createContext<{
  clearFilters: () => void;
  employees: TLocationEmployee[];
  handleUpdateSearchParam: (arg1: string, arg2: string) => void;
  handleRemoveSearchParam: (arg1: string, arg2: string) => void;
  isProcessing: boolean;
  roleCounts: {
    [key: string]: number;
  };
}>({
  clearFilters: () => null,
  employees: [],
  handleUpdateSearchParam: () => null,
  handleRemoveSearchParam: () => null,
  isProcessing: false,
  roleCounts: {
    admin: 0,
    manager: 0,
    base: 0,
  },
});

function useEmployeesTableContext() {
  const context = useContext(EmployeesTableContext);
  if (context === undefined)
    throw new Error(
      "EmployeesTableContext needs to used be in EmployeesTableContextProvider",
    );

  return context;
}

type TLocationEmployeesTableProviderProps = PropsWithChildren & {
  employees: TLocationEmployee[];
};

function EmployeesTableProvider({
  children,
  employees,
}: TLocationEmployeesTableProviderProps) {
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

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const roleCounts = employees.reduce(
    (dictionary, employee) => {
      dictionary[employee.role] = (dictionary[employee.role] ?? 0) + 1;

      return dictionary;
    },
    { admin: 0, manager: 0, base: 0 },
  );

  const value = useMemo(
    () => ({
      clearFilters,
      employees,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      roleCounts,
    }),
    [
      clearFilters,
      employees,
      handleUpdateSearchParam,
      handleRemoveSearchParam,
      isProcessing,
      roleCounts,
    ],
  );

  return (
    <EmployeesTableContext.Provider value={value}>
      {children}
    </EmployeesTableContext.Provider>
  );
}

function TableSearchFilter() {
  const [value, setValue] = useState("");
  const { handleUpdateSearchParam, isProcessing } = useEmployeesTableContext();

  return (
    <div className="relative grow">
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

function RoleTabFilters() {
  const {
    employees,
    roleCounts,
    handleUpdateSearchParam,
    handleRemoveSearchParam,
  } = useEmployeesTableContext();

  const searchParams = useSearchParams();
  const hasRoleParam = searchParams.has("role");
  const roleParamValue = searchParams.get("role");

  return (
    <Tabs
      onActiveTabChange={(tab) => {
        if (tab === 0) {
          handleRemoveSearchParam("role", roleParamValue ?? "");
        } else {
          handleUpdateSearchParam(
            "role",
            Object.keys(LOCATION_PROFILE_ROLES)[tab - 1],
          );
        }
      }}
      variant="underline"
      theme={{
        tablist: {
          base: twMerge(theme.tabs.tablist.base, "pt-1 pl-1"),
          variant: {
            underline: twMerge(
              theme.tabs.tablist.variant.underline,
              "flex-nowrap",
            ),
          },
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
            All <Badge color="lime">{employees.length}</Badge>
          </div>
        }
        active={!searchParams.has("role")}
      />
      {Object.entries(LOCATION_PROFILE_ROLES).map(([roleKey, role]) => (
        <Tabs.Item
          key={role.name}
          title={
            <div className="flex items-center gap-2">
              <span>{role.name}</span>
              <Badge color={role.color}>
                {formatAsCompactNumber(roleCounts[roleKey] ?? 0)}
              </Badge>
            </div>
          }
          active={hasRoleParam && roleParamValue === roleKey}
        />
      ))}
    </Tabs>
  );
}

function TablePagination() {
  return (
    <div className="flex items-center justify-end gap-4 p-4 lg:gap-6">
      <div className="hidden items-center gap-2">
        <span>Rows per page:</span>
        <Dropdown inline label="5">
          <Dropdown.Item>5</Dropdown.Item>
          <Dropdown.Item>10</Dropdown.Item>
          <Dropdown.Item>15</Dropdown.Item>
          <Dropdown.Item>20</Dropdown.Item>
        </Dropdown>
      </div>
      <p className="hidden">1-5 of 20</p>
      <div className="hidden items-center gap-2">
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

function EmployeeActions({ employee }: { employee: TLocationEmployee }) {
  const router = useRouter();
  const [isUpdateEmployeeDrawerOpen, setIsUpdateEmployeeDrawerOpen] =
    useState(false);

  return (
    <>
      {isUpdateEmployeeDrawerOpen && (
        <UpdateEmployeeDrawer
          isOpen
          setIsOpen={setIsUpdateEmployeeDrawerOpen}
          employee={employee}
        />
      )}
      <div className="relative hidden items-center gap-2 sm:flex">
        <Tooltip content="Settings">
          <span
            className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300"
            onClick={() => setIsUpdateEmployeeDrawerOpen(true)}
          >
            <SettingsIcon />
          </span>
        </Tooltip>
        <Tooltip content="Delete">
          <ConfirmModal
            description={`Are you sure you want to remove ${employee.profile?.full_name} from the location?`}
            onConfirmClick={async () => {
              await DeleteEmployee(employee.location_id, employee.profile_id);
              router.refresh();
            }}
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
          <Dropdown.Item onClick={() => setIsUpdateEmployeeDrawerOpen(true)}>
            Settings
          </Dropdown.Item>
          <ConfirmModal
            description={`Are you sure you want to remove ${employee.profile?.full_name} from the location?`}
            onConfirmClick={async () => {
              await DeleteEmployee(employee.location_id, employee.profile_id);
              router.refresh();
            }}
            trigger={(toggle) => (
              <Dropdown.Item onClick={toggle}>Delete</Dropdown.Item>
            )}
          />
        </Dropdown>
      </div>
    </>
  );
}

function Content() {
  const { employees } = useEmployeesTableContext();

  const columns = [
    {
      field: "name",
      name: "Name",
      render: (row: TLocationEmployee) => row.profile?.full_name,
    },
    {
      field: "role",
      name: "Role",
      render: (row: TLocationEmployee) => LOCATION_PROFILE_ROLES[row.role].name,
    },
    {
      field: "commission",
      name: "Commission",
      render: (row: TLocationEmployee) =>
        formatAsPercentage(row.commission_rate ?? 0),
    },
    {
      cellClassNames: "w-0",
      field: "actions",
      name: "",
      render: (row: TLocationEmployee) => <EmployeeActions employee={row} />,
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
          <Table.HeadCell key={column.name} className={column.cellClassNames}>
            {column.name}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body>
        {employees.map((employee) => (
          <Table.Row
            key={employee.profile_id}
            className="border-b border-dashed border-gray-200 dark:border-gray-700"
          >
            {columns.map((column) => (
              <Table.Cell
                className={column.cellClassNames}
                key={column.name}
                theme={{
                  base: twMerge(theme.table.body.cell.base, "p-5"),
                }}
              >
                {column.render(employee)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function TableActiveFilters() {
  const { handleRemoveSearchParam, clearFilters } = useEmployeesTableContext();
  const searchParams = useSearchParams();
  const searchFilterValue = searchParams.get("search");
  const roleFilterValue = searchParams.get("role");

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
          {roleFilterValue && (
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 p-2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Status
              </span>
              <Badge
                color={
                  LOCATION_PROFILE_ROLES[
                    roleFilterValue as TLocationProfileRoles
                  ]?.color
                }
                onClick={() =>
                  handleRemoveSearchParam("status", roleFilterValue)
                }
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <p>
                    {
                      LOCATION_PROFILE_ROLES[
                        roleFilterValue as TLocationProfileRoles
                      ]?.name
                    }
                  </p>
                  <CircleXIcon className="size-4 fill-gray-600 stroke-gray-100" />
                </div>
              </Badge>
            </div>
          )}
          <Button color="red" outline size="sm" onClick={clearFilters}>
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

function AddEmployee() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <SearchOrInviteUserDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Button color="light" onClick={() => setIsOpen(true)}>
        Add Employee
      </Button>
    </>
  );
}

export default function EmployeesTable({
  employees,
}: {
  employees: TLocationEmployee[];
}) {
  return (
    <EmployeesTableProvider employees={employees}>
      <div className="grid gap-4 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900">
        <div className="overflow-x-auto">
          <RoleTabFilters />
        </div>
        <div className="track flex flex-col gap-4 px-4 sm:flex-row sm:items-center lg:px-6">
          <TableSearchFilter />
          <AddEmployee />
        </div>
        <TableActiveFilters />
        {employees.length === 0 ? (
          <div className="px-6">
            <Alert color="failure" icon={() => <InfoIcon className="mr-2" />}>
              <span className="font-medium">No employees found!</span> If this
              is an error, get help.
            </Alert>
          </div>
        ) : (
          <Content />
        )}
        <TablePagination />
      </div>
    </EmployeesTableProvider>
  );
}
