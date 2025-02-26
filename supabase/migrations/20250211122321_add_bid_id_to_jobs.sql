alter table "public"."business_location_jobs" add column "bid_id" bigint;

alter table "public"."business_location_jobs" add constraint "business_location_jobs_bid_id_fkey" FOREIGN KEY (bid_id) REFERENCES business_location_customer_bids(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."business_location_jobs" validate constraint "business_location_jobs_bid_id_fkey";


