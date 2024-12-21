alter table "public"."business_location_customers" add column "creator_id" uuid;

alter table "public"."business_location_customers" add constraint "business_location_customers_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."business_location_customers" validate constraint "business_location_customers_creator_id_fkey";


