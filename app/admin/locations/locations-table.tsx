"use client";

import DynamicTable from "@/components/dynamic-table";
import Linky from "@/components/linky";
import { Tables } from "@/types/supabase";

const columns = [
  {
    field: "name",
    header: "Name",
    renderCell: (location: Tables<"locations">) => (
      <Linky href={`/admin/location/${location.id}`}>{location.name}</Linky>
    ),
  },
  {
    field: "employees",
    header: "# Employees",
    renderCell: (location: Tables<"locations">) => 5,
  },
];

export default function LocationsTable({
  data,
}: {
  data: Tables<"locations">[];
}) {
  return <DynamicTable<Tables<"locations">> columns={columns} rows={data} />;
}
