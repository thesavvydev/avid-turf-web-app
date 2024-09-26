alter table "public"."business_location_jobs" add column "creator_id" uuid not null;

alter table "public"."business_location_jobs" add constraint "business_location_jobs_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."business_location_jobs" validate constraint "business_location_jobs_creator_id_fkey";

create policy "Enable delete for closer"
on "public"."business_location_jobs"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = closer_id));



