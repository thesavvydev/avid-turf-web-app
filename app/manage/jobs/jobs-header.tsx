"use client";

import { Button } from "flowbite-react";

export default function JobsHeader() {
  return (
    <header className="bg-gray-600 dark:bg-gray-800 border-t-4 border-t-gray-700 dark:border-t-gray-900">
      <div className="container p-8">
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <hgroup>
            <h1 className="text-3xl font-semibold text-zinc-200">Jobs</h1>
            <span className="text-sm text-zinc-400 font-light">
              View and manage all of your jobs.
            </span>
          </hgroup>
          <Button color="primary">New Job</Button>
        </div>
      </div>
    </header>
  );
}
