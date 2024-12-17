alter table "public"."business_location_job_products" alter column "total_price" drop not null;

alter table "public"."business_location_job_products" alter column "unit_price" drop not null;

alter table "public"."business_products" alter column "lead_price" drop not null;

alter table "public"."business_products" alter column "unit" drop not null;

alter table "public"."business_products" alter column "unit_price" drop not null;


