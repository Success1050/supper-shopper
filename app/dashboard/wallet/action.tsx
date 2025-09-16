"use server";

import { createClient } from "@/utils/supabase/server";

export const getUserWallet = async () => {
  const supabase = await createClient();

  // Get user from Supabase auth
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, message: "Not authenticated" };
  }

  const { data: userdata, error } = await supabase.rpc(
    "get_user_wallets_with_balance",
    {
      p_user_id: user.id,
    }
  );

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(userdata);

  return { success: true, data: userdata };
};
