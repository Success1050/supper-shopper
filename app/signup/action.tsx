"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type FormData = {
  emailOrPhone: string;
  firstName: string;
  lastName: string;
  verificationCode: string;
  country: string;
  referralCode: string;
  password: string;
};

export async function signup(formdata: FormData, confirmPassword: string) {
  const supabase = await createClient();

  // 1. Validate passwords first
  if (formdata.password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  // 2. Attempt signup with Supabase
  const { data, error } = await supabase.auth.signUp({
    email: formdata.emailOrPhone, // works only if it's a valid email
    password: formdata.password,
    options: {
      data: {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        country: formdata.country,
        referralCode: formdata.referralCode,
      },
    },
  });

  // 3. Handle Supabase errors
  if (error) {
    return { success: false, message: error.message };
  }

  // 4. (Optional) log for debugging
  console.log("Signup success:", data);

  // 5. Redirect if success
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
