import { Avatar, Button, Card, Label, Timeline } from "flowbite-react";
import {
  ArrowRightIcon,
  Edit2Icon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  PlusCircleIcon,
} from "lucide-react";
import JobHistoryTimeline from "./job-history-timeline";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="col-span-2">
          <Card>
            <div className="flex flex-1 items-center justify-between gap-2">
              <h6 className="text-lg font-semibold tracking-tighter">
                Proposal
              </h6>
              <div className="shrink-0 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:bg-gray-700">
                <PencilIcon className="fill-gray-200" />
              </div>
            </div>
          </Card>
        </div>
        <div className="row-span-3">
          <Card>
            <div className="grid gap-4 lg:gap-6">
              <div className="grid gap-4 border-b border-dashed border-gray-200 pb-4 dark:border-gray-700 lg:gap-6 lg:pb-6">
                <div className="flex items-center justify-between gap-2">
                  <h6 className="text-lg font-semibold tracking-tighter">
                    Customer info
                  </h6>
                  <div className="shrink-0 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:bg-gray-700">
                    <PencilIcon className="fill-gray-200" />
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar rounded bordered />
                  <div className="grid gap-1">
                    <p className="font-semibold">John Doe</p>
                    <div className="flex items-center gap-1 font-light">
                      <PhoneIcon className="size-4" /> 555-555-555
                    </div>
                    <Button size="xs" outline color="light">
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <MailIcon className="size-4" />
                        Send Email
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 border-b border-dashed border-gray-200 pb-4 dark:border-gray-700 lg:gap-6">
                <div className="flex items-center justify-between gap-2">
                  <h6 className="text-lg font-semibold tracking-tighter">
                    Location
                  </h6>
                  <div className="shrink-0 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:bg-gray-700">
                    <PencilIcon className="fill-gray-200" />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4 lg:gap-6">
                  <dl className="grid gap-4">
                    <div className="grid items-center gap-2 xl:grid-cols-2">
                      <dt className="text-gray-400">Address</dt>
                      <dd className="text-gray-600 dark:text-gray-300">
                        11123 Colton Road
                      </dd>
                    </div>
                    <div className="grid items-center gap-2 xl:grid-cols-2">
                      <dt className="text-gray-400">City</dt>
                      <dd className="text-gray-600 dark:text-gray-300">
                        St George
                      </dd>
                    </div>
                    <div className="grid items-center gap-2 xl:grid-cols-2">
                      <dt className="text-gray-400">State</dt>
                      <dd className="text-gray-600 dark:text-gray-300">Utah</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-2">
                  <h6 className="text-lg font-semibold tracking-tighter">
                    Employees
                  </h6>
                  <div className="flex items-center gap-2">
                    <div className="shrink-0 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:bg-gray-700">
                      <PlusCircleIcon />
                    </div>
                    <div className="shrink-0 cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:bg-gray-700">
                      <PencilIcon className="fill-gray-200" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4 lg:gap-6">
                  <Avatar rounded bordered placeholderInitials="JD">
                    John Doe
                    <br />
                    <Label className="text-amber-500">Setter</Label>
                  </Avatar>
                  <Avatar rounded bordered placeholderInitials="BS">
                    Blake Shelton
                    <br />
                    <Label className="text-green-500">Closer</Label>
                  </Avatar>
                  <Avatar rounded bordered placeholderInitials="PW">
                    Paul Walker
                    <br />
                    <Label className="text-cyan-500">Installer</Label>
                  </Avatar>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-2">
          <Card>
            <h6 className="mb-6 text-lg font-semibold tracking-tighter">
              History
            </h6>
            <JobHistoryTimeline />
          </Card>
        </div>
      </div>
    </>
  );
}
