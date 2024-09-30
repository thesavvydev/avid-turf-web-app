"use client";

import { Tables } from "@/types/supabase";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

interface ILocationProfile
  extends Partial<Tables<"business_location_profiles">> {
  profile: Partial<Tables<"profiles">>;
}

export interface ILocation extends Tables<"business_locations"> {
  profiles: ILocationProfile[];
}

type TLocationProviderContext = {
  location: ILocation;
};

const initialContext = {
  location: {
    address: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    name: "",
    id: 0,
    created_at: "",
    business_id: "",
    profiles: [],
  },
};

const LocationProviderContext =
  createContext<TLocationProviderContext>(initialContext);

export function useLocationContext() {
  const context = useContext(LocationProviderContext);

  if (context === undefined)
    throw new Error(
      "useLocationContext must be used in LocationContextProvider",
    );

  return context;
}

export function LocationContextProvider({
  children,
  location,
}: PropsWithChildren<TLocationProviderContext>) {
  const value = useMemo(
    () => ({
      location,
    }),
    [location],
  );

  return (
    <LocationProviderContext.Provider value={value}>
      {children}
    </LocationProviderContext.Provider>
  );
}