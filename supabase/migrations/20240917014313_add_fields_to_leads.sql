create type "public"."lead_type" as enum ('new', 'remodel', 'maintenance');

alter table "public"."location_leads" add column "address" text;

alter table "public"."location_leads" add column "city" text;

alter table "public"."location_leads" add column "completion_date" date;

alter table "public"."location_leads" add column "email" text;

alter table "public"."location_leads" add column "follow_up_date" date;

alter table "public"."location_leads" add column "notes" text;

alter table "public"."location_leads" add column "phone" text;

alter table "public"."location_leads" add column "postal_code" text;

alter table "public"."location_leads" add column "state" text;

alter table "public"."location_leads" add column "type" lead_type;


