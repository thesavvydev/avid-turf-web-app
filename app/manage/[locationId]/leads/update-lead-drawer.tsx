"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import {
  initialFormState,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { LEAD_SOURCES } from "@/constants/lead-sources";
import { LEAD_STATUSES } from "@/constants/lead-statuses";
import { Tables } from "@/types/supabase";
import { Drawer, Label, Select, TextInput } from "flowbite-react";
import { UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateLead } from "./actions";

const FormFields = ({
  defaultValues,
}: {
  defaultValues: Tables<"location_leads">;
}) => {
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input type="hidden" name="id" value={defaultValues.id} />
      <div>
        <Label htmlFor="name" className="mb-2 block">
          Full Name
        </Label>
        <TextInput
          id="name"
          name="name"
          required
          defaultValue={defaultValues.name}
        />
      </div>
      <div>
        <Label htmlFor="budget" className="mb-2 block">
          Budget
        </Label>
        <TextInput
          id="budget"
          name="budget"
          type="number"
          defaultValue={defaultValues.budget?.toString()}
        />
      </div>
      <div>
        <Label htmlFor="score" className="mb-2 block">
          Score
        </Label>
        <TextInput
          defaultValue={defaultValues.score.toString()}
          id="score"
          name="score"
          required
          type="number"
          min={1}
          max={10}
        />
      </div>
      <div>
        <Label htmlFor="source" className="mb-2 block">
          Source
        </Label>
        <Select name="source" required defaultValue={defaultValues.source}>
          <option value="" disabled>
            Select a source
          </option>
          {Object.entries(LEAD_SOURCES).map(([leadSourceKey, leadSource]) => (
            <option key={leadSourceKey} value={leadSourceKey}>
              {leadSource.name}
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
          {Object.entries(LEAD_STATUSES).map(([leadStatusKey, leadStatus]) => (
            <option key={leadStatusKey} value={leadStatusKey}>
              {leadStatus.name}
            </option>
          ))}
        </Select>
      </div>
      <SubmitButton pendingText="Creating Lead">
        <UserPlus2Icon className="mr-2" />
        Create Lead
      </SubmitButton>
    </fieldset>
  );
};

type TUpdateLeadDrawer = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  locationLead: Tables<"location_leads">;
};

export default function UpdateLeadDrawer({
  isOpen,
  setIsOpen,
  locationLead,
}: TUpdateLeadDrawer) {
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    UpdateLead<TInitialFormState>,
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
        title="Update Lead"
        titleIcon={() => <UserPlus2Icon className="mr-2" />}
      />
      <Drawer.Items>
        {state.error && (
          <div className="my-4">
            <ErrorAlert message={state.error} />
          </div>
        )}
        <form action={action} className="my-4">
          <FormFields defaultValues={locationLead} />
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
