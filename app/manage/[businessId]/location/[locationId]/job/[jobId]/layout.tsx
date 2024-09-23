import { PropsWithChildren } from "react";
import JobHeader from "./job-header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <JobHeader />
      {children}
    </>
  );
}
