"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type FormData = {
  emailOrPhone: string;
  firstName: string;
  lastName: string;
  verificationCode: string;
  country: string;
  referralCode: string;
  password: string;
};

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export async function signup(formdata: FormData, confirmPassword: string) {
  const supabase = createClient();

  // 1. Validate passwords first
  if (formdata.password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  let data, error;

  // 2. Check if input is email or phone
  if (isEmail(formdata.emailOrPhone)) {
    // Email signup
    ({ data, error } = await supabase.auth.signUp({
      email: formdata.emailOrPhone,
      password: formdata.password,
      options: {
        data: {
          firstName: formdata.firstName,
          lastName: formdata.lastName,
          country: formdata.country,
          referralCode: formdata.referralCode,
        },
      },
    }));
  } else {
    // Phone signup
    ({ data, error } = await supabase.auth.signUp({
      phone: formdata.emailOrPhone,
      password: formdata.password,
      options: {
        data: {
          firstName: formdata.firstName,
          lastName: formdata.lastName,
          country: formdata.country,
          referralCode: formdata.referralCode,
        },
      },
    }));
  }

  // 3. Handle Supabase errors
  if (error) {
    return { success: false, message: error.message };
  }

  // 4. Debugging log (server console)
  console.log("Signup success:", data);

  // 5. Redirect if success
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
