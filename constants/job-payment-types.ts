export type TJobPaymentTypes = keyof typeof JOB_PAYMENT_TYPES;

export const JOB_PAYMENT_TYPES = {
  cash: { name: "Cash", color: "green" },
  credit: { name: "Credit", color: "brown" },
  finance: { name: "Finance", color: "emerald" },
};
