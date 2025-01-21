alter table "public"."business_location_customers" alter column "disposition_status" set default 'NEW'::text;

alter table "public"."business_location_profiles" add column "closer_priority" bigint not null default '99999'::bigint;



CREATE OR REPLACE FUNCTION public.next_priority_closer(lid integer, start_timestamp timestamp with time zone, end_timestamp timestamp with time zone)
 RETURNS TABLE(profile_id uuid, full_name text, closer_priority bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  RETURN QUERY
    SELECT DISTINCT blp.profile_id, p.full_name, blp.closer_priority
    FROM public.business_location_profiles blp
    JOIN public.profiles p
    ON p.id = blp.profile_id
    WHERE NOT EXISTS (
        SELECT 1
        FROM public.business_appointment_profiles bap
        JOIN public.business_appointments ba
        ON ba.id = bap.appointment_id
        WHERE blp.profile_id = bap.profile_id
        AND (
            (ba.start_datetime < start_timestamp AND ba.end_datetime > start_timestamp) OR
            (ba.start_datetime < end_timestamp AND ba.end_datetime > end_timestamp) OR
            (ba.start_datetime >= start_timestamp AND ba.end_datetime <= end_timestamp)
        )
    )
    AND blp.is_closer IS TRUE
    AND blp.location_id = lid
    ORDER BY blp.closer_priority
    LIMIT 1;
END;$function$
;
