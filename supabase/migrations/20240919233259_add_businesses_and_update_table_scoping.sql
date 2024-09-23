drop policy "Enable all access for creators" on "public"."location_leads";

drop policy "Enable insert for location employees" on "public"."location_leads";

drop policy "Enable all actions for global admins" on "public"."location_profiles";

drop policy "Enable read access for all users" on "public"."location_profiles";

drop policy "Enable all actions for global admins" on "public"."locations";

drop policy "Enable read access for location profiles" on "public"."locations";

revoke delete on table "public"."custom_fields" from "anon";

revoke insert on table "public"."custom_fields" from "anon";

revoke references on table "public"."custom_fields" from "anon";

revoke select on table "public"."custom_fields" from "anon";

revoke trigger on table "public"."custom_fields" from "anon";

revoke truncate on table "public"."custom_fields" from "anon";

revoke update on table "public"."custom_fields" from "anon";

revoke delete on table "public"."custom_fields" from "authenticated";

revoke insert on table "public"."custom_fields" from "authenticated";

revoke references on table "public"."custom_fields" from "authenticated";

revoke select on table "public"."custom_fields" from "authenticated";

revoke trigger on table "public"."custom_fields" from "authenticated";

revoke truncate on table "public"."custom_fields" from "authenticated";

revoke update on table "public"."custom_fields" from "authenticated";

revoke delete on table "public"."custom_fields" from "service_role";

revoke insert on table "public"."custom_fields" from "service_role";

revoke references on table "public"."custom_fields" from "service_role";

revoke select on table "public"."custom_fields" from "service_role";

revoke trigger on table "public"."custom_fields" from "service_role";

revoke truncate on table "public"."custom_fields" from "service_role";

revoke update on table "public"."custom_fields" from "service_role";

revoke delete on table "public"."location_lead_custom_fields" from "anon";

revoke insert on table "public"."location_lead_custom_fields" from "anon";

revoke references on table "public"."location_lead_custom_fields" from "anon";

revoke select on table "public"."location_lead_custom_fields" from "anon";

revoke trigger on table "public"."location_lead_custom_fields" from "anon";

revoke truncate on table "public"."location_lead_custom_fields" from "anon";

revoke update on table "public"."location_lead_custom_fields" from "anon";

revoke delete on table "public"."location_lead_custom_fields" from "authenticated";

revoke insert on table "public"."location_lead_custom_fields" from "authenticated";

revoke references on table "public"."location_lead_custom_fields" from "authenticated";

revoke select on table "public"."location_lead_custom_fields" from "authenticated";

revoke trigger on table "public"."location_lead_custom_fields" from "authenticated";

revoke truncate on table "public"."location_lead_custom_fields" from "authenticated";

revoke update on table "public"."location_lead_custom_fields" from "authenticated";

revoke delete on table "public"."location_lead_custom_fields" from "service_role";

revoke insert on table "public"."location_lead_custom_fields" from "service_role";

revoke references on table "public"."location_lead_custom_fields" from "service_role";

revoke select on table "public"."location_lead_custom_fields" from "service_role";

revoke trigger on table "public"."location_lead_custom_fields" from "service_role";

revoke truncate on table "public"."location_lead_custom_fields" from "service_role";

revoke update on table "public"."location_lead_custom_fields" from "service_role";

revoke delete on table "public"."location_leads" from "anon";

revoke insert on table "public"."location_leads" from "anon";

revoke references on table "public"."location_leads" from "anon";

revoke select on table "public"."location_leads" from "anon";

revoke trigger on table "public"."location_leads" from "anon";

revoke truncate on table "public"."location_leads" from "anon";

revoke update on table "public"."location_leads" from "anon";

revoke delete on table "public"."location_leads" from "authenticated";

revoke insert on table "public"."location_leads" from "authenticated";

revoke references on table "public"."location_leads" from "authenticated";

revoke select on table "public"."location_leads" from "authenticated";

revoke trigger on table "public"."location_leads" from "authenticated";

revoke truncate on table "public"."location_leads" from "authenticated";

revoke update on table "public"."location_leads" from "authenticated";

revoke delete on table "public"."location_leads" from "service_role";

revoke insert on table "public"."location_leads" from "service_role";

revoke references on table "public"."location_leads" from "service_role";

revoke select on table "public"."location_leads" from "service_role";

revoke trigger on table "public"."location_leads" from "service_role";

revoke truncate on table "public"."location_leads" from "service_role";

