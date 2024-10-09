"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { Drawer, Label, TextInput } from "flowbite-react";
import { FileUpIcon, SettingsIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import SupabaseFileUploadDropzone from "@/components/supabase-file-upload-dropzone";
import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UpdateJobMedia } from "./actions";

function UpdateMediaDrawerFormFields({
  media,
}: {
  media: Tables<"business_location_job_media">;
}) {
  const { businessId, locationId, jobId } = useParams();
  const { pending } = useFormStatus();

  return (
    <fieldset disabled={pending} className="grid gap-2 lg:gap-6">
      <input name="id" value={media.id} type="hidden" />
      <div>
        <Label htmlFor="name" className="mb-2 block">
          Name
        </Label>
        <TextInput
          autoComplete="off"
          id="name"
          name="name"
          required
          defaultValue={media.name}
        />
      </div>
      <SupabaseFileUploadDropzone
        bucket="businesses"
        defaultPath={media.path}
        filePath={`${businessId}/locations/${locationId}/jobs/${jobId}`}
        name="path"
        required
      />

      <SubmitButton pendingText="Creating Job">
        <FileUpIcon className="mr-2" />
        Update media
      </SubmitButton>
    </fieldset>
  );
}

export default function EditMediaDrawer({
  media,
}: {
  media: Tables<"business_location_job_media">;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useFormState(
    UpdateJobMedia<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <>
      <div
        className="cursor-pointer rounded bg-white p-1 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <SettingsIcon className="size-4" />
      </div>
      {isOpen && (
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
          <Drawer.Header
            title="Update media"
            titleIcon={() => <FileUpIcon className="mr-2" />}
          />
          <Drawer.Items>
            {state.error && (
              <div className="my-4">
                <ErrorAlert message={state.error} />
              </div>
            )}
            <form action={action} className="my-4">
              <UpdateMediaDrawerFormFields media={media} />
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
