import { Database } from "@/types/supabase";

type TLeadSource = Database["public"]["Enums"]["lead_sources"];

export const LEAD_SOURCES: {
  [k in TLeadSource]: {
    name: string;
  };
} = {
  "website-form": { name: "Website Form" },
  phone: { name: "Phone" },
  email: { name: "Email" },
  referral: { name: "Referral" },
  other: { name: "Other" },
};
