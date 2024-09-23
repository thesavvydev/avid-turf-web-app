"use client";

import SubmitButton from "@/components/submit-button";
import { LEAD_SOURCES } from "@/constants/lead-sources";
import { LEAD_STATUSES } from "@/constants/lead-statuses";
import { useUserContext } from "@/contexts/user";
import {
  Breadcrumb,
  Datepicker,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { ChevronLeftIcon, UserPlus2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import ErrorAlert from "@/components/error-alert";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { US_STATES } from "@/constants/us-states";
import { AddLead } from "./action";

const FormFields = () => {
  const { businessId, locationId } = useParams();
  const { user } = useUserContext();
  const { pending } = useFormStatus();

  return (
    <>
      <h2 className="text-xl font-medium text-gray-400">Basic Information</h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 border-b border-gray-100 pb-2 dark:border-gray-700 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        <input type="hidden" name="creator_id" value={user.id} />
        <input type="hidden" name="business_location_id" value={locationId} />
        <input type="hidden" name="business_id" value={businessId} />

        <div>
          <Label htmlFor="name" className="mb-2 block">
            Full Name
          </Label>
          <TextInput id="name" name="name" required autoComplete="off" />
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2 block">
            Phone
          </Label>
          <TextInput id="phone" name="phone" autoComplete="off" />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <TextInput id="email" name="email" type="email" autoComplete="off" />
        </div>
        <div>
          <Label htmlFor="status" className="mb-2 block">
            Status
          </Label>
          <Select id="status" name="status" required defaultValue="">
            <option value="" disabled>
              Select a status
            </option>
            {Object.entries(LEAD_STATUSES).map(
              ([leadStatusKey, leadStatus]) => (
                <option key={leadStatusKey} value={leadStatusKey}>
                  {leadStatus.name}
                </option>
              ),
            )}
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address" className="mb-2 block">
            Address
          </Label>
          <TextInput id="address" name="address" autoComplete="off" />
        </div>
        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3 md:gap-6">
          <div>
            <Label htmlFor="city" className="mb-2 block">
              City
            </Label>
            <TextInput id="city" name="city" autoComplete="off" />
          </div>
          <div>
            <Label htmlFor="state" className="mb-2 block">
              State
            </Label>
            <Select id="state" name="state" defaultValue="">
              <option value="" disabled>
                Select a state
              </option>
              {Object.entries(US_STATES).map(([abbr, name]) => (
                <option key={abbr} value={abbr}>
                  {name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="postal_code" className="mb-2 block">
              Postal Code
            </Label>
            <TextInput id="postal_code" name="postal_code" autoComplete="off" />
          </div>
        </div>
      </fieldset>
      <h2 className="text-xl font-medium text-gray-400">Project Information</h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 border-b border-gray-100 pb-2 dark:border-gray-700 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        <div>
          <Label htmlFor="budget" className="mb-2 block">
            Estimated Budget
          </Label>
          <TextInput
            id="budget"
            name="budget"
            type="number"
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="type" className="mb-2 block">
            Type
          </Label>
          <Select id="type" name="type" defaultValue="">
            <option value="" disabled>
              Select a type
            </option>
          </Select>
        </div>
        <div>
          <Label htmlFor="completion_date" className="mb-2 block">
            Estimated Completion Date
          </Label>
          <Datepicker id="completion_date" name="completion_date" />
        </div>
      </fieldset>
      <h2 className="text-xl font-medium text-gray-400">
        Additional Information
      </h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 border-b border-gray-100 pb-2 dark:border-gray-700 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
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
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="source" className="mb-2 block">
            Source
          </Label>
          <Select id="source" name="source" required defaultValue="">
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
          <Label htmlFor="follow_up_date" className="mb-2 block">
            Follow up date
          </Label>
          <Datepicker id="follow_up_date" name="follow_up_date" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes" className="mb-2 block">
            Notes
          </Label>
          <Textarea id="notes" name="notes" autoComplete="off" />
        </div>
      </fieldset>
    </>
  );
};

export default function Page() {
  const { businessId, locationId } = useParams();
  const [state, action] = useFormState(
    AddLead<TInitialFormState>,
    initialFormState,
  );
  return (
    <div className="mx-auto grid w-full max-w-screen-sm gap-4">
      <PageHeaderWithActions
        title="New Lead"
        subtitle="Add a new lead"
        renderBreadcrumbs={() => (
          <Breadcrumb aria-label="Back to leads">
            <Breadcrumb.Item
              href={`/manage/${businessId}/location/${locationId}/leads`}
              icon={() => <ChevronLeftIcon className="mr-2" />}
            >
              Back to Leads
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
      />
      {state.error && (
        <div className="col-span-2">
          <ErrorAlert message={state.error} />
        </div>
      )}
      <form action={action} className="grid gap-4 sm:gap-6">
        <FormFields />
        <div>
          <SubmitButton pendingText="Creating Lead">
            <UserPlus2Icon className="mr-2" />
            Create Lead
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
