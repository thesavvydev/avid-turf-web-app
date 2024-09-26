"use client";

import { Tables } from "@/types/supabase";
import { Avatar, Drawer, Textarea, Tooltip } from "flowbite-react";
import { UserPlus2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type TJobMessagesDrawer = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  job: Tables<"business_location_jobs">;
};

export default function JobMessagesDrawer({
  isOpen,
  setIsOpen,
}: TJobMessagesDrawer) {
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer open={isOpen} onClose={handleClose} position="right">
      <Drawer.Header
        title="Job Messages"
        titleIcon={() => <UserPlus2Icon className="mr-2" />}
      />
      <Drawer.Items>
        <div className="grid h-full max-h-[calc(100vh-5em)] grid-rows-[1fr_max-content] gap-2">
          <div className="grid h-full gap-2 overflow-y-auto md:gap-4">
            <div className="flex items-start gap-2">
              <Tooltip content="John Doe">
                <Avatar size="sm" />
              </Tooltip>
              <div className="grid gap-1">
                <div className="rounded bg-gradient-to-tr from-gray-50 to-gray-100 p-2 dark:from-gray-700 dark:to-gray-600">
                  Message here.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{`Sent on ${new Date().toLocaleDateString()}`}</span>
                </div>
              </div>
            </div>
            <div className="group flex flex-row-reverse items-start gap-2">
              <Tooltip content="John Doe">
                <Avatar size="sm" />
              </Tooltip>
              <div className="grid gap-1">
                <div className="rounded bg-gradient-to-tr from-blue-500 to-blue-600 p-2 text-blue-100">
                  Message here that gets really really long so it will keep on
                  going and going. Message here that gets really really long so
                  it will keep on going and going.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{`Sent on ${new Date().toLocaleDateString()}`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Tooltip content="John Doe">
                <Avatar size="sm" />
              </Tooltip>
              <div className="grid gap-1">
                <div className="rounded bg-gradient-to-tr from-gray-50 to-gray-100 p-2 dark:from-gray-700 dark:to-gray-600">
                  Message here that gets really really long so it will keep on
                  going and going. Message here that gets really really long so
                  it will keep on going and going.Message here that gets really
                  really long so it will keep on going and going. Message here
                  that gets really really long so it will keep on going and
                  going.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{`Sent on ${new Date().toLocaleDateString()}`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Tooltip content="John Doe">
                <Avatar size="sm" />
              </Tooltip>
              <div className="grid gap-1">
                <div className="rounded bg-gradient-to-tr from-gray-50 to-gray-100 p-2 dark:from-gray-700 dark:to-gray-600">
                  Message here.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{`Sent on ${new Date().toLocaleDateString()}`}</span>
                </div>
              </div>
            </div>
            <div className="group flex flex-row-reverse items-start gap-2">
              <Tooltip content="John Doe">
                <Avatar size="sm" />
              </Tooltip>
              <div className="grid gap-1">
                <div className="rounded bg-gradient-to-tr from-blue-500 to-blue-600 p-2 text-blue-100">
                  Message here that gets really really long so it will keep on
                  going and going. Message here that gets really really long so
                  it will keep on going and going.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{`Sent on ${new Date().toLocaleDateString()}`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Tooltip content="John Doe">
                <Avatar size="sm" />
              </Tooltip>
              <div className="grid gap-1">
                <div className="rounded bg-gradient-to-tr from-gray-50 to-gray-100 p-2 dark:from-gray-700 dark:to-gray-600">
                  Message here that gets really really long so it will keep on
                  going and going. Message here that gets really really long so
                  it will keep on going and going.Message here that gets really
                  really long so it will keep on going and going. Message here
                  that gets really really long so it will keep on going and
                  going.
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{`Sent on ${new Date().toLocaleDateString()}`}</span>
                </div>
              </div>
            </div>
          </div>
          <Textarea />
        </div>
      </Drawer.Items>
    </Drawer>
  );
}
