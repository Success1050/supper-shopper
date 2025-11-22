"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface WalletAddressData {
  currency: string;
  network: string;
  walletAddress: string;
  confirmWalletAddress: string;
}

interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Save a new wallet address for the authenticated user
 */
export async function saveWalletAddress(
  formData: WalletAddressData
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return {
        success: false,
        error: "You must be logged in to save a wallet address",
      };
    }

    // Validate form data
    if (!formData.currency || !formData.network || !formData.walletAddress) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Check if wallet addresses match
    if (formData.walletAddress !== formData.confirmWalletAddress) {
      return {
        success: false,
        error: "Wallet addresses do not match",
      };
    }

    // Deactivate any existing active wallet for this currency
    const { error: deactivateError } = await supabase
      .from("wallet_addresses")
      .update({ is_active: false })
      .eq("user_id", session.user.id)
      .eq("currency", formData.currency)
      .eq("is_active", true);

    if (deactivateError) {
      console.error("Error deactivating old wallets:", deactivateError);
    }

    // Insert new wallet address
    const { data, error } = await supabase
      .from("wallet_addresses")
      .insert({
        user_id: session.user.id,
        currency: formData.currency,
        network: formData.network,
        wallet_address: formData.walletAddress,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving wallet address:", error);
      return {
        success: false,
        error: "Failed to save wallet address. Please try again.",
      };
    }

    revalidatePath("/dashboard/wallet");

    return {
      success: true,
      message: "Wallet address saved successfully!",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function updateWalletAddress(
  walletId: string,
  formData: WalletAddressData
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "You must be logged in to update a wallet address",
      };
    }

    // Validate form data
    if (!formData.currency || !formData.network || !formData.walletAddress) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Check if wallet addresses match
    if (formData.walletAddress !== formData.confirmWalletAddress) {
      return {
        success: false,
        error: "Wallet addresses do not match",
      };
    }

    // Update wallet address
    const { data, error } = await supabase
      .from("wallet_addresses")
      .update({
        currency: formData.currency,
        network: formData.network,
        wallet_address: formData.walletAddress,
      })
      .eq("id", walletId)
      .eq("user_id", user.id) // Security: ensure user owns this wallet
      .select()
      .single();

    if (error) {
      console.error("Error updating wallet address:", error);
      return {
        success: false,
        error: "Failed to update wallet address. Please try again.",
      };
    }

    revalidatePath("/dashboard/wallet");

    return {
      success: true,
      message: "Wallet address updated successfully!",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
