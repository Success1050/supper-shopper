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

  return { success: true, data: data };
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
    return { success: false, message: error.message };
  }

  return { success: true, data: existingData };
};

export const GetActiveBalance = async (userId: string | undefined) => {
  const supabase = await createClient();

  // Fetch all active balances for the user
  const { data: balances, error } = await supabase
    .from("active_balances")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "active"); // only active balances

  if (error) {
    return { success: false, message: error.message };
  }

  // Use reduce to sum all amounts
  const totalActiveBalance =
    balances?.reduce((acc, curr) => {
      return acc + Number(curr.amount); // ensure numeric addition
    }, 0) ?? 0;

  return { success: true, totalActiveBalance };
};
