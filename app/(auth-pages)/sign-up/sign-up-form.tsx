"use client";

import SubmitButton from "@/components/submit-button";
import { Input } from "@nextui-org/react";
import { LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { signUpAction } from "./actions";

const initialFormState: { error?: string } = {};

const PasswordInput = () => {
  const [value, setValue] = useState("");

  const isInvalid = () => {
    if (value === "") return false;
    return value.length < 5;
  };

  return (
    <Input
      className="max-w-xs"
      isInvalid={isInvalid()}
      isRequired
      label="Password"
      labelPlacement="outside"
      name="password"
      type="password"
      startContent={
        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      onValueChange={setValue}
      validationBehavior="native"
      value={value}
    />
  );
};

const EmailInput = () => {
  const [value, setValue] = useState("");

  const isInvalid = () => {
    if (value === "") return false;
    return !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  };

  return (
    <Input
      className="max-w-xs"
      isInvalid={isInvalid()}
      isRequired
      label="Email"
      labelPlacement="outside"
      name="email"
      type="email"
      startContent={
        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      onValueChange={setValue}
      value={value}
      validationBehavior="native"
    />
  );
};

export default function SignUpForm() {
  const [state, dispatch] = useFormState(signUpAction, initialFormState);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      {state?.error && (
        <div className="bg-red-200 text-red-600 text-xs p-2 rounded border border-red-300">
          {state.error}
        </div>
      )}
      <EmailInput />
      <PasswordInput />
      <SubmitButton pendingText="Signing up...">Sign Up</SubmitButton>
    </form>
  );
}
