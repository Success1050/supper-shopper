"use server";

import { ActionResponse, WalletAddressData } from "@/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveWalletAddress(
  formData: WalletAddressData,
  userId: string | undefined
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

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
      .eq("user_id", userId)
      .eq("currency", formData.currency)
      .eq("is_active", true);

    if (deactivateError) {
      console.error("Error deactivating old wallets:", deactivateError);
    }

    // Insert new wallet address
    const { data, error } = await supabase
      .from("wallet_addresses")
      .insert({
        user_id: userId,
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
  formData: WalletAddressData,
  userId: string | undefined
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

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
      .eq("user_id", userId) // Security: ensure user owns this wallet
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

export const getUsersWalletAddress = async (userId: string | undefined) => {
  const supabase = await createClient();
  const { data: wallets, error } = await supabase
    .from("wallet_addresses")
    .select(`*`)
    .eq("user_id", userId);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return { success: true, wallets };
};

export async function deleteWalletAddress(
  walletId: string,
  userId: string | undefined
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    // Delete wallet address
    const { error } = await supabase
      .from("wallet_addresses")
      .delete()
      .eq("id", walletId)
      .eq("user_id", userId); // Security: ensure user owns this wallet

    if (error) {
      console.error("Error deleting wallet address:", error);
      return {
        success: false,
        error: "Failed to delete wallet address. Please try again.",
      };
    }

    revalidatePath("/dashboard/wallet-address");

    return {
      success: true,
      message: "Wallet address deleted successfully!",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
