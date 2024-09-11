"use client";

import SubmitButton from "@/components/submit-button";

import { TextInput } from "flowbite-react";
import { useFormState } from "react-dom";
import { signUpAction } from "./actions";

const initialFormState: { error?: string } = {};

const PasswordInput = () => {
  return (
    <TextInput className="max-w-xs" required name="password" type="password" />
  );
};

const EmailInput = () => {
  return <TextInput className="max-w-xs" required name="email" type="email" />;
};

export default function SignUpForm() {
  const [state, dispatch] = useFormState(signUpAction, initialFormState);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      {state?.error && (
        <div className="rounded border border-red-300 bg-red-200 p-2 text-xs text-red-600">
          {state.error}
        </div>
      )}
      <EmailInput />
      <PasswordInput />
      <SubmitButton pendingText="Signing up...">Sign Up</SubmitButton>
    </form>
  );
}
