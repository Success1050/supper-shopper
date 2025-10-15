import { createClient } from "@/utils/supabase/server";

import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const supabase = await createClient();
  try {
    const { user_id, amount, currency, chain_code, destination_address } =
      req.body;

    // Validate
    if (!user_id || !amount || !destination_address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check balance (pseudo-code, depends on your schema)
    const { data: wallet } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user_id)
      .single();

    if (!wallet || wallet.balance < amount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    // Deduct or freeze the balance
    await supabase
      .from("wallets")
      .update({ balance: wallet.balance - amount })
      .eq("user_id", user_id);

    // Log the withdrawal
    const { error } = await supabase.from("withdrawals").insert([
      {
        user_id,
        amount,
        currency,
        network: chain_code,
        wallet_address: destination_address,
        status: "pending",
      },
    ]);

    if (error) throw error;

    res
      .status(200)
      .json({ success: true, message: "Withdrawal request submitted" });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Withdrawal error:", err.message);
    } else {
      console.error("Withdrawal error:", err);
    }
    res.status(500).json({ success: false, message: "Internal error" });
  }
}
