"use client";

import { Button } from "@nextui-org/react";
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
      {pending && pendingText ? pendingText : children}
    </Button>
  );
}
