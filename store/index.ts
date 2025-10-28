// store/userStore.ts
// "use server";

import { create } from "zustand";
import { createClient } from "@/utils/supabase/client"; 
import type { User } from "@supabase/supabase-js";

type UserState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      set({ user: null, loading: false });
      return;
    }

    set({ user: data.user ?? null, loading: false });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false });
    });
  },
}));