revoke update on table "public"."location_leads" from "service_role";

revoke delete on table "public"."location_profiles" from "anon";

revoke insert on table "public"."location_profiles" from "anon";

revoke references on table "public"."location_profiles" from "anon";

revoke select on table "public"."location_profiles" from "anon";

revoke trigger on table "public"."location_profiles" from "anon";

revoke truncate on table "public"."location_profiles" from "anon";

revoke update on table "public"."location_profiles" from "anon";

revoke delete on table "public"."location_profiles" from "authenticated";

revoke insert on table "public"."location_profiles" from "authenticated";

revoke references on table "public"."location_profiles" from "authenticated";

revoke select on table "public"."location_profiles" from "authenticated";

revoke trigger on table "public"."location_profiles" from "authenticated";

revoke truncate on table "public"."location_profiles" from "authenticated";

revoke update on table "public"."location_profiles" from "authenticated";

revoke delete on table "public"."location_profiles" from "service_role";

revoke insert on table "public"."location_profiles" from "service_role";

revoke references on table "public"."location_profiles" from "service_role";

revoke select on table "public"."location_profiles" from "service_role";

revoke trigger on table "public"."location_profiles" from "service_role";

revoke truncate on table "public"."location_profiles" from "service_role";

revoke update on table "public"."location_profiles" from "service_role";

revoke delete on table "public"."locations" from "anon";

revoke insert on table "public"."locations" from "anon";

revoke references on table "public"."locations" from "anon";

revoke select on table "public"."locations" from "anon";

revoke trigger on table "public"."locations" from "anon";

revoke truncate on table "public"."locations" from "anon";

revoke update on table "public"."locations" from "anon";

revoke delete on table "public"."locations" from "authenticated";

revoke insert on table "public"."locations" from "authenticated";

revoke references on table "public"."locations" from "authenticated";

revoke select on table "public"."locations" from "authenticated";

revoke trigger on table "public"."locations" from "authenticated";

revoke truncate on table "public"."locations" from "authenticated";

revoke update on table "public"."locations" from "authenticated";

revoke delete on table "public"."locations" from "service_role";

revoke insert on table "public"."locations" from "service_role";

revoke references on table "public"."locations" from "service_role";

revoke select on table "public"."locations" from "service_role";

revoke trigger on table "public"."locations" from "service_role";

revoke truncate on table "public"."locations" from "service_role";

revoke update on table "public"."locations" from "service_role";

alter table "public"."location_lead_custom_fields" drop constraint "lead_custom_fields_custom_field_id_fkey";

alter table "public"."location_lead_custom_fields" drop constraint "lead_custom_fields_lead_id_fkey";

alter table "public"."location_leads" drop constraint "leads_location_id_fkey";

alter table "public"."location_leads" drop constraint "leads_profile_id_fkey";

alter table "public"."location_profiles" drop constraint "location_profiles_location_id_fkey";

alter table "public"."location_profiles" drop constraint "location_profiles_profile_id_fkey";

alter table "public"."locations" drop constraint "locations_name_key";

alter table "public"."custom_fields" drop constraint "custom_fields_pkey";

alter table "public"."location_lead_custom_fields" drop constraint "lead_custom_fields_pkey";

alter table "public"."location_leads" drop constraint "leads_pkey";

alter table "public"."location_profiles" drop constraint "location_profiles_pkey";

alter table "public"."locations" drop constraint "locations_pkey";

drop index if exists "public"."lead_custom_fields_pkey";

drop index if exists "public"."custom_fields_pkey";

drop index if exists "public"."leads_pkey";

drop index if exists "public"."location_profiles_pkey";

drop index if exists "public"."locations_name_key";

drop index if exists "public"."locations_pkey";

drop table "public"."custom_fields";

drop table "public"."location_lead_custom_fields";

drop table "public"."location_leads";

drop table "public"."location_profiles";

drop table "public"."locations";

create table "public"."business_custom_fields" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "label" text not null,
    "model" custom_field_models not null,
    "type" custom_field_types not null,
    "business_id" uuid not null
);


alter table "public"."business_custom_fields" enable row level security;

create table "public"."business_location_lead_custom_fields" (
    "created_at" timestamp with time zone not null default now(),
    "lead_id" bigint not null,
    "custom_field_id" bigint not null,
    "value" text not null,
    "business_id" uuid not null
);


alter table "public"."business_location_lead_custom_fields" enable row level security;

