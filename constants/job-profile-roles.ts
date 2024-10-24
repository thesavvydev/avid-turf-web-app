export type TJobProfileRoles = keyof typeof JOB_PROFILE_ROLES;

export const JOB_PROFILE_ROLES = {
  setter: { name: "Setter", color: "red" },
  closer: { name: "Closer", color: "blue" },
  installer: { name: "Installer", color: "green" },
};
