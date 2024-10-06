create policy "Enable all actions for location managers"
on "public"."business_location_jobs"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) IN ( SELECT business_location_profiles.profile_id
   FROM business_location_profiles
  WHERE ((business_location_profiles.location_id = business_location_jobs.business_location_id) AND (business_location_profiles.role = ANY (ARRAY['manager'::location_profile_roles, 'admin'::location_profile_roles]))))));



