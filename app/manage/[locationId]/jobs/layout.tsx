import { PropsWithChildren } from "react";
import JobsHeader from "./jobs-header";

export const metadata = {
  title: "Jobs",
  description: "",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <JobsHeader />
      {children}
    </>
  );
}
