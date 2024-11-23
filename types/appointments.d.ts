import { Tables } from "./supabase";

interface IAppointmentProfile
  extends Tables<"business_location_job_appointment_profiles"> {
  profile: Tables<"profiles">;
}

interface IAppointment extends Tables<"business_location_job_appointments"> {
  job: Tables<"business_location_jobs">;
  profiles: IAppointmentProfile[];
}

export type TAppointment = IAppointment;
