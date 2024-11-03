"use client";

import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { IJob } from "@/types/job";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import { useUserContext } from "@/contexts/user";
import { Drawer, Label, TextInput } from "flowbite-react";
import { UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { UpdateJobCustomer } from "./actions";

function EditDrawerFormFields({ job }: { job: IJob }) {
  const { pending } = useFormStatus();
  const { user } = useUserContext();
  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input name="job_id" value={job.id} type="hidden" />
      <input name="business_id" value={job.business_id} type="hidden" />
      <input name="profile_id" value={user.id} type="hidden" />
      <div>
        <Label htmlFor="full_name" className="mb-2 block">
          Full Name
        </Label>
        <TextInput
          autoComplete="off"
          id="full_name"
          name="full_name"
          defaultValue={job.full_name}
        />
      </div>
      <div>
        <Label htmlFor="phone" className="mb-2 block">
          Phone
        </Label>
        <TextInput
          autoComplete="off"
          id="phone"
          name="phone"
          type="phone"
          defaultValue={job.phone ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email
        </Label>
        <TextInput
          autoComplete="off"
          id="email"
          name="email"
          type="email"
          defaultValue={job.email ?? ""}
        />
      </div>
      <SubmitButton pendingText="Saving customer...">
        <UserPlus2Icon className="mr-2" />
        Update Customer
      </SubmitButton>
    </fieldset>
  );
}

export default function UpdateCustomerDrawer({
  job,
  trigger,
}: {
  job: IJob;
  trigger: (arg: Dispatch<SetStateAction<boolean>>) => ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(
    UpdateJobCustomer<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      if (state.dismiss) setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <>
      {trigger(setIsOpen)}
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          className="z-50"
        >
          <Drawer.Header
            title="Update customer"
            titleIcon={() => <UserPlus2Icon className="mr-2" />}
          />
          <Drawer.Items>
            {state.error && (
              <div className="my-4">
                <ErrorAlert message={state.error} />
              </div>
            )}
            <form action={action} className="my-4">
              <EditDrawerFormFields job={job} />
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
