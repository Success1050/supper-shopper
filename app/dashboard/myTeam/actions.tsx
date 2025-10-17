"use server";

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

// 🧠 Recursive function to get all team members (referrals of referrals)
async function getTeamRecursive(
  supabase: SupabaseClient,
  userId: string,
  level = 1
): Promise<
  {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    country: string | null;
    referral_code: string | null;
    personal_referral_code: string | null;
    referrer_id: string | null;
    level: number;
  }[]
> {
  // Get direct referrals for this user
  const { data: directRefs, error } = await supabase
    .from("profiles")
    .select(
      "id, email, first_name, last_name, country, referral_code, personal_referral_code, referrer_id"
    )
    .eq("referrer_id", userId);

  if (error) {
    console.error("Error fetching referrals:", error);
    return [];
  }

  if (!directRefs || directRefs.length === 0) return [];

  // Add level info for this "generation"
  const teamWithLevel = directRefs.map((member) => ({
    ...member,
    level,
  }));

  // Recursively get referrals of each referral
  for (const ref of directRefs) {
    const subRefs = await getTeamRecursive(supabase, ref.id, level + 1);
    teamWithLevel.push(...subRefs);
  }

  return teamWithLevel;
}

// 📦 Main function to get all referrals under current user
export const getTeamMembers = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return { success: false, error: "Not authenticated" };

  const allTeamMembers = await getTeamRecursive(supabase, session.user.id);

  console.log("All team members:", allTeamMembers);

  return {
    success: true,
    total: allTeamMembers.length,
    data: allTeamMembers,
  };
};
