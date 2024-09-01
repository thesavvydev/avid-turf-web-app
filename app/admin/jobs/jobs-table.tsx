"use client";

import DynamicTable from "@/components/dynamic-table";
import Linky from "@/components/linky";
import { Tables } from "@/types/supabase";

const columns = [
  {
    field: "street_address",
    header: "Address",
    renderCell: (job: Tables<"jobs">) => (
      <Linky href={`/admin/job/${job.id}`}>{job.street_address}</Linky>
    ),
  },
];

export default function JobsTable({ data }: { data: Tables<"jobs">[] }) {
  return <DynamicTable<Tables<"jobs">> columns={columns} rows={data} />;
}
