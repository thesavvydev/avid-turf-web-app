"use client";

import getInitials from "@/utils/get-initials";
import dayjs, { Dayjs } from "dayjs";
import { Avatar, Button, ButtonGroup, Dropdown, Tooltip } from "flowbite-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

//  YYYY-MM-DD HH:MI:SS
const mockEvents = [
  {
    id: 1,
    name: "Closing",
    start_datetime: "2024-10-27 13:00:00",
    end_datetime: "2024-10-27 14:30:00",
    type: "closing",
    profiles: [
      {
        id: "uuid",
        full_name: "Jon Jones",
        avatar: null,
      },
    ],
  },
  {
    id: 2,
    name: "Excavate",
    start_datetime: "2024-10-28 08:00:00",
    end_datetime: "2024-10-28 16:30:00",
    type: "excavate",
    profiles: [
      {
        id: "uuid",
        full_name: "Jon Jones",
        avatar: null,
      },
      {
        id: "uuid",
        full_name: "Donald Biden",
        avatar: null,
      },
      {
        id: "uuid",
        full_name: "Erica Mendez",
        avatar: null,
      },
    ],
  },
  {
    id: 3,
    name: "Install",
    start_datetime: "2024-10-29 10:00:00",
    end_datetime: "2024-10-29 17:00:00",
    type: "install",
    profiles: [
      {
        id: "uuid",
        full_name: "Jon Jones",
        avatar: null,
      },
      {
        id: "uuid",
        full_name: "Jon Jones",
        avatar: null,
      },
      {
        id: "uuid",
        full_name: "Jake Hall",
        avatar: null,
      },
    ],
  },
  {
    id: 6,
    name: "Install",
    start_datetime: "2024-10-30 08:00:00",
    end_datetime: "2024-10-30 16:30:00",
    type: "install",
    profiles: [
      {
        id: "uuid",
        full_name: "Jon Jones",
        avatar: null,
      },
      {
        id: "uuid",
        full_name: "Shawn Dell",
        avatar: null,
      },
      {
        id: "uuid",
        full_name: "Dave Hammer",
        avatar: null,
      },
    ],
  },
];

const EVENT_TYPE_STYLE_PROPERTIES = {
  install: {
    background:
      "bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-800 dark:hover:bg-yellow-700",
    title: "text-yellow-700 dark:text-yellow-400",
    time: "text-yellow-500 group-hover:text-yellow-700 dark:text-yellow-600 dark:group-hover:text-yellow-500",
  },
  excavate: {
    background:
      "bg-red-50 hover:bg-red-100 dark:bg-red-800 dark:hover:bg-red-700",
    title: "text-red-700 dark:text-red-400",
    time: "text-red-500 group-hover:text-red-700 dark:text-red-600 dark:group-hover:text-red-500",
  },
  closing: {
    background:
      "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-800 dark:hover:bg-emerald-700",
    title: "text-emerald-700 dark:text-emerald-400",
    time: "text-emerald-500 group-hover:text-emerald-700 dark:text-emerald-600 dark:group-hover:text-emerald-500",
  },
};

type TEventTypeStyleProperty = keyof typeof EVENT_TYPE_STYLE_PROPERTIES;

const calculateGridRowStartAndSpan = (start: string, end: string) => {
  const rowPadding = 2;
  const startDayjs = dayjs(start);
  const endDayjs = dayjs(end);

  const startMinutesToDecimal =
    startDayjs.get("m") > 0 ? startDayjs.get("m") / 60 : 0;
  const gridRowStart =
    (startDayjs.get("h") + startMinutesToDecimal) * 12 + rowPadding;
  const diffTime = endDayjs.diff(startDayjs, "m") / 60;
  const gridRowSpan = diffTime * 12;

  return { gridRowStart, gridRowSpan };
};

const DAY_OF_WEEK_TO_COLUMN = [
  "sm:col-start-1",
  "sm:col-start-2",
  "sm:col-start-3",
  "sm:col-start-4",
  "sm:col-start-5",
  "sm:col-start-6",
  "sm:col-start-7",
];

