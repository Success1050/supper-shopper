"use server";
import { createClient } from "@/utils/supabase/server";

export const getProducts = async (userId: string | undefined) => {
  const supabase = await createClient();

  // Optimized query with proper indexing hint
  const { data, error } = await supabase
    .from("user_tasks")
    .select(
      `
      *,
      products:product_id(name, image_url)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // Add ordering for better performance

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
    .eq("product_id", productId)
    .order("step_order", { ascending: true }); // Add ordering

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
  userId: string | undefined,
  rating: number
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_tasks")
    .update({
      completed: true,
      comment: userComment,
      rating: rating,
      completedAt: new Date().toISOString(),
    })
    .eq("product_id", productId)
    .eq("user_id", userId)
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: data };
};
