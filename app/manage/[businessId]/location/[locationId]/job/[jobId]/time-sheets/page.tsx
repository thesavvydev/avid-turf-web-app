"use client";
import {
  formatAsCompactNumber,
  formatMinutesToHoursAndMinutes,
} from "@/utils/formatter";
import dayjs from "dayjs";
import { Card, Table } from "flowbite-react";
import {
  BanknoteIcon,
  CheckCircleIcon,
  PiggyBankIcon,
  XCircleIcon,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

const timesheets = [
  {
    id: 1,
    profile_id: 1,
    profile: {
      id: 1,
      full_name: "Jon Redman",
    },
    start_datetime: "2024-10-30 08:00:00",
    end_datetime: "2024-10-30 16:30:00",
    paid: false,
  },
  {
    id: 2,
    profile_id: 2,
    profile: {
      id: 2,
      full_name: "Aaron Smith",
    },
    start_datetime: "2024-10-30 08:00:00",
    end_datetime: "2024-10-30 15:00:00",
    paid: false,
  },
  {
    id: 3,
    profile_id: 2,
    profile: {
      id: 2,
      full_name: "Aaron Smith",
    },
    start_datetime: "2024-10-29 08:00:00",
    end_datetime: "2024-10-29 16:30:00",
    paid: false,
  },
  {
    id: 4,
    profile_id: 2,
    profile: {
      id: 2,
      full_name: "Aaron Smith",
    },
    start_datetime: "2024-10-28 08:00:00",
    end_datetime: "2024-10-28 12:00:00",
    paid: false,
  },
  {
    id: 6,
    profile_id: 2,
    profile: {
      id: 2,
      full_name: "Aaron Smith",
    },
    start_datetime: "2024-10-27 08:00:00",
    end_datetime: "2024-10-27 16:30:00",
    paid: false,
  },
  {
    id: 5,
    profile_id: 3,
    profile: {
      id: 3,
      full_name: "Matt Kreischer",
    },
    start_datetime: "2024-10-28 08:00:00",
    end_datetime: "2024-10-28 16:30:00",
    paid: false,
  },
];

export default function Page() {
  const employeeTimesheetDictionary = timesheets.reduce<{
    [k: number]: (typeof timesheets)[0][];
  }>((dictionary, timesheet) => {
    dictionary[timesheet.profile_id] = (
      dictionary[timesheet.profile_id] ?? []
    ).concat(timesheet);

    return dictionary;
  }, {});

  return (
    <>
      <div className="flex w-full max-w-full items-center gap-4 divide-x divide-gray-100 overflow-scroll lg:gap-6">
        {[
          {
            name: "Hours Unpaid",
            status: "unpaid",
            value: 36,
            classNames: "fill-red-600/20 stroke-red-600",
            progressClassNames: "text-red-700 dark:text-red-800 ",
            icon: PiggyBankIcon,
            progress: 0.3 * 100,
          },
          {
            name: "Hours Paid",
            status: "paid",
            value: 8,
            classNames: "fill-green-600/20 stroke-green-600",
            progressClassNames: "text-green-700 dark:text-green-800 ",
            icon: BanknoteIcon,
            progress: 0.85 * 100,
          },
        ].map((tile) => (
          <div
            key={tile.name}
            className="flex grow items-center justify-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-4 shadow-lg shadow-gray-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900 lg:gap-6 lg:py-6"
          >
            <div className="relative size-16 flex-shrink-0">
              <svg
                className="size-full -rotate-90"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-current text-gray-200 dark:text-neutral-700"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className={twMerge(
                    "stroke-current text-lime-600 dark:text-lime-500",
                    tile.progressClassNames,
                  )}
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={
                    Number.isNaN(tile.progress) ? 100 : Number(tile.progress)
                  }
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <tile.icon
                  className={twMerge(
                    "size-6 fill-lime-600/20 stroke-lime-600 stroke-2",
                    tile.classNames,
                  )}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h6 className="whitespace-nowrap font-medium">{tile.name}</h6>
              </div>
              <p className="text-4xl text-gray-400">
                {formatAsCompactNumber(Number(tile.value))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {Object.entries(employeeTimesheetDictionary).map(
        ([profileId, employeeTimesheets]) => {
          const totalMinutes = employeeTimesheets.reduce(
            (dictionary, timesheet) => {
              dictionary += dayjs(timesheet.end_datetime).diff(
                dayjs(timesheet.start_datetime),
                "minutes",
              );

              return dictionary;
            },
            0,
          );

          return (
            <Card key={profileId}>
              <div className="overflow-x-auto">
                <h3 className="pb-4 text-lg font-semibold">
                  {employeeTimesheets[0].profile.full_name}
                  <span className="ml-2 font-light text-gray-400">
                    {formatMinutesToHoursAndMinutes(totalMinutes)}
                  </span>
                </h3>
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>Employee</Table.HeadCell>
                    <Table.HeadCell>Start</Table.HeadCell>
                    <Table.HeadCell>End</Table.HeadCell>
                    <Table.HeadCell>Hours</Table.HeadCell>
                    <Table.HeadCell>Paid</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {employeeTimesheets.map((timesheet) => (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={timesheet.id}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {timesheet.profile.full_name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {dayjs(timesheet.start_datetime).format(
                            "MM/DD hh:mm a",
                          )}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {dayjs(timesheet.end_datetime).format(
                            "MM/DD hh:mm a",
                          )}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {formatMinutesToHoursAndMinutes(
                            dayjs(timesheet.end_datetime).diff(
                              dayjs(timesheet.start_datetime),
                              "minutes",
                            ),
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          {timesheet.paid ? (
                            <CheckCircleIcon />
                          ) : (
                            <XCircleIcon />
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href="#"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Edit
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </Card>
          );
        },
      )}
    </>
  );
}
