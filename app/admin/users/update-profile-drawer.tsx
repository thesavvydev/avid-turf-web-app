"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import initialFormState from "@/constants/initial-form-state";
import { Tables } from "@/types/supabase";
import { Drawer, FileInput, Label, TextInput } from "flowbite-react";
import { UserCogIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateUserAction } from "./actions";

const FormFields = ({
  defaultValues,
}: {
  defaultValues: Tables<"profiles">;
}) => {
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 md:gap-4 lg:gap-6">
      <input type="hidden" name="id" value={defaultValues.id} />
      <div>
        <Label htmlFor="avatar_url" className="mb-2 block">
          Avatar
        </Label>
        <FileInput id="avatar_url" name="avatar_url" />
      </div>
      <div>
        <Label htmlFor="full_name" className="mb-2 block">
          Full Name
        </Label>
        <TextInput
          id="full_name"
          name="full_name"
          required
          defaultValue={defaultValues.full_name ?? ""}
        />
      </div>
      <SubmitButton pendingText="Creating User">
        <UserCogIcon className="mr-2" />
        Update User
      </SubmitButton>
    </fieldset>
  );
};

type UpdateProfileDrawerType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: Tables<"profiles">;
};

export default function UpdateProfileDrawer({
  isOpen,
  setIsOpen,
  user,
}: UpdateProfileDrawerType) {
  const router = useRouter();
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    UpdateUserAction<typeof initialFormState>,
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
          <FormFields defaultValues={user} />
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
