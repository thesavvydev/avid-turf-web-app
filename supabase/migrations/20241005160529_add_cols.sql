create type "public"."business_roles" as enum ('admin', 'manager', 'base');

alter table "public"."business_profiles" add column "role" business_roles not null default 'base'::business_roles;


