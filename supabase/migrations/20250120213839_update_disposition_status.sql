alter table "public"."business_location_customers" alter column "disposition_status" set default 'NEW'::text;

alter table "public"."business_location_profiles" add column "closer_priority" bigint not null default '99999'::bigint;


