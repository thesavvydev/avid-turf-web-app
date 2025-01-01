alter table "public"."business_location_customers" add column "address" text;

alter table "public"."business_location_customers" add column "city" text;

alter table "public"."business_location_customers" add column "closer_id" uuid;

alter table "public"."business_location_customers" add column "disposition_status" text;

alter table "public"."business_location_customers" add column "lead_source" text;

alter table "public"."business_location_customers" add column "notes" text;

alter table "public"."business_location_customers" add column "postal_code" text;

alter table "public"."business_location_customers" add column "state" text;

alter table "public"."business_location_customers" add constraint "business_location_customers_closer_id_fkey" FOREIGN KEY (closer_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."business_location_customers" validate constraint "business_location_customers_closer_id_fkey";


