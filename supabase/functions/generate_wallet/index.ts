// Setup type definitions for Supabase Edge Functions runtime
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { ethers, HDNodeWallet, Mnemonic } from "npm:ethers@6.15.0";
import { mnemonicToSeed, validateMnemonic } from "npm:bip39@3.1.0";
import TronWeb from "npm:tronweb@6.0.4";

// Supabase client (service role for DB inserts)
const supabase = createClient(
  Deno.env.get("NEXTJS_SUPABASE_URL")!,
  Deno.env.get("NEXTJS_SUPABASE_SERVICE_ROLE_KEY")!
);

// One master seed phrase stored in Supabase secrets
const MNEMONIC = Deno.env.get("WALLET_MNEMONIC")!;

// Validate mnemonic on startup
if (!MNEMONIC || !validateMnemonic(MNEMONIC)) {
  throw new Error("Invalid or missing WALLET_MNEMONIC environment variable");
}

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, apikey, x-client-info",
  "Access-Control-Max-Age": "86400",
};

serve(async (req: Request): Promise<Response> => {
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Check authorization header
  const authorization = req.headers.get("Authorization");
  if (!authorization) {
    return new Response(
      JSON.stringify({ error: "Missing authorization header" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { user_id, token_id, chain_code } = await req.json();

    if (!user_id || !token_id || !chain_code) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing params" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Convert master mnemonic to seed
    const seedBuffer = await mnemonicToSeed(MNEMONIC);

    let address: string;
    let derivationPath: string;
    let privateKey: string;

    if (chain_code === "tron") {
      // Tron derivation path: m/44'/195'/0'/0/index
      derivationPath = `m/44'/195'/0'/0/${Date.now() % 100000}`;
      
      // Use ethers HDNodeWallet for consistent behavior
      const hdNode = HDNodeWallet.fromSeed(seedBuffer);
      const childWallet = hdNode.derivePath(derivationPath);
      
      // Get private key without 0x prefix for Tron
      const privHex = childWallet.privateKey.slice(2);
      
      const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
      address = tronWeb.address.fromPrivateKey(privHex);
      privateKey = privHex;
      
    } else {
      // Ethereum derivation path: m/44'/60'/0'/0/index (BIP-44 standard)
      derivationPath = `m/44'/60'/0'/0/${Date.now() % 100000}`;
      
      // Create HD wallet from seed and derive child
      const hdNode = HDNodeWallet.fromSeed(seedBuffer);
      const childWallet = hdNode.derivePath(derivationPath);
      
      // HDNodeWallet already has address and privateKey properties
      address = childWallet.address;
      privateKey = childWallet.privateKey; // Already 0x-prefixed
    }

    console.log(`Generated ${chain_code} wallet:`, { 
      address, 
      derivationPath,
      privateKeyLength: privateKey.length 
    });

    // Insert into Supabase (DO NOT store private keys in production!)
    const { error } = await supabase
      .from("user_wallets")
      .insert([
        {
          user_id,
          token_id,
          chain_code,
          deposit_address: address,
          derivation_path: derivationPath,
          // encrypted_private_key: encryptPrivateKey(privateKey), // Encrypt in production
        },
      ]);

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        success: true, 
        address,
        derivation_path: derivationPath
        // privateKey // ⚠️ REMOVE THIS IN PRODUCTION - only for testing
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (err: any) {
    console.error("Wallet generation error:", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      stack: err.stack?.split('\n').slice(0, 5) // First 5 lines of stack
    });

    return new Response(
      JSON.stringify({
        success: false,
        message: err.message || "Server error",
        code: err.code || "UNKNOWN_ERROR",
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});