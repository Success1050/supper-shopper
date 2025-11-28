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
    .select(`*, packages(plan_name)`)
    .eq("user_id", user.id)
    .single();

  if (error) return { sucess: false, error: error };

  return { success: true, data };
}
