"use client";
import dayjs from "dayjs";
import { PropsWithChildren } from "react";

function TimeSlotCell({ children }: PropsWithChildren) {
  return (
    <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-950">{children}</div>
  );
}

function TimeCell({ children }: PropsWithChildren) {
  return <div className="rounded-md p-2 text-right">{children}</div>;
}

function HeaderCell({ children }: PropsWithChildren) {
  return (
    <div className="whitespace-nowrap p-2 text-center font-bold">
      {children}
    </div>
  );
}

export default function JobWeeklyCalendar() {
  const startOfWeek = dayjs()
    .startOf("week")
    .set("hours", 6)
    .set("minutes", 0)
    .set("seconds", 0);

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
    const day = startOfWeek.add(i, "day");

    return {
      day,
      times: Array.from({ length: 32 }).map((_, i) => {
        const time = day.add(i * 30, "minutes");

        return time;
      }),
    };
  });

  return (
    <div className="grid gap-2 bg-white p-4 lg:grid-cols-[100px_repeat(7,minmax(0,_1fr))]">
      <div className="grid grid-flow-row gap-2">
        <TimeCell>&nbsp;</TimeCell>
        {Array.from({ length: 32 }).map((_, i) => {
          const time = startOfWeek.add(i * 30, "minutes");

          return (
            <TimeCell key={time.toString()}>{time.format("h:mma")}</TimeCell>
          );
        })}
      </div>

      {daysOfWeek.map((dayOfWeek) => {
        return (
          <div
            key={dayOfWeek.day.format("MMMMDDYYYY")}
            className="grid grid-flow-row gap-2"
          >
            <HeaderCell>{dayOfWeek.day.format("ddd MM/DD")}</HeaderCell>
            {dayOfWeek.times.map((time) => {
              return <TimeSlotCell key={time.toString()}>Slot</TimeSlotCell>;
            })}
          </div>
        );
      })}
    </div>
  );
}
