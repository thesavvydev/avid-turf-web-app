"use client";

import { Button, Spinner } from "flowbite-react";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = PropsWithChildren & {
  pendingText?: string;
};

export default function SubmitButton({
  children,
  pendingText,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" color="primary" size="lg">
      {pending && pendingText ? (
        <>
          <Spinner aria-label="Form submitted" size="md" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
