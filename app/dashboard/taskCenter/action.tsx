"use server";

import { createClient } from "@/utils/supabase/server";

export const getProducts = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, message: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("user_tasks")
    .select(`*, products: product_id(name, image_url)`)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: data };
};

export const getTaskSteps = async (productId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("task_steps")
    .select("*")
    .eq("product_id", productId);
  if (error) {
    console.log("video error", error);

    return { success: false, message: error.message };
  }

  console.log("the video from base", data);

  return { success: true, data };
};

export const submission = async (
  productId: number,
  userComment: string,
  rating: number
) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: error_tasks,
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("user_tasks")
      .update({
        completed: true,
        comment: userComment,
        rating: rating,
      })
      .eq("product_id", productId)
      .eq("user_id", user.id)
      .select();
    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data: data };
  }
};
