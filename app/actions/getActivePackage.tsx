"use server";

import { createClient } from "@/utils/supabase/server";

export async function getActivePackage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("user_packages")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true) // your active flag
    .single();

  if (error) return null;

  return data;
}
