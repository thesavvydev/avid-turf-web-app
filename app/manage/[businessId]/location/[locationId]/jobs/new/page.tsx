import { createClient } from "@/utils/supabase/server";
import PageForm from "./page-form";

type TPage = {
  params: { locationId: string; businessId: string };
};

export default async function Page({
  params: { businessId, locationId },
}: TPage) {
  const supabase = createClient();
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
