"use server";

import { createClient } from "@/utils/supabase/client";

export const getUserWallet = async () => {
  const supabase = createClient();

  // Get user from Supabase auth
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, message: "Not authenticated" };
  }

  const { data: userdata, error } = await supabase
    .from("user_balances")
    .select()
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(userdata);

  return { success: true, data: userdata };
};

export const fetchToken = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("token").select("*");

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(data);

  return { success: true, data: data };
};

export const fetchChain = async (CurrencyId: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("token_chain")
    .select(`*,  chain(name, network_code)`)
    .eq("token_id", CurrencyId);

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(error);

  return { success: true, data: data };
};

export const getUserSession = async () => {
  const supabase = createClient();
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

export const GetExistingData = async (
  userId: string | undefined,
  currency: string,
  network: string
) => {
  const supabase = createClient();

  const { data: existingData, error } = await supabase
    .from("user_wallets")
    .select("*")
    .eq("user_id", userId)
    .eq("coin", currency)
    .eq("network", network)
    .single();

  if (error) {
    console.log(error);
    return { success: false, message: error.message };
  }

  return { success: true, data: existingData };
};
