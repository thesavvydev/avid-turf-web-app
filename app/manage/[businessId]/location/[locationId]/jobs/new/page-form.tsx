"use client";

import SubmitButton from "@/components/submit-button";

import { useUserContext } from "@/contexts/user";
import {
  Breadcrumb,
  Button,
  Card,
  Label,
  Radio,
  Select,
  TextInput,
} from "flowbite-react";
import { ChevronLeftIcon, Trash2Icon, WorkflowIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";

import { ConfirmModal } from "@/components/confirm-modal";
import ErrorAlert from "@/components/error-alert";
import JobProductsFormFields from "@/components/job-products-form-fields";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { JOB_PAYMENT_TYPES } from "@/constants/job-payment-types";
import { JOB_PROFILE_ROLES } from "@/constants/job-profile-roles";
import { JOB_TYPES } from "@/constants/job-types";
import { US_STATES } from "@/constants/us-states";
import { Tables } from "@/types/supabase";
import { useActionState, useState } from "react";
import { AddJob } from "./action";

const EmployeesCard = ({ profiles }: { profiles: TProfile[] }) => {
  const [employees, setEmployees] = useState([""]);
  const { user } = useUserContext();
  const { pending } = useFormStatus();

  return (
    <Card>
      <h2 className="text-xl font-medium text-gray-400">Employees</h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        {employees.map((_, number) => (
          <div
            key={number}
            className="group relative grid gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="absolute right-4 top-4 hidden group-hover:block">
              <ConfirmModal
                trigger={(toggle) => (
                  <Trash2Icon
                    className="size-4 cursor-pointer text-red-400 hover:size-5"
                    onClick={toggle}
                  />
                )}
                description="Are you sure you want to remove this employee?"
                onConfirmClick={() =>
                  setEmployees((prevState) =>
                    prevState.filter((_, index) => index !== number),
                  )
                }
              />
            </div>
            <div>
              <Label
                htmlFor={`employees__${number}__profile_id`}
                className="mb-2 block"
              >
                Employee
              </Label>
              <Select
                name={`employees__${number}__profile_id`}
                id={`employees__${number}__profile_id`}
                defaultValue={user.id}
                required
              >
                <option value="">Select an employee</option>
                {profiles.map((profile) => (
                  <option key={profile.profile_id} value={profile.profile_id}>
                    {profile.profile?.full_name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label
                htmlFor={`employees__${number}__role`}
                className="mb-2 block"
              >
                Role
              </Label>
              <Select
                id={`employees__${number}__role`}
                name={`employees__${number}__role`}
                required
                defaultValue="closer"
              >
                <option value="">Select a role</option>
                {Object.entries(JOB_PROFILE_ROLES).map(([roleKey, role]) => (
                  <option key={roleKey} value={roleKey}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        ))}
      </fieldset>
      <div>
        <Button
          color="light"
          onClick={() => setEmployees((prevState) => [...prevState, ""])}
        >
          Add employee
        </Button>
      </div>
    </Card>
  );
};

const HOAInformationFields = () => {
  const [isApprovalRequired, setIsApprovalRequired] = useState(false);
  const { pending } = useFormStatus();

  return (
    <Card>
      <h2 className="text-xl font-medium text-gray-400">HOA Information</h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        <fieldset className="flex max-w-md flex-col gap-4 sm:col-span-2">
          <legend className="mb-4">Approval Needed</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="yes"
              name="hoa_approval_required"
              value="yes"
              onChange={(e) => setIsApprovalRequired(e.target.checked)}
            />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="no"
              name="hoa_approval_required"
              value="no"
              defaultChecked
              onChange={(e) => setIsApprovalRequired(!e.target.checked)}
            />
            <Label htmlFor="no">No</Label>
          </div>
        </fieldset>
        {isApprovalRequired && (
          <>
            <div>
              <Label htmlFor="hoa_contact_name" className="mb-2 block">
                Contact Name
              </Label>
              <TextInput
                id="hoa_contact_name"
                name="hoa_contact_name"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="hoa_contact_email" className="mb-2 block">
                Contact Email
              </Label>
              <TextInput
                type="email"
                id="hoa_contact_email"
                name="hoa_contact_email"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor="hoa_contact_phone" className="mb-2 block">
                Contact Phone
              </Label>
              <TextInput
                type="phone"
                id="hoa_contact_phone"
                name="hoa_contact_phone"
                autoComplete="off"
              />
            </div>
          </>
        )}
      </fieldset>
    </Card>
  );
};

const WaterRebateInformationFields = () => {
  const [isRebateProvided, setIsRebateProvided] = useState(false);
  const { pending } = useFormStatus();

  return (
    <Card>
      <h2 className="text-xl font-medium text-gray-400">
        Water Rebate Information
      </h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        <fieldset className="flex max-w-md flex-col gap-4 sm:col-span-2">
          <legend className="mb-4">Has Water Rebate</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="yes"
              name="has_water_rebate"
              value="yes"
              onChange={(e) => setIsRebateProvided(e.target.checked)}
            />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="no"
              name="has_water_rebate"
              value="no"
              defaultChecked
              onChange={(e) => setIsRebateProvided(!e.target.checked)}
            />
            <Label htmlFor="no">No</Label>
          </div>
        </fieldset>
        {isRebateProvided && (
          <>
            <div>
              <Label htmlFor="water_rebate_company" className="mb-2 block">
                Water Rebate Company
              </Label>
              <TextInput
                id="water_rebate_company"
                name="water_rebate_company"
                autoComplete="off"
              />
            </div>
          </>
        )}
      </fieldset>
    </Card>
  );
};

const FormFields = ({ profiles, products }: TPageForm) => {
  const { businessId, locationId } = useParams();
  const { user } = useUserContext();
  const { pending } = useFormStatus();

  return (
    <>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Customer Information
        </h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        >
          <input type="hidden" name="business_location_id" value={locationId} />
          <input type="hidden" name="business_id" value={businessId} />
          <input type="hidden" name="creator_id" value={user.id} />
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
            <TextInput
              id="address"
              name="address"
              autoComplete="off"
              required
            />
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
      </Card>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Product Information
        </h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        >
          <div className="sm:col-span-2">
            <Label htmlFor="type" className="mb-2 block">
              Type
            </Label>
            <Select id="type" name="type" defaultValue="" required>
              <option value="" disabled>
                Select a type
              </option>
              {Object.entries(JOB_TYPES).map(([jobTypeKey, jobType]) => (
                <option key={jobTypeKey} value={jobTypeKey}>
                  {jobType.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <JobProductsFormFields products={products} />
          </div>
        </fieldset>
      </Card>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Payment Information
        </h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        >
          <div>
            <Label htmlFor="down_payment_collected" className="mb-2 block">
              Down Payment Collected
            </Label>
            <TextInput
              type="number"
              id="down_payment_collected"
              name="down_payment_collected"
              autoComplete="off"
              defaultValue={500}
            />
          </div>
          <div>
            <Label htmlFor="payment_type" className="mb-2 block">
              Payment Type
            </Label>
            <Select
              id="payment_type"
              name="payment_type"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              {Object.entries(JOB_PAYMENT_TYPES).map(
                ([jobPaymentTypeKey, jobPaymentType]) => (
                  <option key={jobPaymentTypeKey} value={jobPaymentTypeKey}>
                    {jobPaymentType.name}
                  </option>
                ),
              )}
            </Select>
          </div>
        </fieldset>
      </Card>
      <HOAInformationFields />
      <WaterRebateInformationFields />
      <EmployeesCard profiles={profiles} />
    </>
  );
};

type TProfile = Tables<"business_location_profiles"> & {
  profile: Partial<Tables<"profiles">> | null;
};

type TPageForm = {
  profiles: TProfile[];
  products: Tables<"business_products">[];
};

export default function PageForm({ profiles, products }: TPageForm) {
  const { businessId, locationId } = useParams();
  const [state, action] = useActionState(
    AddJob<TInitialFormState>,
    initialFormState,
  );

  return (
    <div className="mx-auto grid w-full max-w-screen-md gap-4">
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
      {state.error && <ErrorAlert message={state.error} />}
      <form action={action} className="grid gap-4 sm:gap-6">
        <FormFields profiles={profiles} products={products} />
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
