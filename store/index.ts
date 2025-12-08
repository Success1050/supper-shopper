"use client";

import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

type AuthState = {
  session: Session | null;
  userId: string | null;

  setSession: (session: Session | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  userId: null,

  setSession: (session) =>
    set({
      session,
      userId: session?.user?.id ?? null,
    }),

  clearSession: () =>
    set({
      session: null,
      userId: null,
    }),
}));
