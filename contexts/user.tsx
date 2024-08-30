"use client";

import { createContext, PropsWithChildren, useContext, useMemo } from "react";

const UserProviderContext = createContext({ user: {} });

export function useUserContext() {
  const context = useContext(UserProviderContext);

  if (context === undefined)
    throw new Error("useUserContext must be used in UserContextProvider");

  return context;
}

type UserProviderContextProps = PropsWithChildren & {
  user: {};
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
