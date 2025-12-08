"use client";

import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

type AuthState = {
  session: Session | null;
  userId: string | null;

  walletAmount: number;
  activeBalance: number;

  setSession: (session: Session | null) => void;
  clearSession: () => void;

  setWalletAmount: (amount: number) => void;
  setActiveBalance: (amount: number) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  userId: null,
  walletAmount: 0,
  activeBalance: 0,

  setSession: (session) =>
    set({
      session,
      userId: session?.user?.id ?? null,
    }),

  clearSession: () =>
    set({
      session: null,
      userId: null,
      walletAmount: 0,
      activeBalance: 0,
    }),

  setWalletAmount: (amount: number) => set({ walletAmount: amount }),
  setActiveBalance: (amount: number) => set({ activeBalance: amount }),
}));