create table "public"."business_location_leads" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "creator_id" uuid not null,
    "budget" bigint,
    "status" lead_statuses not null default 'new'::lead_statuses,
    "source" lead_sources not null default 'other'::lead_sources,
    "score" smallint not null default '1'::smallint,
    "custom_fields" jsonb,
    "location_id" bigint not null,
    "address" text,
    "city" text,
    "state" text,
    "postal_code" text,
    "type" lead_type,
    "completion_date" date,
    "follow_up_date" date,
    "notes" text,
    "phone" text,
    "email" text,
    "business_id" uuid
);


alter table "public"."business_location_leads" enable row level security;

create table "public"."business_location_profiles" (
    "created_at" timestamp with time zone not null default now(),
    "location_id" bigint not null,
    "profile_id" uuid not null,
    "role" location_profile_roles not null default 'base'::location_profile_roles,
    "commission_rate" double precision default '0.1'::double precision,
    "business_id" uuid not null
);


alter table "public"."business_location_profiles" enable row level security;

create table "public"."business_locations" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "address" text,
    "address2" text,
    "city" text,
    "state" text,
    "postal_code" text,
    "business_id" uuid not null
);


alter table "public"."business_locations" enable row level security;

create table "public"."businesses" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "logo" text,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."businesses" enable row level security;

CREATE UNIQUE INDEX business_location_lead_custom_fields_pkey ON public.business_location_lead_custom_fields USING btree (lead_id, custom_field_id, business_id);

CREATE UNIQUE INDEX businesses_pkey ON public.businesses USING btree (id);

CREATE UNIQUE INDEX custom_fields_pkey ON public.business_custom_fields USING btree (id);

CREATE UNIQUE INDEX leads_pkey ON public.business_location_leads USING btree (id);

CREATE UNIQUE INDEX location_profiles_pkey ON public.business_location_profiles USING btree (location_id, profile_id);

CREATE UNIQUE INDEX locations_name_key ON public.business_locations USING btree (name);

CREATE UNIQUE INDEX locations_pkey ON public.business_locations USING btree (id);

alter table "public"."business_custom_fields" add constraint "custom_fields_pkey" PRIMARY KEY using index "custom_fields_pkey";

alter table "public"."business_location_lead_custom_fields" add constraint "business_location_lead_custom_fields_pkey" PRIMARY KEY using index "business_location_lead_custom_fields_pkey";

alter table "public"."business_location_leads" add constraint "leads_pkey" PRIMARY KEY using index "leads_pkey";

alter table "public"."business_location_profiles" add constraint "location_profiles_pkey" PRIMARY KEY using index "location_profiles_pkey";

alter table "public"."business_locations" add constraint "locations_pkey" PRIMARY KEY using index "locations_pkey";

alter table "public"."businesses" add constraint "businesses_pkey" PRIMARY KEY using index "businesses_pkey";

alter table "public"."business_custom_fields" add constraint "business_custom_fields_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_custom_fields" validate constraint "business_custom_fields_business_id_fkey";

alter table "public"."business_location_lead_custom_fields" add constraint "business_location_lead_custom_fields_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_lead_custom_fields" validate constraint "business_location_lead_custom_fields_business_id_fkey";

