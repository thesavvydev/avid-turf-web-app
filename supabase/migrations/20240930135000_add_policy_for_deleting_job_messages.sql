create policy "Enable delete for users based on author_id"
on "public"."business_location_job_messages"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = author_id));



