"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as client } from "@/utils/supabase/client";

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

export const fetchToken = async () => {
  const supabase = client();
  const { data, error } = await supabase.from("tokens").select("*");

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(data);

  return { success: true, data: data };
};

export const fetchChain = async () => {
  const supabase = client();

  const res = await fetchToken();

  if (!Array.isArray(res?.data) || res.data.length === 0) {
    return { success: false, message: "No tokens found" };
  }

  const tokendId = res.data.map((token) => token.id);

  const { data, error } = await supabase
    .from("chains")
    .select("*")
    .in("id", tokendId);

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(data);

  return { success: true, data: data };
};

export const getUserSession = async () => {
  const supabase = await createClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    return { success: false, message: sessionError.message };
  }

  console.log(session);

  return { success: true, data: session };
};
