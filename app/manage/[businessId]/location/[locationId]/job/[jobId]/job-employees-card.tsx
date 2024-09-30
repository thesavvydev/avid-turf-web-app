"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { useLocationContext } from "@/contexts/location";
import getInitials from "@/utils/get-initials";
import { Avatar, Drawer, Label, Select } from "flowbite-react";
import { PencilIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateJobEmployees } from "./actions";
import { IJob } from "@/types/job";

function EditDrawerFormFields({ job }: { job: IJob }) {
  const { pending } = useFormStatus();
  const { location } = useLocationContext();

  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input name="job_id" value={job.id} type="hidden" />
      <div>
        <Label htmlFor="closer_id" className="mb-2 block">
          Closer
        </Label>
        <Select name="closer_id" defaultValue={job.closer_id ?? ""}>
          <option value="" disabled>
            Select a closer
          </option>
          {location.profiles.map((profile) => (
            <option key={profile.profile_id} value={profile.profile_id}>
              {profile.profile.full_name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="installer_id" className="mb-2 block">
          Installer
        </Label>
        <Select name="installer_id" defaultValue={job.installer_id ?? ""}>
          <option value="" disabled>
            Select a installer
          </option>
          {location.profiles.map((profile) => (
            <option key={profile.profile_id} value={profile.profile_id}>
              {profile.profile.full_name}
            </option>
          ))}
        </Select>
      </div>
      <SubmitButton pendingText="Creating Job">
        <UserPlus2Icon className="mr-2" />
        Update Employees
      </SubmitButton>
    </fieldset>
  );
}

function EditDrawer({ job }: { job: IJob }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useFormState(
    UpdateJobEmployees<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <>
      <div
        className="shrink-0 cursor-pointer rounded-full p-2 opacity-0 hover:bg-gray-100 group-hover:opacity-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon className="fill-gray-200" />
      </div>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
        <Drawer.Header
          title="Update employees"
          titleIcon={() => <UserPlus2Icon className="mr-2" />}
        />
        <Drawer.Items>
          {state.error && (
            <div className="my-4">
              <ErrorAlert message={state.error} />
            </div>
          )}
          <form action={action} className="my-4">
            <EditDrawerFormFields job={job} />
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default function JobEmployeesCard({ job }: { job: IJob }) {
  return (
    <div className="group grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <h6 className="text-lg font-semibold tracking-tighter">Employees</h6>
        <EditDrawer job={job} />
      </div>
      <div className="flex flex-col items-start gap-4 lg:gap-6">
        {job.closer ? (
          <Avatar
            rounded
            bordered
            placeholderInitials={getInitials(job.closer.full_name ?? "")}
          >
            {job.closer.full_name}
            <br />
            <Label className="text-green-500">Closer</Label>
          </Avatar>
        ) : (
          <div>No Closer</div>
        )}

        {job.installer ? (
          <Avatar
            rounded
            bordered
            placeholderInitials={getInitials(job.installer.full_name ?? "")}
          >
            {job.installer.full_name}
            <br />
            <Label className="text-amber-500">Installer</Label>
          </Avatar>
        ) : (
          <div>No Installer</div>
        )}
      </div>
    </div>
  );
}
