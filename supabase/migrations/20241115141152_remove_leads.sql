revoke delete on table "public"."business_location_lead_custom_fields" from "anon";

revoke insert on table "public"."business_location_lead_custom_fields" from "anon";

revoke references on table "public"."business_location_lead_custom_fields" from "anon";

revoke select on table "public"."business_location_lead_custom_fields" from "anon";

revoke trigger on table "public"."business_location_lead_custom_fields" from "anon";

revoke truncate on table "public"."business_location_lead_custom_fields" from "anon";

revoke update on table "public"."business_location_lead_custom_fields" from "anon";

revoke delete on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke insert on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke references on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke select on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke trigger on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke truncate on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke update on table "public"."business_location_lead_custom_fields" from "authenticated";

revoke delete on table "public"."business_location_lead_custom_fields" from "service_role";

revoke insert on table "public"."business_location_lead_custom_fields" from "service_role";

revoke references on table "public"."business_location_lead_custom_fields" from "service_role";

revoke select on table "public"."business_location_lead_custom_fields" from "service_role";

revoke trigger on table "public"."business_location_lead_custom_fields" from "service_role";

revoke truncate on table "public"."business_location_lead_custom_fields" from "service_role";

revoke update on table "public"."business_location_lead_custom_fields" from "service_role";

revoke delete on table "public"."business_location_leads" from "anon";

revoke insert on table "public"."business_location_leads" from "anon";

revoke references on table "public"."business_location_leads" from "anon";

revoke select on table "public"."business_location_leads" from "anon";

revoke trigger on table "public"."business_location_leads" from "anon";

revoke truncate on table "public"."business_location_leads" from "anon";

revoke update on table "public"."business_location_leads" from "anon";

revoke delete on table "public"."business_location_leads" from "authenticated";

revoke insert on table "public"."business_location_leads" from "authenticated";

revoke references on table "public"."business_location_leads" from "authenticated";

revoke select on table "public"."business_location_leads" from "authenticated";

revoke trigger on table "public"."business_location_leads" from "authenticated";

revoke truncate on table "public"."business_location_leads" from "authenticated";

revoke update on table "public"."business_location_leads" from "authenticated";

revoke delete on table "public"."business_location_leads" from "service_role";

revoke insert on table "public"."business_location_leads" from "service_role";

revoke references on table "public"."business_location_leads" from "service_role";

revoke select on table "public"."business_location_leads" from "service_role";

revoke trigger on table "public"."business_location_leads" from "service_role";

revoke truncate on table "public"."business_location_leads" from "service_role";

revoke update on table "public"."business_location_leads" from "service_role";

alter table "public"."business_location_lead_custom_fields" drop constraint "business_location_lead_custom_fields_business_id_fkey";

alter table "public"."business_location_lead_custom_fields" drop constraint "lead_custom_fields_custom_field_id_fkey";

alter table "public"."business_location_lead_custom_fields" drop constraint "lead_custom_fields_lead_id_fkey";

alter table "public"."business_location_leads" drop constraint "leads_location_id_fkey";

alter table "public"."business_location_leads" drop constraint "leads_profile_id_fkey";

alter table "public"."business_location_leads" drop constraint "location_leads_business_id_fkey";

alter table "public"."business_location_lead_custom_fields" drop constraint "business_location_lead_custom_fields_pkey";

alter table "public"."business_location_leads" drop constraint "leads_pkey";

drop index if exists "public"."business_location_lead_custom_fields_pkey";

drop index if exists "public"."leads_pkey";

drop table "public"."business_location_lead_custom_fields";

drop table "public"."business_location_leads";

drop type "public"."lead_sources";

drop type "public"."lead_type";