alter table "public"."business_location_lead_custom_fields" add constraint "lead_custom_fields_custom_field_id_fkey" FOREIGN KEY (custom_field_id) REFERENCES business_custom_fields(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_lead_custom_fields" validate constraint "lead_custom_fields_custom_field_id_fkey";

alter table "public"."business_location_lead_custom_fields" add constraint "lead_custom_fields_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES business_location_leads(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_lead_custom_fields" validate constraint "lead_custom_fields_lead_id_fkey";

alter table "public"."business_location_leads" add constraint "leads_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_leads" validate constraint "leads_location_id_fkey";

alter table "public"."business_location_leads" add constraint "leads_profile_id_fkey" FOREIGN KEY (creator_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_leads" validate constraint "leads_profile_id_fkey";

alter table "public"."business_location_leads" add constraint "location_leads_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_leads" validate constraint "location_leads_business_id_fkey";

alter table "public"."business_location_profiles" add constraint "business_location_profiles_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_profiles" validate constraint "business_location_profiles_business_id_fkey";

alter table "public"."business_location_profiles" add constraint "location_profiles_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_profiles" validate constraint "location_profiles_location_id_fkey";

alter table "public"."business_location_profiles" add constraint "location_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_profiles" validate constraint "location_profiles_profile_id_fkey";

alter table "public"."business_locations" add constraint "business_locations_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_locations" validate constraint "business_locations_business_id_fkey";

alter table "public"."business_locations" add constraint "locations_name_key" UNIQUE using index "locations_name_key";

grant delete on table "public"."business_custom_fields" to "anon";

grant insert on table "public"."business_custom_fields" to "anon";

grant references on table "public"."business_custom_fields" to "anon";

grant select on table "public"."business_custom_fields" to "anon";

grant trigger on table "public"."business_custom_fields" to "anon";

grant truncate on table "public"."business_custom_fields" to "anon";

grant update on table "public"."business_custom_fields" to "anon";

grant delete on table "public"."business_custom_fields" to "authenticated";

grant insert on table "public"."business_custom_fields" to "authenticated";

grant references on table "public"."business_custom_fields" to "authenticated";

grant select on table "public"."business_custom_fields" to "authenticated";

grant trigger on table "public"."business_custom_fields" to "authenticated";

grant truncate on table "public"."business_custom_fields" to "authenticated";

grant update on table "public"."business_custom_fields" to "authenticated";

grant delete on table "public"."business_custom_fields" to "service_role";

grant insert on table "public"."business_custom_fields" to "service_role";

grant references on table "public"."business_custom_fields" to "service_role";

grant select on table "public"."business_custom_fields" to "service_role";

grant trigger on table "public"."business_custom_fields" to "service_role";

grant truncate on table "public"."business_custom_fields" to "service_role";

grant update on table "public"."business_custom_fields" to "service_role";

grant delete on table "public"."business_location_lead_custom_fields" to "anon";

grant insert on table "public"."business_location_lead_custom_fields" to "anon";

grant references on table "public"."business_location_lead_custom_fields" to "anon";

grant select on table "public"."business_location_lead_custom_fields" to "anon";

grant trigger on table "public"."business_location_lead_custom_fields" to "anon";

grant truncate on table "public"."business_location_lead_custom_fields" to "anon";

grant update on table "public"."business_location_lead_custom_fields" to "anon";

grant delete on table "public"."business_location_lead_custom_fields" to "authenticated";

grant insert on table "public"."business_location_lead_custom_fields" to "authenticated";

grant references on table "public"."business_location_lead_custom_fields" to "authenticated";

grant select on table "public"."business_location_lead_custom_fields" to "authenticated";

grant trigger on table "public"."business_location_lead_custom_fields" to "authenticated";

grant truncate on table "public"."business_location_lead_custom_fields" to "authenticated";

grant update on table "public"."business_location_lead_custom_fields" to "authenticated";

grant delete on table "public"."business_location_lead_custom_fields" to "service_role";

grant insert on table "public"."business_location_lead_custom_fields" to "service_role";

grant references on table "public"."business_location_lead_custom_fields" to "service_role";

grant select on table "public"."business_location_lead_custom_fields" to "service_role";

grant trigger on table "public"."business_location_lead_custom_fields" to "service_role";

grant truncate on table "public"."business_location_lead_custom_fields" to "service_role";

grant update on table "public"."business_location_lead_custom_fields" to "service_role";

grant delete on table "public"."business_location_leads" to "anon";

grant insert on table "public"."business_location_leads" to "anon";

grant references on table "public"."business_location_leads" to "anon";

grant select on table "public"."business_location_leads" to "anon";

grant trigger on table "public"."business_location_leads" to "anon";

grant truncate on table "public"."business_location_leads" to "anon";

grant update on table "public"."business_location_leads" to "anon";

grant delete on table "public"."business_location_leads" to "authenticated";

grant insert on table "public"."business_location_leads" to "authenticated";

grant references on table "public"."business_location_leads" to "authenticated";

grant select on table "public"."business_location_leads" to "authenticated";

grant trigger on table "public"."business_location_leads" to "authenticated";

grant truncate on table "public"."business_location_leads" to "authenticated";

grant update on table "public"."business_location_leads" to "authenticated";

grant delete on table "public"."business_location_leads" to "service_role";

grant insert on table "public"."business_location_leads" to "service_role";

grant references on table "public"."business_location_leads" to "service_role";

grant select on table "public"."business_location_leads" to "service_role";

grant trigger on table "public"."business_location_leads" to "service_role";

grant truncate on table "public"."business_location_leads" to "service_role";

grant update on table "public"."business_location_leads" to "service_role";

grant delete on table "public"."business_location_profiles" to "anon";

grant insert on table "public"."business_location_profiles" to "anon";

grant references on table "public"."business_location_profiles" to "anon";

grant select on table "public"."business_location_profiles" to "anon";

grant trigger on table "public"."business_location_profiles" to "anon";

grant truncate on table "public"."business_location_profiles" to "anon";

grant update on table "public"."business_location_profiles" to "anon";

grant delete on table "public"."business_location_profiles" to "authenticated";

grant insert on table "public"."business_location_profiles" to "authenticated";

grant references on table "public"."business_location_profiles" to "authenticated";

grant select on table "public"."business_location_profiles" to "authenticated";

grant trigger on table "public"."business_location_profiles" to "authenticated";

grant truncate on table "public"."business_location_profiles" to "authenticated";

grant update on table "public"."business_location_profiles" to "authenticated";

grant delete on table "public"."business_location_profiles" to "service_role";

grant insert on table "public"."business_location_profiles" to "service_role";

grant references on table "public"."business_location_profiles" to "service_role";

grant select on table "public"."business_location_profiles" to "service_role";

grant trigger on table "public"."business_location_profiles" to "service_role";

grant truncate on table "public"."business_location_profiles" to "service_role";

grant update on table "public"."business_location_profiles" to "service_role";

grant delete on table "public"."business_locations" to "anon";

grant insert on table "public"."business_locations" to "anon";

grant references on table "public"."business_locations" to "anon";

grant select on table "public"."business_locations" to "anon";

grant trigger on table "public"."business_locations" to "anon";

grant truncate on table "public"."business_locations" to "anon";

grant update on table "public"."business_locations" to "anon";

grant delete on table "public"."business_locations" to "authenticated";

grant insert on table "public"."business_locations" to "authenticated";

grant references on table "public"."business_locations" to "authenticated";

grant select on table "public"."business_locations" to "authenticated";

grant trigger on table "public"."business_locations" to "authenticated";

grant truncate on table "public"."business_locations" to "authenticated";

grant update on table "public"."business_locations" to "authenticated";

grant delete on table "public"."business_locations" to "service_role";

grant insert on table "public"."business_locations" to "service_role";

grant references on table "public"."business_locations" to "service_role";

grant select on table "public"."business_locations" to "service_role";

grant trigger on table "public"."business_locations" to "service_role";

grant truncate on table "public"."business_locations" to "service_role";

grant update on table "public"."business_locations" to "service_role";

grant delete on table "public"."businesses" to "anon";

grant insert on table "public"."businesses" to "anon";

grant references on table "public"."businesses" to "anon";

grant select on table "public"."businesses" to "anon";

grant trigger on table "public"."businesses" to "anon";

grant truncate on table "public"."businesses" to "anon";

grant update on table "public"."businesses" to "anon";

grant delete on table "public"."businesses" to "authenticated";

grant insert on table "public"."businesses" to "authenticated";

grant references on table "public"."businesses" to "authenticated";

grant select on table "public"."businesses" to "authenticated";

grant trigger on table "public"."businesses" to "authenticated";

grant truncate on table "public"."businesses" to "authenticated";

grant update on table "public"."businesses" to "authenticated";

grant delete on table "public"."businesses" to "service_role";

grant insert on table "public"."businesses" to "service_role";

grant references on table "public"."businesses" to "service_role";

grant select on table "public"."businesses" to "service_role";

grant trigger on table "public"."businesses" to "service_role";

grant truncate on table "public"."businesses" to "service_role";

grant update on table "public"."businesses" to "service_role";

create policy "Enable all access for creators"
on "public"."business_location_leads"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = creator_id));


create policy "Enable insert for location employees"
on "public"."business_location_leads"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) IN ( SELECT business_location_profiles.profile_id
   FROM business_location_profiles
  WHERE (business_location_profiles.location_id = business_location_leads.location_id))));


create policy "Enable all actions for global admins"
on "public"."business_location_profiles"
as permissive
for all
to public
using (is_global_admin());


create policy "Enable read access for all users"
on "public"."business_location_profiles"
as permissive
for select
to authenticated
using (true);


create policy "Enable all actions for global admins"
on "public"."business_locations"
as permissive
for all
to public
using (is_global_admin());


create policy "Enable read access for location profiles"
on "public"."business_locations"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) IN ( SELECT business_location_profiles.profile_id
   FROM business_location_profiles
  WHERE (business_location_profiles.location_id = business_locations.id))));



