"use client";

import ErrorAlert from "@/components/error-alert";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import SubmitButton from "@/components/submit-button";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { Breadcrumb, Card, Label, TextInput } from "flowbite-react";
import { BoxIcon, ChevronLeftIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AddProduct } from "./actions";

function FormFields() {
  const { businessId } = useParams();
  const { pending } = useFormStatus();
  return (
    <>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Product Information
        </h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        >
          <input type="hidden" name="business_id" value={businessId} />
          <div>
            <Label htmlFor="name" className="mb-2 block">
              Name
            </Label>
            <TextInput
              autoComplete="off"
              id="name"
              name="name"
              placeholder="Premium Turf"
              required
            />
          </div>
          <div>
            <Label htmlFor="measurement" className="mb-2 block">
              Measurement
            </Label>
            <TextInput
              autoComplete="off"
              id="measurement"
              name="measurement"
              placeholder="sq ft"
              required
            />
          </div>
          <div>
            <Label htmlFor="price_per_measurement" className="mb-2 block">
              Price Per Measurement
            </Label>
            <TextInput
              autoComplete="off"
              id="price_per_measurement"
              name="price_per_measurement"
              placeholder="10.00"
              required
            />
          </div>
        </fieldset>
      </Card>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">
          Inventory Information
        </h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        >
          <div>
            <Label htmlFor="units_in_stock" className="mb-2 block">
              In Stock Units
            </Label>
            <TextInput
              autoComplete="off"
              id="units_in_stock"
              name="units_in_stock"
              placeholder="10000"
            />
          </div>
        </fieldset>
      </Card>
      <Card>
        <h2 className="text-xl font-medium text-gray-400">Photos</h2>
        <fieldset
          disabled={pending}
          className="grid gap-2 pb-2 sm:grid-cols-2 md:gap-6 md:pb-6"
        ></fieldset>
      </Card>
    </>
  );
}

export default function Page() {
  const { businessId } = useParams();
  const [state, action] = useActionState(
    AddProduct<TInitialFormState>,
    initialFormState,
  );
  return (
    <div className="mx-auto grid w-full max-w-screen-md gap-4">
      <PageHeaderWithActions
        title="New Product"
        renderBreadcrumbs={() => (
          <Breadcrumb aria-label="Back to products">
            <Breadcrumb.Item
              href={`/manage/${businessId}/products`}
              icon={() => <ChevronLeftIcon className="mr-2" />}
            >
              Back to products
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
      />
      {state.error && <ErrorAlert message={state.error} />}
      <form action={action} className="grid gap-4 sm:gap-6">
        <FormFields />
        <div>
          <SubmitButton pendingText="Creating product">
            <BoxIcon className="mr-2" />
            Create Product
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
