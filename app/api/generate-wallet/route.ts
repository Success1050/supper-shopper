// app/api/generate-wallet/route.js (App Router)

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";
import { TronWeb } from "tronweb";
import { validateMnemonic, mnemonicToSeed } from "bip39";
import { ethers, HDNodeWallet } from "ethers";

// Supabase client with service role key
const supabase = createClient();

const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC!;

if (!MNEMONIC || !validateMnemonic(MNEMONIC)) {
  console.error(" Invalid WALLET_MNEMONIC");
}

export async function POST(request: any) {
  try {
    const authorization = request.headers.get("authorization");
    if (!authorization) {
      return NextResponse.json(
        { error: "Missing authorization header" },
        { status: 401 }
      );
    }

    const { user_id, token_id, chain_code } = await request.json();

    if (!user_id || !token_id || !chain_code) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );
    }

    console.log(`Generating ${chain_code} wallet for user: ${user_id}`);

    // Generate wallet
    const seedBuffer = await mnemonicToSeed(MNEMONIC);
    let address, derivationPath, privateKey;

    if (chain_code === "trc20") {
      derivationPath = `m/44'/195'/0'/0/${Date.now() % 100000}`;
      const hdNode = HDNodeWallet.fromSeed(seedBuffer);
      const childWallet = hdNode.derivePath(derivationPath);
      const privHex = childWallet.privateKey.slice(2);

      const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
      address = tronWeb.address.fromPrivateKey(privHex);
      privateKey = privHex;
    } else {
      derivationPath = `m/44'/60'/0'/0/${Date.now() % 100000}`;
      const hdNode = HDNodeWallet.fromSeed(seedBuffer);
      const childWallet = hdNode.derivePath(derivationPath);
      address = childWallet.address;
      privateKey = childWallet.privateKey;
    }

    console.log(` Generated ${chain_code} address:`, address);

    // Insert into Supabase
    const { error } = await supabase.from("user_wallets").insert([
      {
        user_id,
        token_id,
        chain_code,
        deposit_address: address,
        derivation_path: derivationPath,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      address,
      derivation_path: derivationPath,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(" Error:", err.message);
      return NextResponse.json(
        {
          success: false,
          message: err.message || "Server error",
          code: (err as any).code || "UNKNOWN_ERROR",
        },
        { status: 500 }
      );
    } else {
      console.error(" Error:", err);
      return NextResponse.json(
        {
          success: false,
          message: "Server error",
          code: "UNKNOWN_ERROR",
        },
        { status: 500 }
      );
    }
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json({ message: "Wallet generation API" });
}
