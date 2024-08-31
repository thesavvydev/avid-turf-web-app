"use client";

import { Card } from "flowbite-react";
import CommissionsCard from "./commissions-card";
import DashboardHeader from "./dashboard-header";
import JobStatusCard from "./job-status-card";
import JobActivityCard from "./job-activity-card";

export default function ManagePage() {
  return (
    <>
      <DashboardHeader />
      <div className="container grid grid-cols-1 gap-4 p-4 md:grid-cols-6 md:items-start md:gap-8 md:p-8">
        <div className="md:col-span-3">
          <CommissionsCard />
        </div>
        <div className="md:col-span-3">
          <JobActivityCard />
        </div>
        <Card className="md:col-span-6 lg:col-span-2">
          <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        </Card>
        <div className="md:col-span-6 lg:col-span-4">
          <JobStatusCard />
        </div>
      </div>
    </>
  );
}
