"use server";

import { createClient } from "@/utils/supabase/server";

export async function getActivePackage(userId: string | undefined) {
  if (!userId) {
    return { success: false, error: "User ID is required" };
  }

  const supabase = await createClient();

  // Fetch active package - filter for is_active = true
  const { data, error } = await supabase
    .from("user_packages")
    .select(`*, packages(plan_name)`)
    .eq("user_id", userId)
    .eq("is_active", true)
    .maybeSingle();

  // If no active package found, return success but with null data
  if (error) {
    // Check if it's a "not found" type error
    if (error.code === "PGRST116") {
      return {
        success: true,
        data: null,
        userId: userId,
      };
    }
    return { success: false, error };
  }

  return {
    success: true,
    data,
    userId: userId,
  };
}
