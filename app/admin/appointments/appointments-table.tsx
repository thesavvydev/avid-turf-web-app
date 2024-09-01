"use client";

import DynamicTable from "@/components/dynamic-table";
import Linky from "@/components/linky";
import { Tables } from "@/types/supabase";

const columns = [
  {
    field: "street_address",
    header: "Address",
    renderCell: (appointment: Tables<"appointments">) => (
      <Linky href={`/admin/appointment/${appointment.id}`}>
        {appointment.date}
      </Linky>
    ),
  },
];

export default function AppointmentTable({
  data,
}: {
  data: Tables<"appointments">[];
}) {
  return <DynamicTable<Tables<"appointments">> columns={columns} rows={data} />;
}
