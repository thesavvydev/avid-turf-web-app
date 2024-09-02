import { Badge } from "flowbite-react";

const statuses = {
  lead: {
    color: "indigo",
    name: "Lead",
  },
  complete: {
    color: "green",
    name: "Complete",
  },
  closed: {
    color: "red",
    name: "Closed",
  },
  archived: {
    color: "gray",
    name: "Archived",
  },
};

export type TStatusesBadgeProps = typeof statuses;

export default function StatusBadge({
  status,
}: {
  status: keyof TStatusesBadgeProps;
}) {
  console.log({ statuses, status });
  const { color, name } = statuses[status] ? statuses[status] : statuses.lead;
  return <Badge color={color}>{name}</Badge>;
}
