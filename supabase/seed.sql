INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
  ('00000000-0000-0000-0000-000000000000', '48af521c-89dd-4c7b-9737-6e7f37c9af9a', 'authenticated', 'authenticated', 'tony@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Tony Sauvageau" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', 'b2cef185-9ff8-4b71-b36b-e8b9c373e648', 'authenticated', 'authenticated', 'badmin@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Business Admin" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '9bb4974f-865f-4d82-89d2-daff0f525065', 'authenticated', 'authenticated', 'bmanager@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Business Manager" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', 'f4acd8da-1f66-4c88-b285-4d2adba08c44', 'authenticated', 'authenticated', 'ladmin@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Location Admin" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '4106c32c-18bc-48dd-9714-729ab1168b44', 'authenticated', 'authenticated', 'lmanager@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Location Manager" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '7e15d5cf-952c-4416-85e1-465849358402', 'authenticated', 'authenticated', 'lbase@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Location Base" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
  ('00000000-0000-0000-0000-000000000000', '1480e0d8-a3ea-4e03-b370-fab96a6be4ef', 'authenticated', 'authenticated', 'l2base@example.com', '$2a$10$IQj8Ojfomgy9WlupdeYGruCG9N0YrFjsE52iit8obKE/fvWXHKZUS', '2022-10-04 03:41:27.39308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{ "full_name": "Location 2 Base" }', NULL, '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (provider_id, id,user_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
VALUES
  ('1','48af521c-89dd-4c7b-9737-6e7f37c9af9a', '48af521c-89dd-4c7b-9737-6e7f37c9af9a'::uuid, '{"sub": "48af521c-89dd-4c7b-9737-6e7f37c9af9a"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'),
  ('2','b2cef185-9ff8-4b71-b36b-e8b9c373e648', 'b2cef185-9ff8-4b71-b36b-e8b9c373e648'::uuid, '{"sub": "b2cef185-9ff8-4b71-b36b-e8b9c373e648"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'),
  ('3','9bb4974f-865f-4d82-89d2-daff0f525065', '9bb4974f-865f-4d82-89d2-daff0f525065'::uuid, '{"sub": "9bb4974f-865f-4d82-89d2-daff0f525065"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'),
  ('4','f4acd8da-1f66-4c88-b285-4d2adba08c44', 'f4acd8da-1f66-4c88-b285-4d2adba08c44'::uuid, '{"sub": "f4acd8da-1f66-4c88-b285-4d2adba08c44"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'),
  ('5','4106c32c-18bc-48dd-9714-729ab1168b44', '4106c32c-18bc-48dd-9714-729ab1168b44'::uuid, '{"sub": "4106c32c-18bc-48dd-9714-729ab1168b44"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'),
  ('6','7e15d5cf-952c-4416-85e1-465849358402', '7e15d5cf-952c-4416-85e1-465849358402'::uuid, '{"sub": "7e15d5cf-952c-4416-85e1-465849358402"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00'),
  ('7','1480e0d8-a3ea-4e03-b370-fab96a6be4ef', '1480e0d8-a3ea-4e03-b370-fab96a6be4ef'::uuid, '{"sub": "1480e0d8-a3ea-4e03-b370-fab96a6be4ef"}', 'email', '2022-10-04 04:45:00.000+00', '2022-10-04 03:41:27.391146+00', '2022-10-04 03:41:27.39308+00');

INSERT INTO businesses (id, name)
VALUES
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Demo Business');

INSERT INTO business_profiles (business_id, profile_id, role)
VALUES
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', '48af521c-89dd-4c7b-9737-6e7f37c9af9a', 'admin'::business_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'b2cef185-9ff8-4b71-b36b-e8b9c373e648', 'admin'::business_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', '9bb4974f-865f-4d82-89d2-daff0f525065', 'manager'::business_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', '4106c32c-18bc-48dd-9714-729ab1168b44', 'base'::business_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'f4acd8da-1f66-4c88-b285-4d2adba08c44', 'base'::business_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', '7e15d5cf-952c-4416-85e1-465849358402', 'base'::business_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', '1480e0d8-a3ea-4e03-b370-fab96a6be4ef', 'base'::business_roles);

INSERT INTO business_locations (id, name, business_id)
VALUES
  (1, 'Southern Utah', 'a9d3edf9-4ef7-4dc3-9943-938d10f357be'),
  (2, 'Northern Utah', 'a9d3edf9-4ef7-4dc3-9943-938d10f357be');

ALTER SEQUENCE business_locations_id_seq RESTART WITH 3;

INSERT INTO business_location_profiles ( business_id, location_id, profile_id, role)
VALUES
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, '48af521c-89dd-4c7b-9737-6e7f37c9af9a', 'admin'::location_profile_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'f4acd8da-1f66-4c88-b285-4d2adba08c44', 'manager'::location_profile_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, '4106c32c-18bc-48dd-9714-729ab1168b44', 'manager'::location_profile_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, '7e15d5cf-952c-4416-85e1-465849358402', 'base'::location_profile_roles),
  ('a9d3edf9-4ef7-4dc3-9943-938d10f357be', 2, '1480e0d8-a3ea-4e03-b370-fab96a6be4ef', 'base'::location_profile_roles);

INSERT INTO business_products (id, business_id, name, unit, unit_price)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Avid Olive 73', 'sq ft', 11.00),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Avid Olive 85', 'sq ft', 11.00),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Avid Spring Green 90', 'sq ft', 11.00),
  (4, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Avid Luxe', 'sq ft', 10.50),
  (5, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Avid Platinum 129', 'sq ft', 10.50),
  (6, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Tree Removal - Small', 'tree', 500),
  (7, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Tree Removal - Medium', 'tree', 1000),
  (8, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 'Ground Cover - Boulder Up to 36"', 'boulder', 200);

ALTER SEQUENCE business_products_id_seq RESTART WITH 9;

INSERT INTO business_location_customers (id, business_id, location_id, full_name, email, phone, address, city, state, postal_code, lead_source, disposition_status,notes)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Abigail Adid', 'abigail@testing.com', '','200 E 1600 N', 'St George', 'UT', '84242','setter','new','This is just an example note.'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Nicole Kidman', 'nicole@testing.com', '','1234 Fake St', 'Washington', 'UT', '84242','setter','new','Another example for nicole.'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Martin Donovan', 'martin@testing.com', '','1234 Fake St', 'Ogden', 'UT', '84242','setter','new','Bring a shovel.'),
  (4, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Matthew Brody', 'mbrody@testing.com', '','1234 Fake St', 'LaVerkin', 'UT', '84242','setter','new','Going to need a bigger shovel.'),
  (5, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Nicholas Sethi', 'nsethi@testing.com', '','1234 Fake St', 'Hurricane', 'UT', '84242','setter','new','This is just an example note.'),
  (6, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Ramit Bernsetin', 'nsethi@testing.com', '','1234 Fake St', 'Ivins', 'UT', '84242','setter','new','This is just an example note.');

ALTER SEQUENCE business_location_customers_id_seq RESTART WITH 7;

INSERT INTO business_location_jobs (id, business_id, business_location_id, full_name, address, city, state, postal_code, creator_id, status, lead_type)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Shawn Lucid', '200 E 1600 N', 'St George', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'new'::location_job_status,'self'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Elon Harris', '1234 Fake St', 'Washington', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'scheduled'::location_job_status,'self'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 2, 'Jarren Benton', '1234 Fake St', 'Ogden', 'UT', '84242', '1480e0d8-a3ea-4e03-b370-fab96a6be4ef', 'new'::location_job_status,'self'),
  (4, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Patiently Waiting', '1234 Fake St', 'LaVerkin', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'pending'::location_job_status,'self'),
  (5, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Nephi LaVerkin', '1234 Fake St', 'Hurricane', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'approved'::location_job_status,'self'),
  (6, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Darnell Wright', '1234 Fake St', 'Ivins', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'billed'::location_job_status,'self'),
  (7, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Ryan Jyan', '1234 Fake St', 'Santa Clara', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'canceled'::location_job_status,'self'),
  (8, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 'Drew Walker', '1234 Fake St', 'Leeds', 'UT', '84242', '7e15d5cf-952c-4416-85e1-465849358402', 'complete'::location_job_status,'self');

ALTER SEQUENCE business_location_jobs_id_seq RESTART WITH 9;

INSERT INTO business_location_job_profiles (id, business_id, location_id, job_id, profile_id)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, '7e15d5cf-952c-4416-85e1-465849358402'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 2, '7e15d5cf-952c-4416-85e1-465849358402'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 2, 3, '1480e0d8-a3ea-4e03-b370-fab96a6be4ef'),
  (4, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 4, '7e15d5cf-952c-4416-85e1-465849358402'),
  (5, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 5, '7e15d5cf-952c-4416-85e1-465849358402'),
  (6, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 6, '7e15d5cf-952c-4416-85e1-465849358402'),
  (7, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 7, '7e15d5cf-952c-4416-85e1-465849358402'),
  (8, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 8, '7e15d5cf-952c-4416-85e1-465849358402');

ALTER SEQUENCE business_location_job_profiles_id_seq RESTART WITH 9;

INSERT INTO business_location_job_products (id, business_id, location_id, job_id, product_id, number_of_units,unit_price,lead_price,total_price)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, 1, 2250, 10.00, 0.00, 2250.00),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, 7, 2, 500.00, 0.00, 1000.00),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, 8, 10, 5.00, 0.00, 50.00);

ALTER SEQUENCE business_location_job_products_id_seq RESTART WITH 4;

INSERT INTO business_location_job_messages (id, business_id, location_id, job_id, author_id, message)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1,'7e15d5cf-952c-4416-85e1-465849358402', 'We may have some issues removing the old stone.'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1,'4106c32c-18bc-48dd-9714-729ab1168b44', 'Should we get the bigger excavator for this one?'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1,'7e15d5cf-952c-4416-85e1-465849358402', 'Yeah, it would be better to have it just in case');

ALTER SEQUENCE business_location_job_messages_id_seq RESTART WITH 4;

INSERT INTO business_location_job_timesheets (id, business_id, location_id, job_id, profile_id, start_datetime, end_datetime)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1,'7e15d5cf-952c-4416-85e1-465849358402', '2024-11-01 07:00:00','2024-11-01 12:00:00'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1,'4106c32c-18bc-48dd-9714-729ab1168b44', '2024-11-02 07:00:00','2024-11-02 15:00:00'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1,'7e15d5cf-952c-4416-85e1-465849358402', '2024-11-03 07:00:00', '2024-11-03 13:00:00');

ALTER SEQUENCE business_location_job_timesheets_id_seq RESTART WITH 4;

INSERT INTO business_appointments (id, business_id, location_id, job_id, customer_id, start_datetime, end_datetime)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, 1, '2024-11-01 07:00:00','2024-11-01 12:00:00'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, 2, '2024-11-02 07:00:00','2024-11-02 15:00:00'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, 1, 3, '2024-11-03 07:00:00', '2024-11-03 13:00:00');

ALTER SEQUENCE business_appointments_id_seq RESTART WITH 4;

INSERT INTO business_appointment_profiles (id, business_id, appointment_id, profile_id)
VALUES
  (1, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, '7e15d5cf-952c-4416-85e1-465849358402'),
  (2, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 1, '4106c32c-18bc-48dd-9714-729ab1168b44'),
  (3, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 2, '4106c32c-18bc-48dd-9714-729ab1168b44'),
  (4, 'a9d3edf9-4ef7-4dc3-9943-938d10f357be', 3, '4106c32c-18bc-48dd-9714-729ab1168b44');

ALTER SEQUENCE business_appointment_profiles_id_seq RESTART WITH 5;
