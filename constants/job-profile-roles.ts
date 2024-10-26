export type TJobProfileRoles = keyof typeof JOB_PROFILE_ROLES;

export const JOB_PROFILE_ROLES = {
  setter: { name: "Setter", color: "red", borderColor: "border-red-400" },
  closer: { name: "Closer", color: "blue", borderColor: "border-blue-400" },
  installer: {
    name: "Installer",
    color: "green",
    borderColor: "border-green-400",
  },
  project_manager: {
    name: "Project Manager",
    color: "purple",
    borderColor: "border-purple-400",
  },
  crew_lead: {
    name: "Crew Lead",
    color: "yellow",
    borderColor: "border-yellow-400",
  },
};
