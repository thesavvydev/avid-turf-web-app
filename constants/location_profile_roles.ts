export type TLocationProfileRoles = keyof typeof LOCATION_PROFILE_ROLES;

export const LOCATION_PROFILE_ROLES = {
  admin: { name: "Admin", color: "red" },
  manager: { name: "Manager", color: "cyan" },
  base: { name: "Base", color: "green" },
};
