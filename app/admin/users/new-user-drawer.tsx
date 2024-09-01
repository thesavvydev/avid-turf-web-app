"use client";

import {
  Avatar,
  Button,
  Drawer,
  Label,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { MapPinIcon } from "lucide-react";
import { useState } from "react";

export default function NewUserDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        New User
      </Button>
      {isOpen && (
        <Drawer open={isOpen} onClose={handleClose}>
          <Drawer.Header
            title="NEW USER"
            titleIcon={() => <MapPinIcon className="mr-2" />}
          />
          <Drawer.Items>
            <form action="#" className="grid gap-4 lg:gap-8">
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Title
                </Label>
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Apple Keynote"
                />
              </div>
              <div>
                <Label className="mb-2 block">Employees</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="busy"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="busy"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="busy"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="online"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="online"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="busy"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="busy"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                  <Tooltip content="John Doe">
                    <Avatar
                      rounded
                      placeholderInitials="JD"
                      status="busy"
                      statusPosition="top-right"
                    />
                  </Tooltip>
                </div>
              </div>
              <Button className="w-full" color="primary">
                <MapPinIcon className="mr-2" />
                Create User
              </Button>
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
