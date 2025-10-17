"use server";

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";
import crypto from "crypto";

const SECRET_KEY =
  "$2a$09$1ntOIocGNgNKMSGyECzH/Oexdu.NjPvJdigL6Ee6Z7ntzfXJCImJi";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    // Read raw body first
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 401 }
      );
    }

    // Compute expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.NEXT_SECRET_KEY || SECRET_KEY)
      .update(rawBody)
      .digest("hex");

    // ✅ Secure signature comparison
    const signatureBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 403 }
      );
    }

    // Parse JSON after verification
    const data = JSON.parse(rawBody);
    console.log("Verified webhook:", data);

    const { txHash, amount, userId, address } = data;

    if (!userId || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const { data: rpcRes, error: rpcError } = await supabase.rpc(
      "handle_webhook_transaction_minimal",
      {
        p_user_id: userId,
        p_tx_hash: txHash,
        p_amount: amount,
        p_address: address,
      }
    );

    if (rpcError) {
      console.error("RPC error:", rpcError);
      throw rpcError;
    }
    if (!rpcRes?.success) {
      console.error("RPC returned failure:", rpcRes);
      throw new Error(rpcRes.error || "RPC failed");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
