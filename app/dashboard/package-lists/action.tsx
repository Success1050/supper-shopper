"use server";
import { createClient } from "@/utils/supabase/server";

export const fetchPackages = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("price", { ascending: true });

  if (error) return { success: false, error: error.message };
  else return { success: true, data: data };
};

export const userBuyPackages = async (
  packageId: number,
  userId: string | undefined
) => {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("buy_package", {
    p_package_id: packageId,
    p_user_id: userId, // pass user ID
  });

  if (error) {
    return { success: false, error: error.message };
  } else {
    return { success: true, data: data };
  }
};
