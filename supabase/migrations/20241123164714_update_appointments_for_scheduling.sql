alter table "public"."business_location_job_appointments" drop constraint "business_locations_job_events_business_id_fkey";

alter table "public"."business_location_job_appointments" drop constraint "business_locations_job_events_job_id_fkey";

alter table "public"."business_location_job_appointments" drop constraint "business_locations_job_events_location_id_fkey";

alter table "public"."business_location_job_appointments" add constraint "business_location_job_appointments_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointments" validate constraint "business_location_job_appointments_business_id_fkey";

alter table "public"."business_location_job_appointments" add constraint "business_location_job_appointments_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business_location_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointments" validate constraint "business_location_job_appointments_job_id_fkey";

alter table "public"."business_location_job_appointments" add constraint "business_location_job_appointments_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointments" validate constraint "business_location_job_appointments_location_id_fkey";


