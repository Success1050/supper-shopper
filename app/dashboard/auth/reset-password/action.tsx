"use server";

import { createClient } from "@/utils/supabase/client";

export const resetPassword = async (password: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { success: false, message: error.message };
  else return { success: true };
};
