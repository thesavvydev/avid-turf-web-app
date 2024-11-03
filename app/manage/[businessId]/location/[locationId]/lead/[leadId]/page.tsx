import Linky from "@/components/linky";
import { formatAsCompactCurrency, formatAsCurrency } from "@/utils/formatter";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import {
  Badge,
  Card,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import {
  CalendarCheckIcon,
  DollarSignIcon,
  DoorOpenIcon,
  FileIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  WorkflowIcon,
} from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ leadId: string }>;
}) {
  const params = await props.params;

  const { leadId } = params;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("business_location_leads")
    .select("*")
    .eq("id", leadId)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) notFound();

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        <Card>
          <div className="flex grow items-center gap-2 lg:gap-4">
            <div className="relative size-10 flex-shrink-0">
              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <DoorOpenIcon className="size-6 fill-indigo-600/20 stroke-indigo-600 stroke-2" />
              </div>
            </div>
            <div>
              <h6 className="whitespace-nowrap font-medium">Source</h6>
              <p className="text-gray-400">{data.source}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex grow items-center gap-2 lg:gap-4">
            <div className="relative size-10 flex-shrink-0">
              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <DollarSignIcon className="size-6 fill-red-600/20 stroke-red-600 stroke-2" />
              </div>
            </div>
            <div>
              <h6 className="whitespace-nowrap font-medium">Budget</h6>
              <p className="text-gray-400">
                {formatAsCurrency(Number(data.budget))}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex grow items-center gap-2 lg:gap-4">
            <div className="relative size-10 flex-shrink-0">
              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <WorkflowIcon className="size-6 fill-lime-600/20 stroke-lime-600 stroke-2" />
              </div>
            </div>
            <div>
              <h6 className="whitespace-nowrap font-medium">Type</h6>
              <p className="text-gray-400">{data.type ?? "No type"}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex grow items-center gap-2 lg:gap-4">
            <div className="relative size-10 flex-shrink-0">
              <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <CalendarCheckIcon className="size-6 fill-amber-600/20 stroke-amber-600 stroke-2" />
              </div>
            </div>
            <div>
              <h6 className="whitespace-nowrap font-medium">Completion Date</h6>
              <p className="text-gray-400">
                {new Date(data.completion_date ?? "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-6">
        <div className="space-y-1 md:col-span-8 md:space-y-2">
          <h3 className="font-medium tracking-tighter text-gray-500 dark:text-gray-400">
            Estimates
          </h3>
          <Table
            theme={{
              root: {
                shadow:
                  "absolute left-0 top-0 -z-10 h-full w-full rounded-xl border border-gray-100 bg-white shadow-lg shadow-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900",
              },
            }}
          >
            <TableHead>
              <TableHeadCell>Created</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Completion Date</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell />
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell>{formatAsCompactCurrency(10023000)}</TableCell>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell className="w-0">
                  <Badge color="green">Approved</Badge>
                </TableCell>
                <TableCell className="w-0">
                  <div className="flex gap-1 md:gap-2">
                    <SettingsIcon />
                    <TrashIcon />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell>{formatAsCompactCurrency(30023000)}</TableCell>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell className="w-0">
                  <Badge color="red">Denied</Badge>
                </TableCell>
                <TableCell className="w-0">
                  <div className="flex gap-1 md:gap-2">
                    <SettingsIcon />
                    <TrashIcon />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="space-y-1 divide-y divide-gray-100 dark:divide-gray-800 md:col-span-4 md:space-y-2">
          <div className="flex w-full grow items-center justify-between">
            <h3 className="font-medium tracking-tighter text-gray-500 dark:text-gray-400">
              Files
            </h3>
            <PlusIcon className="size-4" />
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
            <div className="grid size-12 place-items-center bg-gray-100 dark:bg-gray-800">
              <FileIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grow gap-2 md:gap-6">
        <h2 className="text-2xl font-medium tracking-tighter text-gray-500 dark:text-gray-400">
          Area Demographics
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 md:gap-6">
          <div className="grid aspect-video w-full place-items-center bg-gray-50 dark:bg-gray-800">
            <p>map of address zoomed out</p>
            <p>include any jobs within the zoom radius</p>
          </div>
          <div>column of data</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
        <Card>
          <h3 className="font-medium tracking-tighter text-gray-500 dark:text-gray-400">
            Other Leads
          </h3>
          <List>
            <ListItem>
              <Linky href="#">Shawn Kingston</Linky>
            </ListItem>
            <ListItem>
              <Linky href="#">Lamar Odom</Linky>
            </ListItem>
            <ListItem>
              <Linky href="#">Michael Vick</Linky>
            </ListItem>
            <ListItem>
              <Linky href="#">Jermaine O&apos;neal</Linky>
            </ListItem>
          </List>
        </Card>
        <Card>
          <h3 className="font-medium tracking-tighter text-gray-500 dark:text-gray-400">
            Nearby jobs
          </h3>
          <List>
            <ListItem>
              <Linky href="#">1234 Leaf St - $185k</Linky>
            </ListItem>
            <ListItem>
              <Linky href="#">17000 S 300 E - $25k</Linky>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}
