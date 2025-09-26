"use server";
import { createClient } from "@/utils/supabase/server";

export const fetchPackages = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("packages").select("*");
  if (error) return { success: false, error: error.message };
  else return { success: true, data: data };
};

export const userBuyPackages = async (packageId: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("buy_package", {
    p_package_id: packageId,
  });

  if (error) {
    return { success: false, error: error.message };
  } else {
    return { success: true, data: data };
  }
};
