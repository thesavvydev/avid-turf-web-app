"use client";

import { formatMinutesToHoursAndMinutes } from "@/utils/formatter";
import dayjs from "dayjs";
import { Table } from "flowbite-react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { ITimesheet } from "./page";

export default function Timesheet({ rows }: { rows: ITimesheet[] }) {
  return (
    <>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Employee</Table.HeadCell>
          <Table.HeadCell>Start</Table.HeadCell>
          <Table.HeadCell>End</Table.HeadCell>
          <Table.HeadCell>Hours</Table.HeadCell>
          <Table.HeadCell>Paid</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {rows.map((timesheet) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={timesheet.id}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {timesheet.profile.full_name}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {dayjs(timesheet.start_datetime).format("MM/DD hh:mm a")}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {timesheet.end_datetime
                  ? dayjs(timesheet.end_datetime).format("MM/DD hh:mm a")
                  : "Clocked in"}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {formatMinutesToHoursAndMinutes(
                  dayjs(timesheet.end_datetime ?? "").diff(
                    dayjs(timesheet.start_datetime),
                    "minutes",
                  ),
                )}
              </Table.Cell>
              <Table.Cell>
                {timesheet.paid ? (
                  <CheckCircleIcon className="text-green-400" />
                ) : (
                  <XCircleIcon className="text-red-400" />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
