import { createClient } from "@/utils/supabase/client";

export const getProfile = async () => {
  const supabase = createClient();

  // get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    return { success: false, message: userError.message };
  }
  if (!user) {
    return { success: false, message: "No authenticated user" };
  }

  // query profile
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  return { success: true, data };
};
