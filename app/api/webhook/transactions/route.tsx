import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Webhook received:", data);

    const { userId, amount, coin, network, status, txHash } = data;

    // ✅ Verify required data
    if (!userId || !amount || !status) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ Store or update in Supabase
    const { error } = await supabase.from("transactions").insert([
      {
        user_id: userId,
        amount,
        coin,
        network,
        status,
        tx_hash: txHash,
      },
    ]);

    if (error) throw error;

    // ✅ Respond success
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
