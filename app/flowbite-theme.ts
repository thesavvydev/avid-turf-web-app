import { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        "border border-primary-600 bg-primary-500 text-white focus:ring-4 focus:ring-primary-600 enabled:hover:bg-primary-400 dark:border-primary-600 dark:bg-primary-600 dark:focus:ring-primary-700 dark:enabled:hover:border-primary-700 dark:enabled:hover:bg-primary-700",
    },
  },
  card: {
    root: {
      base: "shadow-sm shadow-gray-100 dark:shadow-gray-950 dark:border-gray-700 border border-gray-100 rounded-2xl dark:bg-gray-800",
    },
  },
};
