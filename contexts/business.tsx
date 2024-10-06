"use client";

import { Tables } from "@/types/supabase";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

interface IBusinessProfile extends Partial<Tables<"business_profiles">> {
  profile: Partial<Tables<"profiles">>;
}

export interface IBusiness extends Partial<Tables<"businesses">> {
  profiles: IBusinessProfile[];
  locations: Partial<Tables<"business_locations">>[];
}

type TBusinessProviderContext = {
  business: IBusiness;
};

const initialContext = {
  business: {
    id: "biz",
    profiles: [],
    locations: [],
  },
};

const BusinessProviderContext =
  createContext<TBusinessProviderContext>(initialContext);

export function useBusinessContext() {
  const context = useContext(BusinessProviderContext);

  if (context === undefined)
    throw new Error(
      "useBusinessContext must be used in BusinessContextProvider",
    );

  return context;
}

export function BusinessContextProvider({
  children,
  business,
}: PropsWithChildren<TBusinessProviderContext>) {
  const value = useMemo(
    () => ({
      business,
    }),
    [business],
  );

  return (
    <BusinessProviderContext.Provider value={value}>
      {children}
    </BusinessProviderContext.Provider>
  );
}
