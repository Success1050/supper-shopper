"use server";

import { createClient } from "@/utils/supabase/server";
import { UserProfileTypes } from "@/Components/EditProfileComp";

export const getProfile = async (userId: string | undefined) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return { success: false, message: error.message };

  return { success: true, data };
};

export const getUserProfile = async (profileId: string | undefined) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  if (error) return { success: false, message: error.message };
  return { success: true, data };
};

// ✅ Upload image and save URL
export const uploadProfileImage = async (
  profileId: string,
  file: File
): Promise<{ success: boolean; url?: string; message?: string }> => {
  const supabase = await createClient();

  // Generate unique file name
  const fileExt = file.name.split(".").pop();
  const fileName = `${profileId}-${Date.now()}.${fileExt}`;
  const filePath = `private/profileImages/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("product_images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error(uploadError);
    return { success: false, message: uploadError.message };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("product_images").getPublicUrl(filePath);

  // Save to profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ profile_img: publicUrl })
    .eq("id", profileId)
    .single();

  if (updateError) {
    console.error(updateError);
    return { success: false, message: updateError.message };
  }

  return { success: true, url: publicUrl };
};

export const saveProfile = async (
  profileId: string | undefined,
  editUserProfile: UserProfileTypes | null
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      postalCode: editUserProfile?.postalCode,
      address: editUserProfile?.address,
      mobilenumber: editUserProfile?.mobilenumber,
    })
    .eq("id", profileId)
    .single();

  if (error) {
    console.error(error);
    return { success: false, message: error.message };
  }

  return { success: true, data };
};
