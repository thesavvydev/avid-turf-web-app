import { Alert } from "flowbite-react";
import { AlertCircleIcon } from "lucide-react";

export default function ErrorAlert({ message }: { message: string }) {
  return (
    <Alert color="red" icon={() => <AlertCircleIcon className="mr-2 size-4" />}>
      {message}
    </Alert>
  );
}
