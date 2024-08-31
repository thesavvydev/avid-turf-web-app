import SignUpForm from "./sign-up-form";
import NextLink from "next/link";

export default function SignUpPage() {
  return (
    <>
      <hgroup>
        <h1 className="text-4xl font-bold">Sign up</h1>
        <p className="text-sm text-foreground">
          Already have an account?{" "}
          <NextLink
            href="/sign-in"
            className="text-foreground font-medium underline"
          >
            Sign in
          </NextLink>
        </p>
      </hgroup>
      <SignUpForm />
    </>
  );
}
