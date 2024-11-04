create table "public"."business_location_job_timesheets" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "business_id" uuid not null,
    "location_id" bigint not null,
    "job_id" bigint not null,
    "profile_id" uuid not null,
    "start_datetime" timestamp without time zone not null,
    "end_datetime" timestamp without time zone,
    "paid" boolean not null default false
);


alter table "public"."business_location_job_timesheets" enable row level security;

CREATE UNIQUE INDEX business_location_job_timesheets_pkey ON public.business_location_job_timesheets USING btree (id);

alter table "public"."business_location_job_timesheets" add constraint "business_location_job_timesheets_pkey" PRIMARY KEY using index "business_location_job_timesheets_pkey";

alter table "public"."business_location_job_timesheets" add constraint "business_location_job_timesheets_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_timesheets" validate constraint "business_location_job_timesheets_business_id_fkey";

alter table "public"."business_location_job_timesheets" add constraint "business_location_job_timesheets_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business_location_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_timesheets" validate constraint "business_location_job_timesheets_job_id_fkey";

alter table "public"."business_location_job_timesheets" add constraint "business_location_job_timesheets_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_timesheets" validate constraint "business_location_job_timesheets_location_id_fkey";

alter table "public"."business_location_job_timesheets" add constraint "business_location_job_timesheets_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_timesheets" validate constraint "business_location_job_timesheets_profile_id_fkey";

grant delete on table "public"."business_location_job_timesheets" to "anon";

grant insert on table "public"."business_location_job_timesheets" to "anon";

grant references on table "public"."business_location_job_timesheets" to "anon";

grant select on table "public"."business_location_job_timesheets" to "anon";

grant trigger on table "public"."business_location_job_timesheets" to "anon";

grant truncate on table "public"."business_location_job_timesheets" to "anon";

grant update on table "public"."business_location_job_timesheets" to "anon";

grant delete on table "public"."business_location_job_timesheets" to "authenticated";

grant insert on table "public"."business_location_job_timesheets" to "authenticated";

grant references on table "public"."business_location_job_timesheets" to "authenticated";

grant select on table "public"."business_location_job_timesheets" to "authenticated";

grant trigger on table "public"."business_location_job_timesheets" to "authenticated";

grant truncate on table "public"."business_location_job_timesheets" to "authenticated";

grant update on table "public"."business_location_job_timesheets" to "authenticated";

grant delete on table "public"."business_location_job_timesheets" to "service_role";

grant insert on table "public"."business_location_job_timesheets" to "service_role";

grant references on table "public"."business_location_job_timesheets" to "service_role";

grant select on table "public"."business_location_job_timesheets" to "service_role";

grant trigger on table "public"."business_location_job_timesheets" to "service_role";

grant truncate on table "public"."business_location_job_timesheets" to "service_role";

grant update on table "public"."business_location_job_timesheets" to "service_role";

create policy "Enable all actions for business admin"
on "public"."business_location_job_timesheets"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'admin'::text));


create policy "Enable all actions for business managers"
on "public"."business_location_job_timesheets"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'manager'::text));


create policy "Enable all actions for global admin"
on "public"."business_location_job_timesheets"
as permissive
for all
to authenticated
using (is_global_admin());


create policy "Enable all actions for location admins"
on "public"."business_location_job_timesheets"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'admin'::text));


create policy "Enable all actions for location manager"
on "public"."business_location_job_timesheets"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'manager'::text));


create policy "Enable delete if profile_id matches"
on "public"."business_location_job_timesheets"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = profile_id));


create policy "Enable insert for job profile"
on "public"."business_location_job_timesheets"
as permissive
for insert
to authenticated
with check (has_job_profile(job_id));


create policy "Enable select if profile_id matches"
on "public"."business_location_job_timesheets"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = profile_id));


create policy "Enable update if profile_id matches"
on "public"."business_location_job_timesheets"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = profile_id));



