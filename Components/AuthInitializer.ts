"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/store"; 

export default function AuthInitializer() {
  const supabase = createClient();
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    // 1. Fetch initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      console.log('user session', session?.user.id
      );
      
    };

    getInitialSession();

    // 2. Realtime updates (login, logout, token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) setSession(session);
        else clearSession();
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, setSession, clearSession]);

  return null; // silent component
}
