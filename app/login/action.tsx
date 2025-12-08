"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type LoginData = {
  emailorPhone: string;
  password: string;
};

// function isEmail(value: string) {
//   return /\S+@\S+\.\S+/.test(value);
// }

export async function login({ emailorPhone, password }: LoginData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailorPhone,
    password,
  });
  // } else {
  //   ({ data, error } = await supabase.auth.signInWithOtp({
  //     phone: emailorPhone,
  //   }));
  // }

  if (error) return { success: false, message: error.message };

  console.log(data);

  // Fetch user role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  revalidatePath("/", "layout");

  if (profile?.role === "admin") {
    redirect("/admin-dashboard");
  } else {
    redirect("/dashboard/package-lists");
  }
}

export const resetUserPassword = async (email: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) return { success: false, message: error.message };
};
