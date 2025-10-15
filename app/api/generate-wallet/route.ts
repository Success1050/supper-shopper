import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {

  const supabase = await createClient()
  try {
    const { user_id, coin, network } = await req.json();

    console.log(user_id, coin, network);
    

    if (!user_id || !network || !coin) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const response = await fetch("http://82.180.154.241/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXBpX3Rva2VuIiwidG9rZW5fbmFtZSI6InNpdGVfdG9rZW5fMSIsImlhdCI6MTc2MDM0NjIzMCwiZXhwIjo0OTE2MTA2MjMwfQ.N4XcOa0dPXr1wuIVidfHWjg-Khu8OaL_XD7PsrU-LM4'}`,
      },
      body: JSON.stringify({
        userId: 'c2c72b63-y45t-45n6-a036-fae488152d45',
        network,
        coin,
      }),
    });

    // ✅ Check if the response was successful
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${text}`
      );
    }

    const data = await response.json();

    // ✅ Check response structure
    if (data.status === "success" && data.userObj) {
      const { address, balance, merchantId, userId, coin, network } = data.userObj;

      console.log("Wallet data:", { address, balance, merchantId, userId, coin, network });

      const {data:user_wallet, error} = await supabase.from('user_wallets').insert({user_id: userId, address, coin, network, balance, merchant_id:merchantId}).select().single()


      if (error) {
         console.log(error);
      }

      return NextResponse.json({
        success: true,
        wallet: address,
        message: "Wallet created successfully",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Wallet generation failed",
      response: data,
    });
  } catch (error: any) {
    // ✅ Improved error logging
    console.error("Error generating wallet:", error.stack || error);
    return NextResponse.json({
      success: false,
      error: error.message || "An unknown error occurred",
    });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Wallet generation API active ✅" });
}
