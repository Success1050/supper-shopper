"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type LoginData = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginData) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // return error instead of redirecting
      return { success: false, message: error.message };
    }

    // ✅ success
    revalidatePath("/", "layout");
    redirect("/dashboard");
  } catch (error) {
    return { error };
  }
}
