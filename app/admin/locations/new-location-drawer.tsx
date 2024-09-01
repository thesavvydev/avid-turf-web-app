"use client";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import {
  Avatar,
  Button,
  Drawer,
  Label,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TUsers = Pick<Tables<"profiles">, "id" | "full_name" | "avatar_url">[];

const useUsers = () => {
  const supabase = createClient();
  const [data, setData] = useState<TUsers>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      await supabase
        .from("profiles")
        .select("id,full_name,avatar_url")
        .then((response) => {
          if (response.error) return;
          setData(response.data);
        });

      setIsLoading(false);
    };

    if (isLoading) fetchUsers();
  }, []);

  return {
    isLoading,
    data,
  };
};

export default function NewLocationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const toggleUser = (id: string) =>
    setSelectedUsers((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id],
    );
  const { data: users, isLoading } = useUsers();

  return (
    <>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        New Location
      </Button>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header
          title="NEW LOCATION"
          titleIcon={() => <MapPinIcon className="mr-2" />}
        />
        <Drawer.Items>
          <form action="#" className="grid gap-4 lg:gap-8">
            <div>
              <Label htmlFor="title" className="mb-2 block">
                Title
              </Label>
              <TextInput id="title" name="title" placeholder="Apple Keynote" />
            </div>
            <div>
              <Label className="mb-2 block">Employees</Label>
              <div className="flex flex-wrap items-center gap-2">
                {users.map((user) => (
                  <Tooltip content={user.full_name} key={user.full_name}>
                    <Avatar
                      onClick={() => toggleUser(user.id)}
                      color={selectedUsers.includes(user.id) ? "dark" : "light"}
                      bordered
                      rounded
                      placeholderInitials={
                        user.full_name
                          ? user.full_name
                              .split(" ")
                              .map((chars) => chars[0])
                              .join("")
                          : undefined
                      }
                    />
                  </Tooltip>
                ))}
              </div>
            </div>
            <Button className="w-full" color="primary">
              <MapPinIcon className="mr-2" />
              Create location
            </Button>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
