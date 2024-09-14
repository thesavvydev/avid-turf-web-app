alter table "public"."leads" drop constraint "leads_customer_profile_id_fkey";

create table "public"."lead_custom_fields" (
    "created_at" timestamp with time zone not null default now(),
    "lead_id" bigint not null,
    "custom_field_id" bigint not null,
    "value" text not null
);


alter table "public"."lead_custom_fields" enable row level security;

alter table "public"."leads" drop column "customer_id";

CREATE UNIQUE INDEX lead_custom_fields_pkey ON public.lead_custom_fields USING btree (lead_id, custom_field_id);

alter table "public"."lead_custom_fields" add constraint "lead_custom_fields_pkey" PRIMARY KEY using index "lead_custom_fields_pkey";

alter table "public"."lead_custom_fields" add constraint "lead_custom_fields_custom_field_id_fkey" FOREIGN KEY (custom_field_id) REFERENCES custom_fields(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lead_custom_fields" validate constraint "lead_custom_fields_custom_field_id_fkey";

alter table "public"."lead_custom_fields" add constraint "lead_custom_fields_lead_id_fkey" FOREIGN KEY (lead_id) REFERENCES leads(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."lead_custom_fields" validate constraint "lead_custom_fields_lead_id_fkey";

grant delete on table "public"."lead_custom_fields" to "anon";

grant insert on table "public"."lead_custom_fields" to "anon";

grant references on table "public"."lead_custom_fields" to "anon";

grant select on table "public"."lead_custom_fields" to "anon";

grant trigger on table "public"."lead_custom_fields" to "anon";

grant truncate on table "public"."lead_custom_fields" to "anon";

grant update on table "public"."lead_custom_fields" to "anon";

grant delete on table "public"."lead_custom_fields" to "authenticated";

grant insert on table "public"."lead_custom_fields" to "authenticated";

grant references on table "public"."lead_custom_fields" to "authenticated";

grant select on table "public"."lead_custom_fields" to "authenticated";

grant trigger on table "public"."lead_custom_fields" to "authenticated";

grant truncate on table "public"."lead_custom_fields" to "authenticated";

grant update on table "public"."lead_custom_fields" to "authenticated";

grant delete on table "public"."lead_custom_fields" to "service_role";

grant insert on table "public"."lead_custom_fields" to "service_role";

grant references on table "public"."lead_custom_fields" to "service_role";

grant select on table "public"."lead_custom_fields" to "service_role";

grant trigger on table "public"."lead_custom_fields" to "service_role";

grant truncate on table "public"."lead_custom_fields" to "service_role";

grant update on table "public"."lead_custom_fields" to "service_role";


