"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

interface SidebarContextProps {
  isCollapsed: boolean;
  setCollapsed(value: boolean): void;
  toggle(): void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function SidebarProvider({
  initialCollapsed,
  children,
}: PropsWithChildren<{ initialCollapsed: boolean }>) {
  const [isCollapsed, setCollapsed] = useState(initialCollapsed);

  function handleSetCollapsed(value: boolean) {
    setCollapsed(value);
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setCollapsed: handleSetCollapsed,
        toggle: () => handleSetCollapsed(!isCollapsed),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext(): SidebarContextProps {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebarContext must be used within the SidebarContext provider!",
    );
  }

  return context;
}
