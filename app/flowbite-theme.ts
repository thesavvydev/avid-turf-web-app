import { CustomFlowbiteTheme, theme } from "flowbite-react";
import { twMerge } from "tailwind-merge";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        "border border-primary-600 bg-primary-500 text-white focus:ring-4 focus:ring-primary-600 enabled:hover:bg-primary-400 dark:border-primary-600 dark:bg-primary-600 dark:focus:ring-primary-700 dark:enabled:hover:border-primary-700 dark:enabled:hover:bg-primary-700",
    },
  },
  badge: {
    root: {
      color: {
        emerald:
          "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200 dark:bg-emerald-200 dark:text-emerald-900 dark:group-hover:bg-emerald-300",
        slate:
          "bg-slate-100 text-slate-800 group-hover:bg-slate-200 dark:bg-slate-200 dark:text-slate-900 dark:group-hover:bg-slate-300",
      },
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
