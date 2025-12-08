"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/store";
import { getUserWallet, GetActiveBalance } from "@/app/dashboard/wallet/action";

export default function AuthInitializer() {
  const supabase = createClient();
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setWalletAmount = useAuthStore((state) => state.setWalletAmount);
  const setActiveBalance = useAuthStore((state) => state.setActiveBalance);

  const fetchWalletData = async (userId: string) => {
    try {
      const [walletRes, activeRes] = await Promise.all([
        getUserWallet(userId),
        GetActiveBalance(userId),
      ]);

      if (walletRes.success) setWalletAmount(Number(walletRes.data) ?? 0);
      if (activeRes.success)
        setActiveBalance(Number(activeRes.totalActiveBalance) ?? 0);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  };

  useEffect(() => {
    // 1. Fetch initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      // CRITICAL: Clear store first if no session
      if (!session) {
        clearSession();
      } else {
        setSession(session);
        if (session.user.id) {
          fetchWalletData(session.user.id);
        }
        console.log("user session", session);
      }

      console.log("user session", session?.user.id);
    };

    getInitialSession();

    // 2. Realtime updates (login, logout, token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user.id);

        // CRITICAL: Handle all auth events properly
        if (event === "SIGNED_OUT") {
          clearSession();
        } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          if (session) {
            setSession(session);
            fetchWalletData(session.user.id);
          }
        } else if (event === "USER_UPDATED") {
          if (session) {
            setSession(session);
            fetchWalletData(session.user.id);
          }
        } else if (!session) {
          // Fallback: if no session for any reason, clear
          clearSession();
        } else {
          setSession(session);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, setSession, clearSession]);

  return null;
}