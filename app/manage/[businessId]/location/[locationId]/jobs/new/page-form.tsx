"use client";

import SubmitButton from "@/components/submit-button";

import { useUserContext } from "@/contexts/user";
import { Breadcrumb, Label, Select, TextInput } from "flowbite-react";
import { ChevronLeftIcon, WorkflowIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import ErrorAlert from "@/components/error-alert";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { US_STATES } from "@/constants/us-states";
import { Tables } from "@/types/supabase";
import { AddJob } from "./action";

const FormFields = ({ profiles }: { profiles: TProfile[] }) => {
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
        <input type="hidden" name="business_location_id" value={locationId} />
        <input type="hidden" name="business_id" value={businessId} />

        <div>
          <Label htmlFor="full_name" className="mb-2 block">
            Full Name
          </Label>
          <TextInput
            id="full_name"
            name="full_name"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2 block">
            Phone
          </Label>
          <TextInput id="phone" name="phone" autoComplete="off" required />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address" className="mb-2 block">
            Address
          </Label>
          <TextInput id="address" name="address" autoComplete="off" required />
        </div>
        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3 md:gap-6">
          <div>
            <Label htmlFor="city" className="mb-2 block">
              City
            </Label>
            <TextInput id="city" name="city" autoComplete="off" required />
          </div>
          <div>
            <Label htmlFor="state" className="mb-2 block">
              State
            </Label>
            <Select id="state" name="state" defaultValue="" required>
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
            <TextInput
              id="postal_code"
              name="postal_code"
              autoComplete="off"
              required
            />
          </div>
        </div>
      </fieldset>
      <h2 className="text-xl font-medium text-gray-400">Staff</h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 border-b border-gray-100 pb-2 dark:border-gray-700 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        <div>
          <Label htmlFor="closer_id" className="mb-2 block">
            Closer
          </Label>
          <Select
            name="closer_id"
            id="closer_id"
            defaultValue={user.id}
            required
          >
            <option value="">Select a closer</option>
            {profiles.map((profile) => (
              <option key={profile.profile_id} value={profile.profile_id}>
                {profile.profile?.full_name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="installer_id" className="mb-2 block">
            Installer
          </Label>
          <Select name="installer_id" id="installer_id" defaultValue="">
            <option value="">Select a installer</option>
            {profiles.map((profile) => (
              <option key={profile.profile_id} value={profile.profile_id}>
                {profile.profile?.full_name}
              </option>
            ))}
          </Select>
        </div>
      </fieldset>
    </>
  );
};

type TProfile = Tables<"business_location_profiles"> & {
  profile: Partial<Tables<"profiles">> | null;
};

type TPageForm = {
  profiles: TProfile[];
};

export default function PageForm({ profiles }: TPageForm) {
  const { businessId, locationId } = useParams();
  const [state, action] = useFormState(
    AddJob<TInitialFormState>,
    initialFormState,
  );
  return (
    <div className="mx-auto grid w-full max-w-screen-sm gap-4">
      <PageHeaderWithActions
        title="New Job"
        subtitle="Add a new job"
        renderBreadcrumbs={() => (
          <Breadcrumb aria-label="Back to jobs">
            <Breadcrumb.Item
              href={`/manage/${businessId}/location/${locationId}/jobs`}
              icon={() => <ChevronLeftIcon className="mr-2" />}
            >
              Back to Jobs
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
        <FormFields profiles={profiles} />
        <div>
          <SubmitButton pendingText="Creating Job">
            <WorkflowIcon className="mr-2" />
            Create Job
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
