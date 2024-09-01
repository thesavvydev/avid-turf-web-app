"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import NewAppointmentDrawer from "./new-appointment-drawer";

export default function AppointmentsHeader() {
  return (
    <PageHeaderWithActions
      isAdmin
      renderActions={() => <NewAppointmentDrawer />}
      subtitle="Manage your company appointments."
      title="Appointments"
    />
  );
}
