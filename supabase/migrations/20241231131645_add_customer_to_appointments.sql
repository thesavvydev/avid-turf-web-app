alter table "public"."business_appointments" add column "customer_id" bigint;

alter table "public"."business_appointments" add constraint "business_appointments_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES business_location_customers(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."business_appointments" validate constraint "business_appointments_customer_id_fkey";
