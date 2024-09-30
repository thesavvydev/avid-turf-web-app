create table "public"."business_location_job_messages" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "author_id" uuid not null,
    "message" text not null,
    "business_id" uuid not null,
    "location_id" bigint not null,
    "job_id" bigint not null
);


alter table "public"."business_location_job_messages" enable row level security;

CREATE UNIQUE INDEX business_location_job_messages_pkey ON public.business_location_job_messages USING btree (id);

alter table "public"."business_location_job_messages" add constraint "business_location_job_messages_pkey" PRIMARY KEY using index "business_location_job_messages_pkey";

alter table "public"."business_location_job_messages" add constraint "business_location_job_messages_author_id_fkey" FOREIGN KEY (author_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_messages" validate constraint "business_location_job_messages_author_id_fkey";

alter table "public"."business_location_job_messages" add constraint "business_location_job_messages_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_messages" validate constraint "business_location_job_messages_business_id_fkey";

alter table "public"."business_location_job_messages" add constraint "business_location_job_messages_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business_location_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_messages" validate constraint "business_location_job_messages_job_id_fkey";

alter table "public"."business_location_job_messages" add constraint "business_location_job_messages_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_messages" validate constraint "business_location_job_messages_location_id_fkey";

grant delete on table "public"."business_location_job_messages" to "anon";

grant insert on table "public"."business_location_job_messages" to "anon";

grant references on table "public"."business_location_job_messages" to "anon";

grant select on table "public"."business_location_job_messages" to "anon";

grant trigger on table "public"."business_location_job_messages" to "anon";

grant truncate on table "public"."business_location_job_messages" to "anon";

grant update on table "public"."business_location_job_messages" to "anon";

grant delete on table "public"."business_location_job_messages" to "authenticated";

grant insert on table "public"."business_location_job_messages" to "authenticated";

grant references on table "public"."business_location_job_messages" to "authenticated";

grant select on table "public"."business_location_job_messages" to "authenticated";

grant trigger on table "public"."business_location_job_messages" to "authenticated";

grant truncate on table "public"."business_location_job_messages" to "authenticated";

grant update on table "public"."business_location_job_messages" to "authenticated";

grant delete on table "public"."business_location_job_messages" to "service_role";

grant insert on table "public"."business_location_job_messages" to "service_role";

grant references on table "public"."business_location_job_messages" to "service_role";

grant select on table "public"."business_location_job_messages" to "service_role";

grant trigger on table "public"."business_location_job_messages" to "service_role";

grant truncate on table "public"."business_location_job_messages" to "service_role";

grant update on table "public"."business_location_job_messages" to "service_role";

create policy "Enable insert for location employees"
on "public"."business_location_job_messages"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) IN ( SELECT business_location_profiles.profile_id
   FROM business_location_profiles
  WHERE (business_location_profiles.location_id = business_location_job_messages.location_id))));


create policy "Enable select for location employees"
on "public"."business_location_job_messages"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) IN ( SELECT business_location_profiles.profile_id
   FROM business_location_profiles
  WHERE (business_location_profiles.location_id = business_location_job_messages.location_id))));


