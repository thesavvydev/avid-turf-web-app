"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CustomerSearchInput() {
  const searchParams = useSearchParams();

  return (
    <form>
      <div>
        <Label htmlFor="search" className="mb-2 block">
          Enter customer name or email
        </Label>
        <TextInput
          defaultValue={searchParams.get("customerSearch") ?? ""}
          name="customerSearch"
          rightIcon={SearchIcon}
        />
      </div>
      <Button type="submit" className="mt-2">
        Search
      </Button>
    </form>
  );
}
