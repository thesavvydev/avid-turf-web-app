import { createSupabaseServerClient } from "@/utils/supabase/server";
import JobWeekView from "./job-week-view";
import { Tables } from "@/types/supabase";
import dayjs from "dayjs";

export type TSchedulingEvent = Tables<"business_location_job_events"> & {
  profiles: Tables<"business_location_job_event_profiles"> &
    {
      profile: Tables<"profiles">;
    }[];
};

type TPageProps = {
  searchParams: Promise<{
    startOfWeek: string;
  }>;
};

export default async function Page(props: TPageProps) {
  const supabase = await createSupabaseServerClient();
  const { startOfWeek } = await props.searchParams;

  const { data } = await supabase
    .from("business_location_job_events")
    .select(
      "*,profiles: business_location_job_event_profiles(*,profile: profile_id(*))",
    )
    .gte(
      "start_datetime",
      startOfWeek ? startOfWeek : dayjs().startOf("week").toISOString(),
    )
    .lte("end_datetime", dayjs(startOfWeek).endOf("week").toISOString())
    .returns<TSchedulingEvent[]>();

  return <JobWeekView events={data ?? []} />;
}
