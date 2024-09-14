"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import {
  initialFormState,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { LEAD_SOURCES } from "@/constants/lead-sources";
import { LEAD_STATUSES } from "@/constants/lead-statuses";
import { Button, Drawer, Label, Select, TextInput } from "flowbite-react";
import { UserPlus2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AddLead } from "./actions";
import { useUserContext } from "@/contexts/user";

const FormFields = () => {
  const { locationId } = useParams();
  const { user } = useUserContext();
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input type="hidden" name="creator_id" value={user.id} />
      <input type="hidden" name="location_id" value={locationId} />
      <div>
        <Label htmlFor="name" className="mb-2 block">
          Full Name
        </Label>
        <TextInput id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="budget" className="mb-2 block">
          Budget
        </Label>
        <TextInput id="budget" name="budget" type="number" />
      </div>
      <div>
        <Label htmlFor="score" className="mb-2 block">
          Score
        </Label>
        <TextInput
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
        <Select name="source" required defaultValue="">
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
        <Select name="status" required defaultValue="">
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

export default function NewLeadDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    AddLead<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router]);

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        New Lead
      </Button>
      {isOpen && (
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <Drawer.Header
            title="New Lead"
            titleIcon={() => <UserPlus2Icon className="mr-2" />}
          />
          <Drawer.Items>
            {state.error && (
              <div className="my-4">
                <ErrorAlert message={state.error} />
              </div>
            )}
            <form action={action} className="my-4">
              <FormFields />
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
