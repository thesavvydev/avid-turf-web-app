set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.location_business_appointments_with_closers(lid integer, start_timestamp timestamp with time zone)
 RETURNS TABLE(id bigint, start_datetime timestamp with time zone, end_datetime timestamp with time zone, name text, profile_id uuid, full_name text, location_id bigint, closer_priority bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  RETURN QUERY
WITH closer_profiles AS (
    SELECT blp.profile_id, profiles.full_name, blp.location_id, blp.closer_priority
    FROM public.business_location_profiles blp
    JOIN public.profiles profiles ON blp.profile_id = profiles.id
    WHERE blp.is_closer = true
    AND blp.location_id = LID
)
SELECT ba.id, ba.start_datetime, ba.end_datetime, ba.name, cp.*
FROM public.business_appointments ba
LEFT JOIN closer_profiles cp ON ba.location_id = cp.location_id
WHERE ba.location_id = LID
AND DATE(ba.start_datetime) = DATE(START_TIMESTAMP);
END;$function$
;


