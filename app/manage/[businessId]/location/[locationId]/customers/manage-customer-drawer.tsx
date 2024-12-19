"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import {
  initialFormState,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { useUserContext } from "@/contexts/user";

import { Drawer, Label, TextInput } from "flowbite-react";
import { UserPlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { AddLocationCustomer, UpdateLocationCustomer } from "./actions";
import { Tables } from "@/types/supabase";

interface IFormData {
  email: string;
  full_name: string;
  phone: string;
}

const FormFields = ({ data }: { data: IFormData }) => {
  const { user } = useUserContext();
  const { businessId, locationId } = useParams();
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 md:gap-4 lg:gap-6">
      <input type="hidden" name="profile_id" value={user.id} />
      <input type="hidden" name="location_id" value={locationId} />
      <input type="hidden" name="business_id" value={businessId} />
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
          type="full_name"
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
          placeholder="name@example.com"
          required
          type="email"
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
          type="phone"
        />
      </div>
      <SubmitButton pendingText="Creating customer">
        <UserPlusIcon className="mr-2" />
        Add Customer
      </SubmitButton>
    </fieldset>
  );
};

type TNewCustomerDrawer = {
  customer?: Tables<"business_location_customers">;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ManageCustomerDrawer({
  customer,
  isOpen,
  setIsOpen,
}: TNewCustomerDrawer) {
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const [state, action] = useActionState(
    customer
      ? UpdateLocationCustomer<TInitialFormState>
      : AddLocationCustomer<TInitialFormState>,
    {
      ...initialFormState,
      data: {
        email: customer?.email ?? "",
        full_name: customer?.full_name ?? "",
        phone: customer?.phone ?? "",
      },
    },
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      if (state.dismiss) setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <Drawer open={isOpen} onClose={handleClose} position="right">
      <Drawer.Header
        title="Add customer"
        titleIcon={() => <UserPlusIcon className="mr-2" />}
      />
      <Drawer.Items>
        {state.error && (
          <div className="my-4">
            <ErrorAlert message={state.error} />
          </div>
        )}
        <form action={action}>
          {customer && <input name="id" type="hidden" value={customer.id} />}
          <FormFields data={state.data} />
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
