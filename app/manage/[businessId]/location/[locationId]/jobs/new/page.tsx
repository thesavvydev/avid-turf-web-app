import { createSupabaseServerClient } from "@/utils/supabase/server";
import PageForm from "./page-form";
import { ILocationEmployee } from "@/types/location";
import { Breadcrumb, BreadcrumbItem, TextInput } from "flowbite-react";
import PageHeaderWithActions from "@/components/page-header-with-actions";
import { ChevronLeftIcon } from "lucide-react";

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

  return (
    <>
      <PageHeaderWithActions
        title="New Job"
        subtitle="Add a new job"
        renderBreadcrumbs={() => (
          <Breadcrumb aria-label="Back to jobs">
            <BreadcrumbItem
              href={`/manage/${businessId}/location/${locationId}/jobs`}
              icon={() => <ChevronLeftIcon className="mr-2" />}
            >
              Back to Jobs
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      />
      <PageForm profiles={profiles ?? []} products={products ?? []} />
    </>
  );
}
