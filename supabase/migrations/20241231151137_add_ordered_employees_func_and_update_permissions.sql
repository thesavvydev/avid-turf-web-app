drop policy "Enable all actions for location manager" on "public"."business_location_profiles";

create policy "Enable all actions for location manager"
on "public"."business_location_profiles"
as permissive
for all
to authenticated
using (location_profile_has_role(location_id, 'manager'::text));


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.ordered_employees(lid integer)
 RETURNS TABLE(profile_id uuid, full_name text, latest_appointment timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  RETURN QUERY
    SELECT
        p.id AS profile_id,
        p.full_name,
        la.latest_appointment
    FROM
        business_location_profiles AS blp
    JOIN profiles AS p
        ON blp.profile_id = p.id
    LEFT JOIN (
        SELECT
            ap.profile_id,
            MAX(a.start_datetime) AS latest_appointment
        FROM
            business_appointment_profiles AS ap
        INNER JOIN
            business_appointments AS a ON ap.appointment_id = a.id
        WHERE a.location_id = lid
        AND a.customer_id IS NOT NULL
        GROUP BY
            ap.profile_id
    ) AS la
    ON la.profile_id = blp.profile_id
    WHERE blp.location_id = lid
    ORDER BY
        la.latest_appointment NULLS FIRST
    LIMIT 10;
END;$function$
;

CREATE OR REPLACE TRIGGER on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
