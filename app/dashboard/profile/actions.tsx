"use server";

import { createClient } from "@/utils/supabase/client";
import { UserProfileTypes } from "@/Components/EditProfileComp";

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

export const getUserProfile = async (profileId: string | undefined) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  if (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  return { success: true, data };
};
export const saveProfile = async (
  profileId: string | undefined,
  editUserProfile: UserProfileTypes | null
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: editUserProfile?.first_name,
      last_name: editUserProfile?.last_name,
      country: editUserProfile?.country,
      postalCode: editUserProfile?.postalCode,
      address: editUserProfile?.address,
      mobilenumber: editUserProfile?.mobilenumber,
      email: editUserProfile?.email,
    })
    .eq("id", profileId)
    .single();

  if (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  return { success: true, data };
};
