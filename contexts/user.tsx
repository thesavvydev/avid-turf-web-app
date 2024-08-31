"use client";

import { Tables } from "@/types/supabase";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

const UserProviderContext = createContext<{
  user: Partial<Tables<"profiles">>;
}>({
  user: {},
});

export function useUserContext() {
  const context = useContext(UserProviderContext);

  if (context === undefined)
    throw new Error("useUserContext must be used in UserContextProvider");

  return context;
}

type UserProviderContextProps = PropsWithChildren & {
  user: Partial<Tables<"profiles">>;
};

export default function UserContextProvider({
  children,
  user,
}: UserProviderContextProps) {
  const value = useMemo(() => ({ user }), [user]);

  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
}
