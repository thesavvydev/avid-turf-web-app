"use client";
import { Tables } from "@/types/supabase";
import { formatAsCurrency } from "@/utils/formatter";
import { Table, theme } from "flowbite-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TTableColumnConfig = {
  field: string;
  header: string;
  cellClassNames?: string;
  render: (r: Tables<"business_products">) => ReactNode;
};

export default function ProductsTable({
  products,
}: {
  products: Tables<"business_products">[];
}) {
  const columns: TTableColumnConfig[] = [
    {
      field: "name",
      header: "Name",
      render: (row) => row.name,
    },
    {
      field: "measurement",
      header: "Measurement",
      render: (row) => row.measurement,
    },
    {
      cellClassNames: "text-right",
      field: "price_per_measurement",
      header: "Price Per Measurement",
      render: (row) => formatAsCurrency(row.price_per_measurement),
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
