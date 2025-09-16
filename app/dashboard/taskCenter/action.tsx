import { createClient } from "@/utils/supabase/client";

export const getProducts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: data };
};
