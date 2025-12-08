"use client";
import { createClient } from "@/utils/supabase/client"; // client-side Supabase
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) return console.log(error);

    // clear Zustand immediately
    clearSession();

    // navigate to login
    router.push("/login");
  };

  return logout;
};
