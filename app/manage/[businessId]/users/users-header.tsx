"use client";

import PageHeaderWithActions from "@/components/page-header-with-actions";
import { Button } from "flowbite-react";
import { useState } from "react";
import SearchOrInviteUserDrawer from "./search-or-invite-user-drawer";

export default function UsersHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <SearchOrInviteUserDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <PageHeaderWithActions
        title="Users"
        subtitle="Employee management for your business."
        renderActions={() => (
          <Button onClick={() => setIsOpen(true)} color="primary">
            Add User
          </Button>
        )}
      />
    </>
  );
}
