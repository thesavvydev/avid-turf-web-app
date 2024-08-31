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
      <div className="container p-4 sm:p-8">{children}</div>
    </>
  );
}
