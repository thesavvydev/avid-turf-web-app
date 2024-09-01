"use client";

import { LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { signInAction } from "./actions";
import SubmitButton from "@/components/submit-button";
import { TextInput } from "flowbite-react";
import Linky from "@/components/linky";

const initialFormState: { error?: string } = {};

const PasswordInput = () => {
  const [value, setValue] = useState("");

  const isInvalid = () => {
    if (value === "") return false;
    return value.length < 5;
  };

  return (
    <>
      <TextInput
        className="max-w-xs"
        required
        name="password"
        type="password"
      />
      <span className="self-end">
        <Linky href="/forgot-password">Forgot password?</Linky>
      </span>
    </>
  );
};

const EmailInput = () => {
  const [value, setValue] = useState("");

  const isInvalid = () => {
    if (value === "") return false;
    return !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  };

  return <TextInput className="max-w-xs" required name="email" type="email" />;
};

export default function SignInForm() {
  const [state, dispatch] = useFormState(signInAction, initialFormState);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      {state?.error && (
        <div className="rounded border border-red-300 bg-red-200 p-2 text-xs text-red-600">
          {state.error}
        </div>
      )}
      {/* <EmailInput />
      <PasswordInput /> */}
      <SubmitButton pendingText="Signing in...">Sign In</SubmitButton>
    </form>
  );
}
