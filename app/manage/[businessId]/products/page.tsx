import { createSupabaseServerClient } from "@/utils/supabase/server";
import ProductsHeader from "./products-header";
import ProductsTable from "./products-table";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("business_products")
    .select("*")
    .order("name");

  if (error) throw error;

  return (
    <>
      <ProductsHeader />
      <ProductsTable products={data} />
    </>
  );
}
