"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import {
  initialFormState,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { useUserContext } from "@/contexts/user";
import { Tables } from "@/types/supabase";
import { Drawer, Label, TextInput } from "flowbite-react";
import { UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { UpdateProduct } from "./actions";

const FormFields = ({
  defaultValues,
}: {
  defaultValues: Tables<"business_products">;
}) => {
  const { pending } = useFormStatus();
  const { user } = useUserContext();
  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input type="hidden" name="id" value={defaultValues.id} />
      <input type="hidden" name="profile_id" value={user.id} />
      <input
        type="hidden"
        name="business_id"
        value={defaultValues.business_id}
      />
      <div>
        <Label htmlFor="name" className="mb-2 block">
          Name
        </Label>
        <TextInput
          defaultValue={defaultValues.name ?? ""}
          id="name"
          name="name"
        />
      </div>
      <div>
        <Label htmlFor="measurement" className="mb-2 block">
          Measurement
        </Label>
        <TextInput
          defaultValue={defaultValues.measurement ?? ""}
          id="measurement"
          name="measurement"
        />
      </div>
      <div>
        <Label htmlFor="price_per_measurement" className="mb-2 block">
          Price Per Measurement
        </Label>
        <TextInput
          id="price_per_measurement"
          name="price_per_measurement"
          defaultValue={defaultValues.price_per_measurement ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="lead_price" className="mb-2 block">
          Lead Price
        </Label>
        <TextInput
          id="lead_price"
          name="lead_price"
          defaultValue={defaultValues.lead_price ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="units_in_stock" className="mb-2 block">
          In Stock Units
        </Label>
        <TextInput
          id="units_in_stock"
          name="units_in_stock"
          defaultValue={defaultValues.units_in_stock ?? ""}
        />
      </div>

      <SubmitButton pendingText="Updating product">
        <UserPlus2Icon className="mr-2" />
        Update Product
      </SubmitButton>
    </fieldset>
  );
};

type TUpdateProductDrawer = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  product: Tables<"business_products">;
};

export default function UpdateProductDrawer({
  isOpen,
  setIsOpen,
  product,
}: TUpdateProductDrawer) {
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const [state, action] = useActionState(
    UpdateProduct<TInitialFormState>,
    initialFormState,
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
        title="Update product"
        titleIcon={() => <UserPlus2Icon className="mr-2" />}
      />
      <Drawer.Items>
        {state.error && (
          <div className="my-4">
            <ErrorAlert message={state.error} />
          </div>
        )}
        <form action={action} className="my-4">
          <FormFields defaultValues={product} />
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
