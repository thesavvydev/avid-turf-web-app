"use client";

import ErrorAlert from "@/components/error-alert";
import SubmitButton from "@/components/submit-button";
import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { LOCATION_PROFILE_ROLES } from "@/constants/location_profile_roles";
import {
  Alert,
  Avatar,
  Drawer,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { UserPlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useCallback,
  useEffect,
} from "react";
import { SearchOrInviteUser } from "./actions";

type TSearchOrInviteUserDrawer = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SearchOrInviteUserDrawer({
  isOpen,
  setIsOpen,
}: TSearchOrInviteUserDrawer) {
  const router = useRouter();
  const { locationId, businessId } = useParams();
  const [state, action] = useActionState(
    SearchOrInviteUser<TInitialFormState>,
    initialFormState,
  );

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    if (state.success) {
      router.refresh();
      if (state.dismiss) setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router, setIsOpen]);

  return (
    <Drawer open={isOpen} onClose={handleClose} position="right">
      <Drawer.Header
        title="Search or Invite User"
        titleIcon={() => <UserPlusIcon className="mr-2" />}
      />
      <Drawer.Items>
        <p className="mb-4 text-xs">
          Search for a user by email. If the user is found, you can select that
          user and their role. If no user is found, we can send them an invite
          to join the system.
        </p>
        {state.error && (
          <div className="my-4">
            <ErrorAlert message={state.error} />
          </div>
        )}
        <form action={action} className="grid gap-4">
          <input type="hidden" name="location_id" value={locationId} />
          <input type="hidden" name="business_id" value={businessId} />
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              disabled={state.data?.id}
            />
          </div>
          {state.data?.id && (
            <div className="flex items-center gap-2 rounded border border-gray-100 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-700">
              <Avatar>{state.data.full_name}</Avatar>
              <input type="hidden" name="profile_id" value={state.data.id} />
            </div>
          )}
          {state.data === "confirm-invite" && (
            <>
              <input type="hidden" name="inviting_new" value="yes" />
              <Alert>
                An invite will be sent to this email so they can join the
                system.
              </Alert>
              <div>
                <Label htmlFor="full_name" className="mb-2 block">
                  Full Name
                </Label>
                <TextInput id="full_name" name="full_name" required />
              </div>
            </>
          )}
          {(state.data?.id || state.data === "confirm-invite") && (
            <div>
              <Label htmlFor="role" className="mb-2 block">
                Role
              </Label>
              <Select name="role" required>
                <option value="">Select a role</option>
                {Object.entries(LOCATION_PROFILE_ROLES).map(
                  ([roleKey, role]) => (
                    <option key={roleKey} value={roleKey}>
                      {role.name}
                    </option>
                  ),
                )}
              </Select>
            </div>
          )}
          <div>
            <SubmitButton
              pendingText={
                state.data === "confirm-invite" ? "Sending..." : "Submitting..."
              }
            >
              {state.data === "confirm-invite" ? "Send Invite" : "Submit"}
            </SubmitButton>
          </div>
        </form>
      </Drawer.Items>
    </Drawer>
  );
}
