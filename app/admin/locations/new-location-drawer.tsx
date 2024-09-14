"use client";

import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { US_STATES } from "@/constants/us-states";
import { Button, Drawer, Label, Select, TextInput } from "flowbite-react";
import { MapPinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { AddLocation } from "./actions";
import SubmitButton from "@/components/submit-button";

export default function NewLocationDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [state, action] = useFormState(
    AddLocation<TInitialFormState>,
    initialFormState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      state.dismiss && setIsOpen(() => false);
    }
  }, [state.success, state.dismiss, router]);

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        New Location
      </Button>
      {isOpen && (
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header
            title="New Location"
            titleIcon={() => <MapPinIcon className="mr-2" />}
          />
          <Drawer.Items>
            <form action={action} className="grid gap-2 md:gap-4 lg:gap-6">
              <div>
                <Label htmlFor="name" className="mb-2 block">
                  Name
                </Label>
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Southern Utah"
                  required
                />
              </div>
              <h4 className="border-b text-lg font-medium">Office</h4>
              <div>
                <Label htmlFor="address" className="mb-2 block">
                  Address
                </Label>
                <TextInput
                  id="address"
                  name="address"
                  placeholder="1234 Apple Street"
                />
              </div>
              <div>
                <Label htmlFor="address2" className="mb-2 block">
                  Address 2
                </Label>
                <TextInput
                  id="address2"
                  name="address2"
                  placeholder="Suite 300"
                />
              </div>
              <div>
                <Label htmlFor="city" className="mb-2 block">
                  City
                </Label>
                <TextInput id="city" name="city" placeholder="Sydney" />
              </div>
              <div>
                <Label htmlFor="state" className="mb-2 block">
                  State
                </Label>
                <Select name="state">
                  <option value="">Select a state</option>
                  {Object.entries(US_STATES).map(([abbr, name]) => (
                    <option key={abbr} value={abbr}>
                      {name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="postal_code" className="mb-2 block">
                  Postal Code
                </Label>
                <TextInput
                  id="postal_code"
                  name="postal_code"
                  placeholder="02321-2342"
                />
              </div>
              <SubmitButton>
                <MapPinIcon className="mr-2" />
                Create location
              </SubmitButton>
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
