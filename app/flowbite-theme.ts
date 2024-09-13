import { CustomFlowbiteTheme, theme } from "flowbite-react";
import { twMerge } from "tailwind-merge";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        "border border-primary-600 bg-primary-500 text-white focus:ring-4 focus:ring-primary-600 enabled:hover:bg-primary-400 dark:border-primary-600 dark:bg-primary-600 dark:focus:ring-primary-700 dark:enabled:hover:border-primary-700 dark:enabled:hover:bg-primary-700",
    },
  },
  card: {
    root: {
      base: "rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900",
    },
  },
  tabs: {
    tablist: {
      base: twMerge(theme.tabs.tablist.base, "pt-1 pl-1"),
      variant: {
        underline: twMerge(theme.tabs.tablist.variant.underline, "flex-nowrap"),
      },
    },
  },
};
