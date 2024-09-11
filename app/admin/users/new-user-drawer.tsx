"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import initialFormState from "@/constants/initial-form-state";
import { Button, Drawer, FileInput, Label, TextInput } from "flowbite-react";
import { UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AddNewUser } from "./actions";

const FormFields = () => {
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
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
        <TextInput id="full_name" name="full_name" required />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <TextInput id="email" name="email" type="email" required />
      </div>
      <SubmitButton pendingText="Creating User">
        <UserPlusIcon className="mr-2" />
        Create User
      </SubmitButton>
    </fieldset>
  );
};

export default function NewUserDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    AddNewUser<typeof initialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss]);

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        New User
      </Button>
      {isOpen && (
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header
            title="New User"
            titleIcon={() => <UserPlusIcon className="mr-2" />}
          />
          <Drawer.Items>
            {state.error && (
              <div className="my-4">
                <ErrorAlert message={state.error} />
              </div>
            )}
            <form action={action}>
              <FormFields />
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
