import { Badge } from "flowbite-react";

export const JOB_STATUSES = {
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

export type TStatusesBadgeProps = typeof JOB_STATUSES;

export default function StatusBadge({
  status,
}: {
  status: keyof TStatusesBadgeProps;
}) {
  const { color, name } = JOB_STATUSES[status]
    ? JOB_STATUSES[status]
    : JOB_STATUSES.lead;
  return <Badge color={color}>{name}</Badge>;
}
