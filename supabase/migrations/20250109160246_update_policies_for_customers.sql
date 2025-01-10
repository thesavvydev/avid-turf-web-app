drop policy "Enable all for location employees" on "public"."business_location_customers";

alter table "public"."business_location_customers" alter column "address" set not null;

alter table "public"."business_location_customers" alter column "city" set not null;

alter table "public"."business_location_customers" alter column "email" drop not null;

alter table "public"."business_location_customers" alter column "postal_code" set not null;

alter table "public"."business_location_customers" alter column "state" set not null;

create policy "Enable all for creator or closer"
on "public"."business_location_customers"
as permissive
for all
to authenticated
using (((( SELECT auth.uid() AS uid) = creator_id) OR (( SELECT auth.uid() AS uid) = closer_id)));


create policy "Enable insert for"
on "public"."business_location_customers"
as permissive
for insert
to authenticated
with check (has_location_profile(location_id));



