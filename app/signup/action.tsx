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
  gender: string;
  city: string;
  address: string;
  dob: string;
  referralCode?: string;
  password: string;
};

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

function generateReferralCode(): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `REF-${randomPart}`;
}

export async function signup(formdata: FormData, confirmPassword: string) {
  const supabase = await createClient();

  // 1️⃣ Validate passwords
  if (formdata.password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  // 2️⃣ Generate a personal referral code for the new user
  const personalReferralCode = generateReferralCode();

  // 3️⃣ Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: formdata.emailOrPhone,
    password: formdata.password,
    options: {
      data: {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        country: formdata.country,
        gender: formdata.gender,
        city: formdata.city,
        address: formdata.address,
        dob: formdata.dob,
        personalReferralCode,
        referralCode: formdata.referralCode || null, // who referred them
      },
    },
  });

  if (error) {
    console.log("Signup error:", error);
    return { success: false, message: error.message };
  }

  const newUserId = data.user?.id;
  if (!newUserId) {
    return { success: false, message: "Signup failed — user not created" };
  }

  if (formdata.referralCode) {
    const { data: referrer, error: referrerError } = await supabase
      .from("profiles")
      .select("id")
      .eq("personal_referral_code", formdata.referralCode)
      .single();

    if (referrerError || !referrer) {
      console.log(
        "Invalid or nonexistent referral code:",
        formdata.referralCode
      );
    } else {
      // Update new user's profile with the referrer ID
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ referrer_id: referrer.id })
        .eq("id", newUserId);

      if (updateError) {
        console.log("Failed to set referrer_id:", updateError.message);
      }
    }
  }

  // 6️⃣ Done
  console.log("Signup success:", data);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
