"use client";
import { ConfirmModal } from "@/components/confirm-modal";
import { Tables } from "@/types/supabase";
import { formatAsCurrency } from "@/utils/formatter";
import { Dropdown, Table, theme, Tooltip } from "flowbite-react";
import { EllipsisVertical, SettingsIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import UpdateProductDrawer from "./update-product-drawer";
import { DeleteProduct } from "./actions";

type TTableColumnConfig = {
  field: string;
  header: string;
  cellClassNames?: string;
  render: (r: Tables<"business_products">) => ReactNode;
};

function ActionsCell({ row }: { row: Tables<"business_products"> }) {
  const [isUpdateProductDrawerOpen, setIsUpdateProductDrawerOpen] =
    useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    await DeleteProduct(row.id);
    router.refresh();
  };

  return (
    <>
      {isUpdateProductDrawerOpen && (
        <UpdateProductDrawer
          isOpen
          product={row}
          setIsOpen={setIsUpdateProductDrawerOpen}
        />
      )}
      <div className="relative hidden items-center gap-2 sm:flex">
        <>
          <Tooltip content="Settings">
            <span
              className="cursor-pointer text-lg text-gray-500 active:opacity-50 dark:text-gray-300"
              onClick={() => setIsUpdateProductDrawerOpen(true)}
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
        </>
      </div>
      <div className="w-2 sm:hidden">
        <Dropdown
          label=""
          renderTrigger={() => <EllipsisVertical />}
          size="sm"
          dismissOnClick={false}
        >
          <Dropdown.Item onClick={() => setIsUpdateProductDrawerOpen(true)}>
            Settings
          </Dropdown.Item>
          <ConfirmModal
            description={`Are you sure you want to remove ${row.name}?`}
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

export default function ProductsTable({
  products,
}: {
  products: Tables<"business_products">[];
}) {
  const columns: TTableColumnConfig[] = [
    {
      cellClassNames: "",
      field: "name",
      header: "Name",
      render: (row) => (
        <>
          <span className="hidden sm:table-cell">{row.name}</span>
          <span className="grid gap-2 sm:hidden">
            <div>{row.name}</div>
            <div>{`${formatAsCurrency(row.price_per_measurement)} per ${row.measurement}`}</div>
          </span>
        </>
      ),
    },
    {
      cellClassNames: "hidden sm:table-cell",
      field: "measurement",
      header: "Measurement",
      render: (row) => row.measurement,
    },
    {
      cellClassNames: "text-right hidden sm:table-cell",
      field: "price_per_measurement",
      header: "Price Per",
      render: (row) => formatAsCurrency(row.price_per_measurement),
    },
    {
      cellClassNames: "text-right hidden sm:table-cell",
      field: "lead_price",
      header: "Lead Price",
      render: (row) => formatAsCurrency(row.lead_price),
    },
    {
      cellClassNames: "w-0",
      field: "actions",
      header: "",
      render: (row) => <ActionsCell row={row} />,
    },
  ];

  return (
    <div
      id="jobs-table"
      className="grid gap-4 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900"
    >
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
            <Table.HeadCell
              key={column.header}
              className={column.cellClassNames ?? ""}
            >
              {column.header}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {products.map((product) => (
            <Table.Row
              key={product.id}
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
                  {column.render(product)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
