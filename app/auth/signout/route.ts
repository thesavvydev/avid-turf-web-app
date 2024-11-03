import { createSupabaseServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;

  await supabase.auth.signOut();

  return NextResponse.redirect(origin);
}
