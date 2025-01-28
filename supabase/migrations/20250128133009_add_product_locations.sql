create table "public"."business_product_locations" (
    "created_at" timestamp with time zone not null default now(),
    "product_id" bigint not null,
    "location_id" bigint not null,
    "status" smallint not null default '1'::smallint,
    "business_id" uuid not null
);


alter table "public"."business_product_locations" enable row level security;

CREATE UNIQUE INDEX business_product_locations_pkey ON public.business_product_locations USING btree (product_id, location_id, business_id);

alter table "public"."business_product_locations" add constraint "business_product_locations_pkey" PRIMARY KEY using index "business_product_locations_pkey";

alter table "public"."business_product_locations" add constraint "business_product_locations_business_id_fkey" FOREIGN KEY (business_id) REFERENCES businesses(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_product_locations" validate constraint "business_product_locations_business_id_fkey";

alter table "public"."business_product_locations" add constraint "business_product_locations_location_id_fkey" FOREIGN KEY (location_id) REFERENCES business_locations(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_product_locations" validate constraint "business_product_locations_location_id_fkey";

alter table "public"."business_product_locations" add constraint "business_product_locations_product_id_fkey" FOREIGN KEY (product_id) REFERENCES business_products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."business_product_locations" validate constraint "business_product_locations_product_id_fkey";

grant delete on table "public"."business_product_locations" to "anon";

grant insert on table "public"."business_product_locations" to "anon";

grant references on table "public"."business_product_locations" to "anon";

grant select on table "public"."business_product_locations" to "anon";

grant trigger on table "public"."business_product_locations" to "anon";

grant truncate on table "public"."business_product_locations" to "anon";

grant update on table "public"."business_product_locations" to "anon";

grant delete on table "public"."business_product_locations" to "authenticated";

grant insert on table "public"."business_product_locations" to "authenticated";

grant references on table "public"."business_product_locations" to "authenticated";

grant select on table "public"."business_product_locations" to "authenticated";

grant trigger on table "public"."business_product_locations" to "authenticated";

grant truncate on table "public"."business_product_locations" to "authenticated";

grant update on table "public"."business_product_locations" to "authenticated";

grant delete on table "public"."business_product_locations" to "service_role";

grant insert on table "public"."business_product_locations" to "service_role";

grant references on table "public"."business_product_locations" to "service_role";

grant select on table "public"."business_product_locations" to "service_role";

grant trigger on table "public"."business_product_locations" to "service_role";

grant truncate on table "public"."business_product_locations" to "service_role";

grant update on table "public"."business_product_locations" to "service_role";

create policy "Enable all actions for business admins"
on "public"."business_product_locations"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'admin'::text));


create policy "Enable all actions for business managers"
on "public"."business_product_locations"
as permissive
for all
to authenticated
using (business_profile_has_role(business_id, 'manager'::text));


create policy "Enable all actions for global admins"
on "public"."business_product_locations"
as permissive
for all
to authenticated
using (is_global_admin());


create policy "Enable select for business profiles"
on "public"."business_product_locations"
as permissive
for select
to authenticated
using (has_business_profile(business_id));



