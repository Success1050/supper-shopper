"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type LoginData = {
  emailorPhone: string;
  password: string;
};

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export async function login({ emailorPhone, password }: LoginData) {
  const supabase = await createClient();
  let data, error;

  if (isEmail(emailorPhone)) {
    ({ data, error } = await supabase.auth.signInWithPassword({
      email: emailorPhone,
      password,
    }));
  } else {
    // Sign in via phone using OTP
    ({ data, error } = await supabase.auth.signInWithOtp({
      phone: emailorPhone,
    }));
  }

  if (error) return { success: false, message: error.message };

  console.log(data);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
