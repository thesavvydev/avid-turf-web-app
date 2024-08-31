"use client";

export default function DashboardHeader() {
  return (
    <header className="bg-gray-100 dark:bg-gray-800">
      <div className="container p-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
          <hgroup>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <span className="text-sm font-light">
              Get a summary of whats going on in the business.
            </span>
          </hgroup>
        </div>
      </div>
    </header>
  );
}
