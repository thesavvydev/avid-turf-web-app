"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import {
  initialFormState,
  TInitialFormState,
} from "@/constants/initial-form-state";
import { LOCATION_PROFILE_ROLES } from "@/constants/location_profile_roles";
import { TLocationEmployee } from "@/types/location";
import { Avatar, Drawer, Label, Select } from "flowbite-react";
import { UserCogIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateEmployee } from "./actions";

const FormFields = ({
  defaultValues,
}: {
  defaultValues: TLocationEmployee;
}) => {
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 md:gap-4 lg:gap-6">
      <input
        type="hidden"
        name="location_id"
        value={defaultValues.location_id}
      />
      <input type="hidden" name="profile_id" value={defaultValues.profile_id} />
      <div className="flex items-center gap-2 rounded border border-gray-100 bg-gray-50 p-4">
        <Avatar>{defaultValues.profile?.full_name}</Avatar>
      </div>
      <div>
        <Label htmlFor="role" className="mb-2 block">
          Role
        </Label>
        <Select name="role" required defaultValue={defaultValues.role}>
          <option value="" disabled>
            Select a role
          </option>
          {Object.entries(LOCATION_PROFILE_ROLES).map(([roleKey, role]) => (
            <option key={roleKey} value={roleKey}>
              {role.name}
            </option>
          ))}
        </Select>
      </div>
      <SubmitButton pendingText="Creating User">
        <UserCogIcon className="mr-2" />
        Update User
      </SubmitButton>
    </fieldset>
  );
};

type UpdateEmployeeDrawerType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  employee: TLocationEmployee;
};

export default function UpdateEmployeeDrawer({
  isOpen,
  setIsOpen,
  employee,
}: UpdateEmployeeDrawerType) {
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    UpdateEmployee<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Header
        title="Edit User"
        titleIcon={() => <UserCogIcon className="mr-2" />}
      />
      <Drawer.Items>
        {state.error && (
          <div className="my-4">
            <ErrorAlert message={state.error} />
          </div>
        )}
        <form action={action}>
          <FormFields defaultValues={employee} />
        </form>
      </Drawer.Items>
    </Drawer>
  );
}