alter table "public"."business_products" add column "lead_price" double precision not null default '0'::double precision;

alter table "public"."business_products" alter column "business_id" set not null;


