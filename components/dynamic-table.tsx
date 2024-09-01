"use client";

import { Alert, Table } from "flowbite-react";
import { InfoIcon } from "lucide-react";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IColumn<RowData> {
  cellClassNames?: string;
  field?: string;
  header?: string;
  renderCell: (arg: RowData) => ReactNode;
}

type TDynamicTableProps<RowData> = {
  columns: IColumn<RowData>[];
  rows: RowData[];
};

export default function DynamicTable<RowData>({
  columns,
  rows,
}: TDynamicTableProps<RowData & { id: string | number }>) {
  return rows.length ? (
    <Table theme={{ root: { shadow: "" } }}>
      <Table.Head>
        {columns.map((column) => (
          <Table.HeadCell
            className={twMerge(column.cellClassNames)}
            key={column.field}
          >
            {column.header}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            {columns.map((column) => (
              <Table.Cell
                key={column.field}
                className={twMerge(column.cellClassNames)}
              >
                {column.renderCell(row)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ) : (
    <Alert color="failure" icon={() => <InfoIcon className="mr-2" />}>
      <span className="font-medium">No rows found!</span> If this is an error,
      get help.
    </Alert>
  );
}
