import { Database } from "@/types/supabase";

type TLeadStatus = Database["public"]["Enums"]["lead_statuses"];

export const LEAD_STATUSES: {
  [k in TLeadStatus]: {
    name: string;
    color: string;
  };
} = {
  new: { name: "New", color: "green" },
  qualified: { name: "Qualified", color: "cyan" },
  nurturing: { name: "Nurturing", color: "blue" },
  "follow-up": { name: "Follow Up", color: "gray" },
  lost: { name: "Lost", color: "red" },
  inactive: { name: "Inactive", color: "yellow" },
};
