import { PropsWithChildren } from "react";
import AdminNav from "./admin-nav";
import AdminSideBar from "./admin-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminNav />
      <div className="flex gap-4 p-4 lg:gap-8 lg:p-8">
        <AdminSideBar />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
