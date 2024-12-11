import { createSupabaseServerClient } from "@/utils/supabase/server";
import PageForm from "./page-form";
import { ILocationEmployee } from "@/types/location";

type TPage = {
  params: Promise<{ locationId: string; businessId: string }>;
};

export default async function Page(props: TPage) {
  const params = await props.params;
  const { businessId, locationId } = params;

  const supabase = await createSupabaseServerClient();
  const [
    { data: profiles, error },
    { data: products, error: fetchProductsError },
  ] = await Promise.all([
    supabase
      .from("business_location_profiles")
      .select("*, profile: profile_id(id,full_name)")
      .eq("location_id", locationId)
      .returns<ILocationEmployee[]>(),
    supabase
      .from("business_products")
      .select("*")
      .eq("business_id", businessId),
  ]);

  if (error) throw error;
  if (fetchProductsError) throw fetchProductsError;

  return <PageForm profiles={profiles ?? []} products={products ?? []} />;
}
