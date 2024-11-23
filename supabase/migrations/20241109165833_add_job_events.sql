create table "public"."business_location_job_event_profiles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "business_id" uuid not null,
    "location_id" bigint not null,
    "job_id" bigint not null,
    "event_id" bigint not null,
    "profile_id" uuid not null
);


alter table "public"."business_location_job_event_profiles" enable row level security;

create table "public"."business_location_job_events" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "business_id" uuid not null,
    "location_id" bigint not null,
    "job_id" bigint not null,
    "type" text not null,
    "start_datetime" timestamp without time zone not null,
    "end_datetime" timestamp without time zone not null
);


alter table "public"."business_location_job_events" enable row level security;

CREATE UNIQUE INDEX business_location_job_event_profiles_pkey ON public.business_location_job_event_profiles USING btree (id);

CREATE UNIQUE INDEX business_locations_job_events_pkey ON public.business_location_job_events USING btree (id);

alter table "public"."business_location_job_event_profiles" add constraint "business_location_job_event_profiles_pkey" PRIMARY KEY using index "business_location_job_event_profiles_pkey";

alter table "public"."business_location_job_events" add constraint "business_locations_job_events_pkey" PRIMARY KEY using index "business_locations_job_events_pkey";

alter table "public"."business_location_job_event_profiles" add constraint "business_location_job_event_profiles_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_event_profiles" validate constraint "business_location_job_event_profiles_business_id_fkey";

alter table "public"."business_location_job_event_profiles" add constraint "business_location_job_event_profiles_event_id_fkey" FOREIGN KEY (event_id) REFERENCES business_location_job_events(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_event_profiles" validate constraint "business_location_job_event_profiles_event_id_fkey";

alter table "public"."business_location_job_event_profiles" add constraint "business_location_job_event_profiles_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business_location_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_event_profiles" validate constraint "business_location_job_event_profiles_job_id_fkey";

alter table "public"."business_location_job_event_profiles" add constraint "business_location_job_event_profiles_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_event_profiles" validate constraint "business_location_job_event_profiles_location_id_fkey";

alter table "public"."business_location_job_event_profiles" add constraint "business_location_job_event_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_event_profiles" validate constraint "business_location_job_event_profiles_profile_id_fkey";

alter table "public"."business_location_job_events" add constraint "business_locations_job_events_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_events" validate constraint "business_locations_job_events_business_id_fkey";

alter table "public"."business_location_job_events" add constraint "business_locations_job_events_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business_location_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_events" validate constraint "business_locations_job_events_job_id_fkey";

alter table "public"."business_location_job_events" add constraint "business_locations_job_events_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_events" validate constraint "business_locations_job_events_location_id_fkey";

grant delete on table "public"."business_location_job_event_profiles" to "anon";

grant insert on table "public"."business_location_job_event_profiles" to "anon";

grant references on table "public"."business_location_job_event_profiles" to "anon";

grant select on table "public"."business_location_job_event_profiles" to "anon";

grant trigger on table "public"."business_location_job_event_profiles" to "anon";

grant truncate on table "public"."business_location_job_event_profiles" to "anon";

grant update on table "public"."business_location_job_event_profiles" to "anon";

grant delete on table "public"."business_location_job_event_profiles" to "authenticated";

grant insert on table "public"."business_location_job_event_profiles" to "authenticated";

grant references on table "public"."business_location_job_event_profiles" to "authenticated";

grant select on table "public"."business_location_job_event_profiles" to "authenticated";

grant trigger on table "public"."business_location_job_event_profiles" to "authenticated";

grant truncate on table "public"."business_location_job_event_profiles" to "authenticated";

grant update on table "public"."business_location_job_event_profiles" to "authenticated";

grant delete on table "public"."business_location_job_event_profiles" to "service_role";

grant insert on table "public"."business_location_job_event_profiles" to "service_role";

grant references on table "public"."business_location_job_event_profiles" to "service_role";

grant select on table "public"."business_location_job_event_profiles" to "service_role";

grant trigger on table "public"."business_location_job_event_profiles" to "service_role";

grant truncate on table "public"."business_location_job_event_profiles" to "service_role";

grant update on table "public"."business_location_job_event_profiles" to "service_role";

grant delete on table "public"."business_location_job_events" to "anon";

grant insert on table "public"."business_location_job_events" to "anon";

grant references on table "public"."business_location_job_events" to "anon";

grant select on table "public"."business_location_job_events" to "anon";

grant trigger on table "public"."business_location_job_events" to "anon";

grant truncate on table "public"."business_location_job_events" to "anon";

grant update on table "public"."business_location_job_events" to "anon";

grant delete on table "public"."business_location_job_events" to "authenticated";

grant insert on table "public"."business_location_job_events" to "authenticated";

grant references on table "public"."business_location_job_events" to "authenticated";

grant select on table "public"."business_location_job_events" to "authenticated";

grant trigger on table "public"."business_location_job_events" to "authenticated";

grant truncate on table "public"."business_location_job_events" to "authenticated";

grant update on table "public"."business_location_job_events" to "authenticated";

grant delete on table "public"."business_location_job_events" to "service_role";

grant insert on table "public"."business_location_job_events" to "service_role";

grant references on table "public"."business_location_job_events" to "service_role";

grant select on table "public"."business_location_job_events" to "service_role";

grant trigger on table "public"."business_location_job_events" to "service_role";

grant truncate on table "public"."business_location_job_events" to "service_role";

grant update on table "public"."business_location_job_events" to "service_role";

create policy "Enable all actions for business admin"
on "public"."business_location_job_event_profiles"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'admin'::text));


create policy "Enable all actions for business managers"
on "public"."business_location_job_event_profiles"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'manager'::text));


create policy "Enable all actions for global admins"
on "public"."business_location_job_event_profiles"
as permissive
for all
to authenticated
using (is_global_admin());


create policy "Enable all actions for job profiles"
on "public"."business_location_job_event_profiles"
as permissive
for all
to authenticated
using (has_job_profile(job_id));


create policy "Enable all actions for location admin"
on "public"."business_location_job_event_profiles"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'admin'::text));


create policy "Enable all actions for location manager"
on "public"."business_location_job_event_profiles"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'manager'::text));


create policy "Enable all actions for business admin"
on "public"."business_location_job_events"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'admin'::text));


create policy "Enable all actions for business managers"
on "public"."business_location_job_events"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'manager'::text));


create policy "Enable all actions for global admins"
on "public"."business_location_job_events"
as permissive
for all
to authenticated
using (is_global_admin());


create policy "Enable all actions for job profiles"
on "public"."business_location_job_events"
as permissive
for all
to authenticated
using (has_job_profile(job_id));


create policy "Enable all actions for location admin"
on "public"."business_location_job_events"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'admin'::text));


create policy "Enable all actions for location manager"
on "public"."business_location_job_events"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'manager'::text));


