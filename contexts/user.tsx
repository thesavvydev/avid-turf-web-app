"use client";

import { Tables } from "@/types/supabase";
import { useParams } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";

type TLocation = Partial<Tables<"business_locations">> &
  Partial<Tables<"business_location_profiles">>;

interface User extends Partial<Tables<"profiles">> {
  businesses?: Tables<"businesses">[];
  locations?: Tables<"business_locations">[];
  location_profiles?: Tables<"business_location_profiles">[];
  location?: TLocation;
  locationAdmin?: boolean;
}

const UserProviderContext = createContext<{
  user: User;
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
  user: User;
};

export default function UserContextProvider({
  children,
  user,
}: UserProviderContextProps) {
  const { locationId } = useParams();

  const getLocationData = useCallback(() => {
    const { locations, location_profiles } = user;

    const selectedLocation = locations?.find(
      (location) => location.id === Number(locationId),
    );

    const selectedLocationProfile = location_profiles?.find(
      (locationProfile) => locationProfile.location_id === Number(locationId),
    );

    const foundBothLocationAndProfile =
      !!selectedLocation && !!selectedLocationProfile;

    return {
      ...(foundBothLocationAndProfile
        ? { ...selectedLocation, ...selectedLocationProfile }
        : {}),
    };
  }, [locationId, user.locations, user.location_profiles]);

  const value = useMemo(
    () => ({
      user: {
        ...user,
        ...(locationId
          ? {
              location: getLocationData(),
            }
          : {}),
      },
    }),
    [user],
  );

  return (
    <UserProviderContext.Provider value={value}>
      {children}
    </UserProviderContext.Provider>
  );
}
