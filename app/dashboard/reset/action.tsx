"use server";

import { createClient } from "@/utils/supabase/server";

export const resetPassword = async (newPassword: string) => {
  const supabase = await createClient();
  const updatedPassword = newPassword.trim();

  const { data: newpass, error } = await supabase.auth.updateUser({
    password: updatedPassword,
  });

  if (error) return { success: false, message: error.message };
};
