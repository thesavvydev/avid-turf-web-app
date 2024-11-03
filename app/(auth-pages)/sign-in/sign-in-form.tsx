import { useActionState } from "react";
"use client";

import Linky from "@/components/linky";
import SubmitButton from "@/components/submit-button";
import { TextInput } from "flowbite-react";
import { signInAction } from "./actions";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";

export default function SignInForm() {
  const [state, dispatch] = useActionState(
    signInAction<TInitialFormState>,
    initialFormState,
  );

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      {state?.error && (
        <div className="rounded border border-red-300 bg-red-200 p-2 text-xs text-red-600">
          {state.error}
        </div>
      )}
      <TextInput
        className="max-w-xs"
        required
        name="email"
        type="email"
        placeholder="Email"
      />
      <TextInput
        className="max-w-xs"
        required
        name="password"
        type="password"
        placeholder="Password"
      />
      <span className="self-end">
        <Linky href="/forgot-password">Forgot password?</Linky>
      </span>
      <SubmitButton pendingText="Signing in...">Sign In</SubmitButton>
    </form>
  );
}
