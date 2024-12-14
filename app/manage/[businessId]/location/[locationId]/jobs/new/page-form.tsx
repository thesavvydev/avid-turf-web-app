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
import { US_STATES } from "@/constants/us-states";
import { useLocationContext } from "@/contexts/location";
import { ILocationEmployee } from "@/types/location";
import { Database, Tables } from "@/types/supabase";
import { useActionState, useEffect, useState } from "react";
import { AddJob } from "./action";

interface IEmployee {
  profile_id: string;
  role: string;
}

interface IFormFields {
  address: string;
  city: string;
  commission: string;
  down_payment_collected: number;
  email: string;
  employees: IEmployee[];
  estimated_end_date: string;
  estimated_start_date: string;
  full_name: string;
  has_water_rebate: "no" | "yes";
  hoa_approval_required: "no" | "yes";
  hoa_contact_email: string;
  hoa_contact_name: string;
  hoa_contact_phone: string;
  payment_type: Database["public"]["Enums"]["job_payment_types"];
  phone: string;
  products: Omit<
    Tables<"business_location_job_products">,
    "created_at" | "id" | "job_id"
  >[];
  postal_code: string;
  state: string;
  water_rebate_company: string;
}

type TPageForm = {
  profiles: ILocationEmployee[];
  products: Tables<"business_products">[];
};

const EmployeesCard = ({
  data,
  profiles,
}: {
  data: Pick<IFormFields, "employees">;
  profiles: ILocationEmployee[];
}) => {
  const [employees, setEmployees] = useState(() => data.employees);
  const { pending } = useFormStatus();

  return (
    <Card>
      <h2 className="text-xl font-medium text-gray-400">Employees</h2>
      <fieldset
        disabled={pending}
        className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
      >
        {employees.map((employee, number) => (
          <div
            key={number.toString()}
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
                defaultValue={employee.profile_id}
                id={`employees__${number}__profile_id`}
                key={employee.profile_id}
                name={`employees__${number}__profile_id`}
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
                defaultValue={employee.role}
                id={`employees__${number}__role`}
                key={employee.role}
                name={`employees__${number}__role`}
                required
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
          onClick={() =>
            setEmployees((prevState) => [
              ...prevState,
              { profile_id: "", role: "" },
            ])
          }
        >
          Add employee
        </Button>
      </div>
    </Card>
  );
};

const HOAInformationFields = ({
  data,
}: {
  data: Pick<
    IFormFields,
    | "hoa_approval_required"
    | "hoa_contact_email"
    | "hoa_contact_name"
    | "hoa_contact_phone"
  >;
}) => {
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
              defaultChecked={data.hoa_approval_required === "yes"}
              id="yes"
              name="hoa_approval_required"
              onChange={(e) => setIsApprovalRequired(e.target.checked)}
              value="yes"
            />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              defaultChecked={data.hoa_approval_required === "no"}
              id="no"
              name="hoa_approval_required"
              onChange={(e) => setIsApprovalRequired(!e.target.checked)}
              value="no"
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
                autoComplete="off"
                defaultValue={data.hoa_contact_name}
                id="hoa_contact_name"
                name="hoa_contact_name"
              />
            </div>
            <div>
              <Label htmlFor="hoa_contact_email" className="mb-2 block">
                Contact Email
              </Label>
              <TextInput
                autoComplete="off"
                defaultValue={data.hoa_contact_email}
                id="hoa_contact_email"
                name="hoa_contact_email"
                type="email"
              />
            </div>
            <div>
              <Label htmlFor="hoa_contact_phone" className="mb-2 block">
                Contact Phone
              </Label>
              <TextInput
                autoComplete="off"
                defaultValue={data.hoa_contact_phone}
                id="hoa_contact_phone"
                name="hoa_contact_phone"
                type="phone"
              />
            </div>
          </>
        )}
      </fieldset>
    </Card>
  );
};

