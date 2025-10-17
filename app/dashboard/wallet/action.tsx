"use server";

import { createClient } from "@/utils/supabase/server";

export const getUserWallet = async (userId: string | undefined) => {
  const supabase = await createClient();

  if (!userId) {
    return { success: false, message: "Not authenticated" };
  }

  // fetch ALL wallets for this user
  const { data: wallets, error } = await supabase
    .from("user_wallets")
    .select("balance, coin, network")
    .eq("user_id", userId);

  if (error) {
    return { success: false, message: error.message };
  }

  if (!wallets || wallets.length === 0) {
    return { success: true };
  }

  // sum up all balances
  const totalBalance = wallets.reduce(
    (sum, w) => sum + Number(w.balance || 0),
    0
  );

  return { success: true, data: totalBalance };
};

export const fetchToken = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("token").select("*");

  if (error) {
    return { success: false, message: error.message };
  }

  console.log(data);

  return { success: true, data: data };
};

export const fetchChain = async (CurrencyId: number) => {
  const supabase = await createClient();

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

export const GetExistingData = async (
  userId: string | undefined,
  currency: string,
  network: string
) => {
  const supabase = await createClient();

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
