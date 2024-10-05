alter table "public"."business_locations" drop constraint "locations_name_key";

drop index if exists "public"."locations_name_key";

create policy "Enable all access for business admins"
on "public"."business_locations"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) IN ( SELECT business_profiles.profile_id
   FROM business_profiles
  WHERE ((business_profiles.business_id = business_locations.business_id) AND (business_profiles.role = 'admin'::business_roles)))));



