"use client";

import { Button, Code, Snippet } from "@nextui-org/react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Error(props: { error: Error }) {
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 xl:px-0 dark:bg-gray-900">
      <div className="block md:max-w-lg">
        <Image alt="" height={550} src="/images/500.svg" width={550} />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
          Something has gone seriously wrong
        </h1>
        {props.error?.message && (
          <div className="my-4">
            <Code color="danger">{`Error message: ${props.error.message}`}</Code>
          </div>
        )}
        <Button color="primary" href="/" className="inline-flex p-px">
          <div className="mr-1 flex items-center gap-x-2">
            <ChevronLeft className="text-xl" /> Go back home
          </div>
        </Button>
      </div>
    </div>
  );
}
