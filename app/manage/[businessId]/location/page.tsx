import { createSupabaseServerClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) redirect(`/sign-in`);
  if (error) throw new Error(error.message);

  const { data, error: fetchLocationError } = await supabase
    .from("businesses")
    .select("*,business_profiles(profile_id), business_locations(*)")
    .eq("business_profiles.profile_id", user.id)
    .limit(1)
    .maybeSingle();

  if (fetchLocationError) throw new Error(fetchLocationError.message);

  if (data && data.business_locations.length) {
    redirect(`/manage/${data.id}/location/${data.business_locations[0].id}`);
  }

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 dark:bg-gray-900 xl:px-0">
      <div className="block md:max-w-lg">
        <Image alt="" height={600} src="/images/404.svg" width={600} />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          No locations found.
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          Oops! Looks like you have not been assigned to a location yet.
        </p>
      </div>
    </div>
  );
}
