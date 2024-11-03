alter table "public"."business_location_jobs" drop constraint "business_location_jobs_closer_id_fkey";

alter table "public"."business_location_jobs" drop constraint "business_location_jobs_customer_id_fkey";

alter table "public"."business_location_jobs" drop constraint "business_location_jobs_installer_id_fkey";

alter table "public"."business_location_jobs" drop constraint "business_location_jobs_lead_id_fkey";

alter table "public"."business_location_jobs" drop constraint "business_location_jobs_setter_id_fkey";

alter table "public"."business_location_job_products" alter column "product_id" set not null;

alter table "public"."business_location_jobs" drop column "closer_id";

alter table "public"."business_location_jobs" drop column "customer_id";

alter table "public"."business_location_jobs" drop column "financing";

alter table "public"."business_location_jobs" drop column "installer_id";

alter table "public"."business_location_jobs" drop column "lead_id";

alter table "public"."business_location_jobs" drop column "price_per_sq_ft";

alter table "public"."business_location_jobs" drop column "setter_id";

alter table "public"."business_location_jobs" drop column "total_cost";

alter table "public"."business_location_jobs" drop column "total_sq_ft";

alter table "public"."business_location_jobs" add column "commission" double precision not null default '0'::double precision;


