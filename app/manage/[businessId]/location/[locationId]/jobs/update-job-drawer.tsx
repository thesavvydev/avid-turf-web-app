"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import {
  initialFormState,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { LOCATION_JOB_STATUS } from "@/constants/location-job-status";
import { Tables } from "@/types/supabase";
import { Drawer, Label, Select, TextInput } from "flowbite-react";
import { UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateJob } from "./actions";
import { useLocationContext } from "@/contexts/location";

const FormFields = ({
  defaultValues,
}: {
  defaultValues: Tables<"business_location_jobs">;
}) => {
  const {
    location: { profiles },
  } = useLocationContext();
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input type="hidden" name="id" value={defaultValues.id} />
      <div>
        <Label htmlFor="address" className="mb-2 block">
          Address
        </Label>
        <TextInput
          id="address"
          name="address"
          defaultValue={defaultValues.address ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="city" className="mb-2 block">
          City
        </Label>
        <TextInput
          id="city"
          name="city"
          defaultValue={defaultValues.city ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="state" className="mb-2 block">
          State
        </Label>
        <TextInput
          id="state"
          name="state"
          defaultValue={defaultValues.state ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="postal_code" className="mb-2 block">
          Postal Code
        </Label>
        <TextInput
          id="postal_code"
          name="postal_code"
          defaultValue={defaultValues.postal_code ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="closer_id" className="mb-2 block">
          Closer
        </Label>
        <Select name="closer_id" defaultValue={defaultValues.closer_id ?? ""}>
          <option value="">Select a closer</option>
          {profiles.map(({ profile_id, profile }) => (
            <option key={profile_id} value={profile_id}>
              {profile.full_name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="installer_id" className="mb-2 block">
          Installer
        </Label>
        <Select
          name="installer_id"
          defaultValue={defaultValues.installer_id ?? ""}
        >
          <option value="">Select a closer</option>
          {profiles.map(({ profile_id, profile }) => (
            <option key={profile_id} value={profile_id}>
              {profile.full_name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="status" className="mb-2 block">
          Status
        </Label>
        <Select name="status" required defaultValue={defaultValues.status}>
          <option value="" disabled>
            Select a status
          </option>
          {Object.entries(LOCATION_JOB_STATUS).map(
            ([jobStatusKey, jobStatus]) => (
              <option key={jobStatusKey} value={jobStatusKey}>
                {jobStatus.name}
              </option>
            ),
          )}
        </Select>
      </div>
      <SubmitButton pendingText="Creating Job">
        <UserPlus2Icon className="mr-2" />
        Update Job
      </SubmitButton>
    </fieldset>
  );
};

type TUpdateJobDrawer = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  job: Tables<"business_location_jobs">;
};

export default function UpdateJobDrawer({
  isOpen,
  setIsOpen,
  job,
}: TUpdateJobDrawer) {
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    UpdateJob<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <Drawer open={isOpen} onClose={handleClose} position="right">
      <Drawer.Header
        title="Update job"
        titleIcon={() => <UserPlus2Icon className="mr-2" />}
      />
      <Drawer.Items>
        {state.error && (
          <div className="my-4">
            <ErrorAlert message={state.error} />
          </div>
        )}
        <form action={action} className="my-4">
          <FormFields defaultValues={job} />
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
