export type TLocationEmployeeRoles = keyof typeof LOCATION_EMPLOYEE_ROLES;

export const LOCATION_EMPLOYEE_ROLES = {
  admin: { name: "Admin", color: "red" },
  manager: { name: "Manager", color: "cyan" },
  employee: { name: "Employee", color: "green" },
};
