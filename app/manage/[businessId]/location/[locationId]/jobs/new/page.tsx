import { createSupabaseServerClient } from "@/utils/supabase/server";
import PageForm from "./page-form";

type TPage = {
  params: Promise<{ locationId: string; businessId: string }>;
};

export default async function Page(props: TPage) {
  const params = await props.params;

  const { businessId, locationId } = params;

  const supabase = await createSupabaseServerClient();
  const { data: profiles, error } = await supabase
    .from("business_location_profiles")
    .select("*, profile: profiles(id,full_name)")
    .eq("location_id", locationId);

  if (error) throw error;

  const { data: products, error: fetchProductsError } = await supabase
    .from("business_products")
    .select("*")
    .eq("business_id", businessId);

  if (fetchProductsError) throw fetchProductsError;

  return <PageForm profiles={profiles ?? []} products={products} />;
}
