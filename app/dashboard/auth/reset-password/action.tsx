import { createClient } from "@/utils/supabase/server";

export const resetPassword = async (password: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { success: false, message: error.message };
  else return { success: true };
};
