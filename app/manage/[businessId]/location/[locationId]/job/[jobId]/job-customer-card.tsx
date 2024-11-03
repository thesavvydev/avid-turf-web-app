"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { useUserContext } from "@/contexts/user";
import { IJob } from "@/types/job";
import { Avatar, Button, Drawer, Label, TextInput } from "flowbite-react";
import { EditIcon, MailIcon, PhoneIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { UpdateJobCustomer } from "./actions";

type TJobCustomerCard = {
  job: IJob;
};

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
      <SubmitButton pendingText="Updating customer...">
        <UserPlus2Icon className="mr-2" />
        Update Customer
      </SubmitButton>
    </fieldset>
  );
}

function EditDrawer({ job }: { job: IJob }) {
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
      <div
        className="shrink-0 cursor-pointer rounded-full p-2 opacity-0 hover:bg-gray-100 group-hover:opacity-100 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <EditIcon />
      </div>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
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
    </>
  );
}

export default function JobCustomerCard({ job }: TJobCustomerCard) {
  return (
    <div className="group grid gap-4 border-b border-dashed border-gray-200 pb-4 dark:border-gray-700 lg:gap-6 lg:pb-6">
      <div className="flex items-center justify-between gap-2">
        <h6 className="text-lg font-semibold tracking-tighter">
          Customer info
        </h6>
        <EditDrawer job={job} />
      </div>
      <div className="flex items-start gap-4">
        <Avatar rounded bordered />
        <div className="grid gap-1">
          <p className="font-semibold">{job.full_name}</p>
          <div className="flex items-center gap-1 font-light">
            <PhoneIcon className="size-4" /> {job.phone}
          </div>
          <Button size="xs" outline color="light">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MailIcon className="size-4" />
              Send Email
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
