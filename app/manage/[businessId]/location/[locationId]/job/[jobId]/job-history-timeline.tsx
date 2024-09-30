"use client";

import { Button, Timeline } from "flowbite-react";
import { CalendarIcon } from "lucide-react";

export default function JobHistoryTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>June 2022</Timeline.Time>
          <Timeline.Title>Invoice Sent</Timeline.Title>
          <Timeline.Body>Sent invoice to job customer</Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>April 2022</Timeline.Time>
          <Timeline.Title>Updated Employees</Timeline.Title>
          <Timeline.Body>Changed closer to Tony Sauvageau</Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>March 2022</Timeline.Time>
          <Timeline.Title>Updated Customer</Timeline.Title>
          <Timeline.Body>Changed customer name to Otto Marie</Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>March 2022</Timeline.Time>
          <Timeline.Title>New Appointment</Timeline.Title>
          <Timeline.Body>Scheduled Follow Up appointment</Timeline.Body>
          <Button color="gray" size="sm">
            Details
            <CalendarIcon className="ml-2 size-4" />
          </Button>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>February 2022</Timeline.Time>
          <Timeline.Title>New Appointment</Timeline.Title>
          <Timeline.Body>Scheduled Installation appointment</Timeline.Body>
          <Button color="gray" size="sm">
            Details
            <CalendarIcon className="ml-2 size-4" />
          </Button>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>January 2022</Timeline.Time>
          <Timeline.Title>Job Created</Timeline.Title>
          <Timeline.Body>
            The job was created for Customer Name by Creator Name
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}
