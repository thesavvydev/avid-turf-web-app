"use client";

import { Card } from "flowbite-react";
import CommissionsCard from "./commissions-card";
import JobStatusCard from "./job-status-card";
import PageHeaderWithActions from "@/components/page-header-with-actions";

export default function ManagePage() {
  return (
    <>
      <PageHeaderWithActions
        title="Dashboard"
        subtitle="Get a summary of whats going on in the business."
      />
      <div className="container grid grid-cols-1 gap-4 p-4 md:grid-cols-6 md:items-start md:gap-8 md:p-8">
        <div className="md:col-span-3">
          <CommissionsCard />
        </div>
        <div className="md:col-span-3">
          <JobStatusCard />
        </div>
        <Card className="md:col-span-2">stat</Card>
        <Card className="md:col-span-2">stat</Card>
        <Card className="md:col-span-2">stat</Card>
        <Card className="md:col-span-4">stat</Card>
        <Card className="md:col-span-2">stat</Card>
      </div>
    </>
  );
}
