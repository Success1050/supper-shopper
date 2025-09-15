"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return console.log(error);
  redirect("login");
};
