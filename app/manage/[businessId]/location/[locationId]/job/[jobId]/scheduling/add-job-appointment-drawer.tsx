"use client";

import FormDrawer from "@/components/form-drawer";
import SubmitButton from "@/components/submit-button";
import { useLocationContext } from "@/contexts/location";
import dayjs from "dayjs";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { CalendarClockIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { AddJobAppointment } from "./actions";

export default function AddJobAppointmentDrawer() {
  const startDatetimeRef = useRef<HTMLInputElement>(null);
  const endDatetimeRef = useRef<HTMLInputElement>(null);
  const {
    location: { profiles },
  } = useLocationContext();
  const { businessId, locationId, jobId } = useParams();

  return (
    <FormDrawer
      FormAction={AddJobAppointment}
      renderTrigger={(toggle) => (
        <Button color="primary" onClick={toggle} size="sm">
          Add Appointment
        </Button>
      )}
      title="Add Appointment"
      titleIcon={() => <CalendarClockIcon className="mr-2" />}
    >
      <input type="hidden" name="business_id" value={businessId} />
      <input type="hidden" name="location_id" value={locationId} />
      <input type="hidden" name="job_id" value={jobId} />
      <fieldset className="grid gap-2 md:gap-4 lg:gap-6">
        <div className="grid gap-2">
          <Label htmlFor="type">Type</Label>
          <Select defaultValue="" id="type" name="type" required>
            <option value="">Select a type</option>
            <option value="install">Install</option>
            <option value="Demolition">Demolition</option>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="start_datetime">Start Time</Label>
          <TextInput
            id="start_datetime"
            name="start_datetime"
            ref={startDatetimeRef}
            required
            type="datetime-local"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end_datetime">End Time</Label>
          <TextInput
            id="end_datetime"
            name="end_datetime"
            onChange={(e) => {
              e.target.setCustomValidity(
                dayjs(e.target.value).isBefore(
                  startDatetimeRef.current?.value ?? undefined,
                )
                  ? "Must be after start date"
                  : "",
              );
              e.target.setCustomValidity(
                !dayjs(e.target.value).isSame(
                  startDatetimeRef.current?.value ?? undefined,
                  "day",
                )
                  ? "Must be same day as start date"
                  : "",
              );
            }}
            ref={endDatetimeRef}
            required
            type="datetime-local"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profiles">Employees</Label>
          <Select id="profiles" name="profiles" multiple size={4} required>
            {profiles.map((profile) => (
              <option
                key={profile.profile_id}
                className="mb-1 p-2"
                value={profile.profile_id}
              >
                {profile.profile.full_name}
              </option>
            ))}
          </Select>
        </div>
        <SubmitButton pendingText="Adding appointment...">Submit</SubmitButton>
      </fieldset>
    </FormDrawer>
  );
}
