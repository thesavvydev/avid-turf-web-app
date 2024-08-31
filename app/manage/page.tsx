"use client";

import { Card } from "flowbite-react";
import CommissionsCard from "./commissions-card";
import DashboardHeader from "./dashboard-header";
import JobStatusCard from "./job-status-card";

export default function ManagePage() {
  return (
    <>
      <DashboardHeader />
      <div className="container grid grid-cols-1 gap-4 p-4 md:grid-cols-6 md:items-start md:gap-8 md:p-8">
        <div className="md:col-span-3">
          <CommissionsCard />
        </div>
        <Card className="md:col-span-3">3 oldest open job summary</Card>
        <div className="md:col-span-4">
          <JobStatusCard />
        </div>
        <Card className="md:col-span-2">upcoming appointment list</Card>
      </div>
    </>
  );
}