export default function JobWeekView() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const startOfWeek = searchParams.get("startOfWeek")
    ? dayjs(searchParams.get("startOfWeek"))
    : dayjs().startOf("week");

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day"),
  );
  const hoursArray = Array.from({ length: 24 }, (_, i) =>
    dayjs().startOf("day").add(i, "h"),
  );

  const isolatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isolatedRef?.current) {
      const diffMinutes = dayjs().diff(dayjs().startOf("day"), "m") / 60;
      const rows = diffMinutes * 10;
      isolatedRef.current.scrollTo(0, rows * 10);
    }
  }, [isolatedRef]);

  const handleUpdateStartOfWeekParam = (date: Dayjs) => () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("startOfWeek", date.startOf("week").toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-[calc(100vh-24rem)] flex-col">
      <div className="mb-4 flex items-center justify-end gap-2">
        <ButtonGroup>
          <Button
            size="sm"
            color="light"
            onClick={handleUpdateStartOfWeekParam(
              dayjs(startOfWeek).subtract(1, "week"),
            )}
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
          <Button
            size="sm"
            color="light"
            onClick={handleUpdateStartOfWeekParam(
              dayjs(startOfWeek).add(1, "week"),
            )}
          >
            <ChevronRightIcon className="size-5" />
          </Button>
        </ButtonGroup>
        <Dropdown label="Week" size="sm" color="light">
          <Dropdown.Item>Week</Dropdown.Item>
          <Dropdown.Item>Month</Dropdown.Item>
        </Dropdown>
        <Button size="sm" color="light">
          Add Event
        </Button>
      </div>
      <div
        className="isolate flex flex-auto flex-col overflow-auto bg-white dark:bg-gray-800"
        ref={isolatedRef}
      >
        <div className="relative flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 dark:bg-gray-800 sm:pr-8">
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {daysOfWeek.map((dayOfWeek) => {
                const isToday = dayjs().isSame(dayOfWeek, "day");
                return (
                  <button
                    type="button"
                    className="flex flex-col items-center pb-3 pt-2"
                    key={dayOfWeek.toString()}
                  >
                    {`${dayOfWeek.format("ddd")} `}
                    <span
                      className={twMerge(
                        isToday
                          ? "rounded-full bg-primary-600 text-white"
                          : "text-gray-900 dark:text-white",
                        "mt-1 flex h-8 w-8 items-center justify-center font-semibold",
                      )}
                    >
                      {dayOfWeek.format("DD")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 dark:divide-gray-700 dark:border-gray-700 dark:text-gray-400 sm:grid">
              <div className="col-end-1 grid w-14 place-items-center font-semibold uppercase">
                {dayjs(startOfWeek).format("MMM")}
              </div>
              {daysOfWeek.map((dayOfWeek) => {
                const isToday = dayjs().isSame(dayOfWeek, "day");
                return (
                  <div
                    className="flex items-center justify-center py-3"
                    key={dayOfWeek.toString()}
                  >
                    {`${dayOfWeek.format("ddd")} `}
                    <span
                      className={twMerge(
                        isToday
                          ? "rounded-full bg-primary-600 font-semibold text-white"
                          : "text-gray-900 dark:text-white",
                        "ml-1.5 flex h-8 w-8 items-center justify-center font-semibold",
                      )}
                    >
                      {dayOfWeek.format("DD")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 dark:divide-gray-700"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div className="row-end-1 h-7"></div>
                {hoursArray.map((hour) => (
                  <Fragment key={hour.toString()}>
                    <div>
                      <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {hour.format("h A")}
                      </div>
                    </div>
                    <div />
                  </Fragment>
                ))}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 dark:divide-gray-700 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {mockEvents.map((event) => {
                  const styles =
                    EVENT_TYPE_STYLE_PROPERTIES[
                      event.type as TEventTypeStyleProperty
                    ] ?? EVENT_TYPE_STYLE_PROPERTIES.closing;
                  const { gridRowStart, gridRowSpan } =
                    calculateGridRowStartAndSpan(
                      event.start_datetime,
                      event.end_datetime,
                    );

                  return (
                    <li
                      className={twMerge(
                        "relative mt-px flex",
                        DAY_OF_WEEK_TO_COLUMN[
                          dayjs(event.start_datetime).day()
                        ],
                      )}
                      key={event.id}
                      style={{
                        gridRow: `${gridRowStart} / span ${gridRowSpan}`,
                      }}
                    >
                      <a
                        href="#"
                        className={twMerge(
                          styles.background,
                          "group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5",
                        )}
                      >
                        <p
                          className={twMerge(
                            styles.title,
                            "order-1 font-semibold",
                          )}
                        >
                          {event.name}
                        </p>
                        <div className="order-2 mt-2 flex flex-wrap items-center gap-1">
                          {event.profiles.map((profile) => (
                            <Tooltip
                              content={profile.full_name}
                              placement="bottom"
                              key={profile.id}
                            >
                              <Avatar
                                placeholderInitials={getInitials(
                                  profile.full_name,
                                )}
                                rounded
                                size="xs"
                              />
                            </Tooltip>
                          ))}
                        </div>
                        <p className={styles.time}>
                          <time
                            dateTime={dayjs(event.start_datetime).format(
                              "YYYY-MM-DDTHH:mm",
                            )}
                          >
                            {dayjs(event.start_datetime).format("hh:mm a")}
                          </time>
                          {" - "}
                          <time
                            dateTime={dayjs(event.end_datetime).format(
                              "YYYY-MM-DDTHH:mm",
                            )}
                          >
                            {dayjs(event.end_datetime).format("hh:mm a")}
                          </time>
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
