alter table "public"."business_location_jobs" add column "customer_id" bigint;

alter table "public"."business_location_jobs" add constraint "business_location_jobs_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES business_location_customers(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."business_location_jobs" validate constraint "business_location_jobs_customer_id_fkey";


