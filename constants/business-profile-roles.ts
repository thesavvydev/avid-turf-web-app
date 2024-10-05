export type TBusinessProfileRoles = keyof typeof BUSINESS_PROFILE_ROLES;

export const BUSINESS_PROFILE_ROLES = {
  admin: { name: "Admin", color: "red" },
  manager: { name: "Manager", color: "cyan" },
  base: { name: "Base", color: "green" },
};
