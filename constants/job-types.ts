export type TJobProfileRoles = keyof typeof JOB_TYPES;

export const JOB_TYPES = {
  turf: { name: "Turf", color: "green" },
  desert: { name: "Desert Landscape", color: "brown" },
  both: { name: "Both", color: "emerald" },
};
