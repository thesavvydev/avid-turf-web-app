alter table "public"."business_location_job_appointment_profiles" drop constraint "business_location_job_event_profiles_business_id_fkey";

alter table "public"."business_location_job_appointment_profiles" drop constraint "business_location_job_event_profiles_event_id_fkey";

alter table "public"."business_location_job_appointment_profiles" drop constraint "business_location_job_event_profiles_job_id_fkey";

alter table "public"."business_location_job_appointment_profiles" drop constraint "business_location_job_event_profiles_location_id_fkey";

alter table "public"."business_location_job_appointment_profiles" drop constraint "business_location_job_event_profiles_profile_id_fkey";

alter table "public"."business_location_job_appointment_profiles" add constraint "business_location_job_appointment_profiles_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointment_profiles" validate constraint "business_location_job_appointment_profiles_business_id_fkey";

alter table "public"."business_location_job_appointment_profiles" add constraint "business_location_job_appointment_profiles_job_id_fkey" FOREIGN KEY (job_id) REFERENCES business_location_jobs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointment_profiles" validate constraint "business_location_job_appointment_profiles_job_id_fkey";

alter table "public"."business_location_job_appointment_profiles" add constraint "business_location_job_appointment_profiles_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointment_profiles" validate constraint "business_location_job_appointment_profiles_location_id_fkey";

alter table "public"."business_location_job_appointment_profiles" add constraint "business_location_job_appointment_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_location_job_appointment_profiles" validate constraint "business_location_job_appointment_profiles_profile_id_fkey";


