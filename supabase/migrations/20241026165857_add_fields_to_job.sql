create type "public"."job_types" as enum ('turf', 'desert', 'both');

alter table "public"."business_location_job_profiles" alter column "role" drop default;

alter type "public"."job_roles" rename to "job_roles__old_version_to_be_dropped";

create type "public"."job_roles" as enum ('setter', 'installer', 'closer', 'project_manager', 'crew_lead');

alter table "public"."business_location_job_profiles" alter column role type "public"."job_roles" using role::text::"public"."job_roles";

alter table "public"."business_location_job_profiles" alter column "role" set default 'setter'::job_roles;

drop type "public"."job_roles__old_version_to_be_dropped";

alter table "public"."business_location_jobs" add column "down_payment_collected" double precision default '0'::double precision;

alter table "public"."business_location_jobs" add column "financing" boolean not null default false;

alter table "public"."business_location_jobs" add column "price_per_sq_ft" double precision;

alter table "public"."business_location_jobs" add column "total_cost" double precision;

alter table "public"."business_location_jobs" add column "total_sq_ft" double precision;

alter table "public"."business_location_jobs" add column "type" job_types not null default 'turf'::job_types;
