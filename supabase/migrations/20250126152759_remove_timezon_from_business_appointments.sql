alter table "public"."business_appointments" alter column "end_datetime" set data type timestamp without time zone using "end_datetime"::timestamp without time zone;

alter table "public"."business_appointments" alter column "start_datetime" set data type timestamp without time zone using "start_datetime"::timestamp without time zone;


