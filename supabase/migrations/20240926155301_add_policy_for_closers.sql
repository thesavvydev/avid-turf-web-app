drop policy "Enable delete for closer" on "public"."business_location_jobs";

create policy "Enable all actions for creator"
on "public"."business_location_jobs"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = creator_id));