const WaterRebateInformationFields = ({
  data,
}: {
  data: Pick<IFormFields, "water_rebate_company" | "has_water_rebate">;
}) => {
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
              defaultChecked={data.has_water_rebate === "yes"}
              id="yes"
              name="has_water_rebate"
              onChange={(e) => setIsRebateProvided(e.target.checked)}
              value="yes"
            />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              defaultChecked={data.has_water_rebate === "no"}
              id="no"
              name="has_water_rebate"
              onChange={(e) => setIsRebateProvided(!e.target.checked)}
              value="no"
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
                defaultValue={data.water_rebate_company}
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

const FormFields = ({
  data,
  profiles,
  products,
}: TPageForm & { data: IFormFields }) => {
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
              autoComplete="off"
              defaultValue={data.full_name}
              id="full_name"
              name="full_name"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="mb-2 block">
              Phone
            </Label>
            <TextInput
              autoComplete="off"
              defaultValue={data.phone}
              id="phone"
              name="phone"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <TextInput
              autoComplete="off"
              defaultValue={data.email}
              id="email"
              name="email"
              required
              type="email"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address" className="mb-2 block">
              Address
            </Label>
            <TextInput
              autoComplete="off"
              id="address"
              name="address"
              required
              defaultValue={data.address}
            />
          </div>
          <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3 md:gap-6">
            <div>
              <Label htmlFor="city" className="mb-2 block">
                City
              </Label>
              <TextInput
                autoComplete="off"
                defaultValue={data.city}
                id="city"
                name="city"
                required
              />
            </div>
            <div>
              <Label htmlFor="state" className="mb-2 block">
                State
              </Label>
              <Select
                defaultValue={data.state}
                key={data.state}
                id="state"
                name="state"
                required
              >
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
                autoComplete="off"
                id="postal_code"
                name="postal_code"
                required
                defaultValue={data.postal_code}
              />
            </div>
          </div>
        </fieldset>
      </Card>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Product Information
        </h2>
        <fieldset disabled={pending} className="grid gap-2 md:mt-2 md:gap-6">
          <JobProductsFormFields
            key={data.products?.toString()}
            defaultCommission={Number(data.commission)}
            defaultJobProducts={data.products}
            products={products}
          />
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
              autoComplete="off"
              defaultValue={data.down_payment_collected}
              id="down_payment_collected"
              name="down_payment_collected"
              type="number"
            />
          </div>
          <div>
            <Label htmlFor="payment_type" className="mb-2 block">
              Payment Type
            </Label>
            <Select
              defaultValue={data.payment_type}
              id="payment_type"
              key={data.payment_type}
              name="payment_type"
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
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Estimated Timeline
        </h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        >
          <div>
            <Label htmlFor="estimated_start_date" className="mb-2 block">
              Start date
            </Label>
            <TextInput
              type="date"
              defaultValue={data.estimated_start_date}
              id="estimated_start_date"
              name="estimated_start_date"
            />
          </div>
          <div>
            <Label htmlFor="estimated_end_date" className="mb-2 block">
              End date
            </Label>
            <TextInput
              type="date"
              id="estimated_end_date"
              name="estimated_end_date"
              defaultValue={data.estimated_end_date}
            />
          </div>
        </fieldset>
      </Card>
      <HOAInformationFields data={data} />
      <WaterRebateInformationFields data={data} />
      <EmployeesCard
        key={data.employees?.toString()}
        data={data}
        profiles={profiles}
      />
    </>
  );
};

export default function PageForm({ profiles, products }: TPageForm) {
  const { businessId, locationId } = useParams();
  const { location } = useLocationContext();
  const [state, action] = useActionState(AddJob<TInitialFormState>, {
    ...initialFormState,
    data: {
      address: "",
      city: "",
      commission: "",
      down_payment_collected: 500,
      email: "",
      employees: [],
      estimated_end_date: null,
      estimated_start_date: null,
      full_name: "",
      has_water_rebate: "no",
      hoa_approval_required: "no",
      hoa_contact_email: "",
      hoa_contact_name: "",
      hoa_contact_phone: "",
      payment_type: "",
      phone: "",
      postal_code: "",
      products: [],
      state: location.state ?? "",
      water_rebate_company: "",
    },
  });

  useEffect(() => {
    if (state.error) window.scrollTo(0, 0);
  }, [state.error]);

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
        <FormFields data={state.data} profiles={profiles} products={products} />
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
