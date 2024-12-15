export type TJobLeadTypes = keyof typeof JOB_LEAD_TYPES;
export const JOB_LEAD_TYPES = {
  self: { name: "Self Generated", color: "green" },
  referral: { name: "Referral", color: "brown" },
  paid: { name: "Paid", color: "emerald" },
  setter: { name: "Setter Generated", color: "yellow" },
};
