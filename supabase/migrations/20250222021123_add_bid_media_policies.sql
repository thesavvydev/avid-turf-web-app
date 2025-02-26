alter table "public"."business_location_customer_bid_products" add column "customer_id" bigint;

alter table "public"."business_location_customer_bid_products" add constraint "business_location_customer_bid_products_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES business_location_customers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_customer_bid_products" validate constraint "business_location_customer_bid_products_customer_id_fkey";

create policy "Enable all actions for business admins"
on "public"."business_location_customer_bid_media"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'admin'::text));


create policy "Enable all actions for business manager"
on "public"."business_location_customer_bid_media"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'manager'::text));


create policy "Enable all actions for global admins"
on "public"."business_location_customer_bid_media"
as permissive
for all
to authenticated
using (is_global_admin());


create policy "Enable all actions for location admin"
on "public"."business_location_customer_bid_media"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'admin'::text));


create policy "Enable all actions for location managers"
on "public"."business_location_customer_bid_media"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'manager'::text));


create policy "Enable all for location employees"
on "public"."business_location_customer_bid_media"
as permissive
for all
to authenticated
using (has_location_profile(location_id));

CREATE POLICY "Enable all access for all authenticated users" ON "storage"."objects"
AS PERMISSIVE FOR ALL
TO authenticated
USING (true);
