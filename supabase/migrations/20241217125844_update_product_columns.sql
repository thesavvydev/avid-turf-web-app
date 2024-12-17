alter table "public"."business_location_job_products" drop column "lead_price_addon";

alter table "public"."business_location_job_products" add column "lead_price" double precision default '0'::double precision;

alter table "public"."business_location_job_products" add column "unit_price" double precision not null default '0'::double precision;

alter table "public"."business_products" drop column "measurement";

alter table "public"."business_products" drop column "price_per_measurement";

alter table "public"."business_products" add column "unit" text not null default 'sq ft'::text;

alter table "public"."business_products" add column "unit_price" double precision not null;


