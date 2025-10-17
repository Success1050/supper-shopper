'use server'

// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
  const supabase  = await createClient()
  const { emailorPhone } = await req.json();

  const { error } = await supabase.auth.resetPasswordForEmail(emailorPhone, {
    redirectTo: 'https://www.supershopper.app/dashboard/auth/reset-password',
  });

  if (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Password reset email sent!" });
}
