import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("business_products").select("*");

  if (error) throw error;

  return <div>Products page</div>;
}
