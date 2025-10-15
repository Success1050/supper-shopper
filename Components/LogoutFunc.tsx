"use server";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return console.log(error);
  redirect("login");
};
