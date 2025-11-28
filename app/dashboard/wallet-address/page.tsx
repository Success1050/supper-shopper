"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import {
  deleteWalletAddress,
  getUsersWalletAddress,
  saveWalletAddress,
  updateWalletAddress,
} from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface WalletAddressFormProps {
  onBack?: () => void;
  walletId?: string;
  initialData?: WalletFormData;
}

interface WalletFormData {
  currency: string;
  network: string;
  walletAddress: string;
  confirmWalletAddress: string;
}

interface SavedWallet {
  id: string;
  currency: string;
  network: string;
  wallet_address: string;
  created_at: string;
}

const WalletAddressForm: React.FC<WalletAddressFormProps> = ({
  onBack,
  walletId,
  initialData,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WalletFormData>(
    initialData || {
      currency: "",
      network: "",
      walletAddress: "",
      confirmWalletAddress: "",
    }
  );
  const [savedWallets, setSavedWallets] = useState<SavedWallet[]>([]);

  const getUserWallet = async () => {
    const res = await getUsersWalletAddress();
    if (res && res.success) {
      setSavedWallets(res.wallets as SavedWallet[]);
    }
    console.log(res.error);
  };

  useEffect(() => {
    getUserWallet();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.currency || !formData.network || !formData.walletAddress) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.walletAddress !== formData.confirmWalletAddress) {
      toast.error("Wallet addresses do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await saveWalletAddress(formData);

      if (result.success) {
        alert(result.message || "Wallet address saved successfully!");
        // Reset form
        setFormData({
          currency: "",
          network: "",
          walletAddress: "",
          confirmWalletAddress: "",
        });
        // Optionally redirect or go back
        router.push("/dashboard/wallet");
      } else {
        toast.error(result.error || "Failed to save wallet address");
      }
    } catch (error) {
      console.error("Error saving wallet:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!walletId) {
      toast.error("No wallet ID provided");
      return;
    }

    // Validation
    if (!formData.currency || !formData.network || !formData.walletAddress) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.walletAddress !== formData.confirmWalletAddress) {
      toast.error("Wallet addresses do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateWalletAddress(walletId, formData);

      if (result.success) {
        toast.success(result.message || "Wallet address updated successfully!");
        if (onBack) onBack();
      } else {
        toast.error(result.error || "Failed to update wallet address");
      }
    } catch (error) {
      console.error("Error updating wallet:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      currency: "",
      network: "",
      walletAddress: "",
      confirmWalletAddress: "",
    });
    if (onBack) onBack();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen bg-[#201d4c] p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="text-white hover:text-white/80 transition"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold">Wallet Address</h1>
      </div>

      {/* Description */}
      <p className="text-white/80 text-sm text-center leading-relaxed mb-8">
        Add or update your crypto wallet address for withdrawals. Please ensure
        the address is correct, as transactions cannot be reversed.
      </p>

      {/* Form */}
      <div className="space-y-6">
        {/* Select Currency & Network - Two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Select Currency */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Select Currency
            </label>
            <div className="relative">
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/70 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#312e81] text-white">
                  Choose select currency
                </option>
                <option value="btc" className="bg-[#312e81] text-white">
                  Bitcoin (BTC)
                </option>
                <option value="eth" className="bg-[#312e81] text-white">
                  Ethereum (ETH)
                </option>
                <option value="usdt" className="bg-[#312e81] text-white">
                  Tether (USDT)
                </option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Select Network */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Select Network
            </label>
            <div className="relative">
              <select
                name="network"
                value={formData.network}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/70 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-[#312e81] text-white">
                  Choose your network
                </option>
                <option value="erc20" className="bg-[#312e81] text-white">
                  ERC20
                </option>
                <option value="trc20" className="bg-[#312e81] text-white">
                  TRC20
                </option>
                <option value="bep20" className="bg-[#312e81] text-white">
                  BEP20
                </option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Wallet Address & Confirm - Two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Wallet Address */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Paste your wallet address here"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Confirm Wallet Address */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Wallet Address
            </label>
            <input
              type="text"
              name="confirmWalletAddress"
              value={formData.confirmWalletAddress}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="Re-enter wallet address"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 pt-4">
          {/* Save Wallet Address Button */}
          {!walletId && (
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full bg-[#2563EB] text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Wallet Address"}
              {!isLoading && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Update Button */}
          {walletId && (
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="w-full bg-transparent border-2 border-white text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update"}
              {!isLoading && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full bg-transparent border-2 border-white text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Saved Wallet Addresses Section */}
      {savedWallets.length > 0 && (
        <div className="mt-12">
          <h2 className="text-white text-xl font-bold mb-6">
            Saved Wallet Addresses
          </h2>

          <div className="grid gap-4">
            {savedWallets.map((wallet) => (
              <div
                key={wallet.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Wallet Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Currency Badge */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {wallet.currency}
                      </span>

                      {/* Network Badge */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {wallet.network}
                      </span>

                      {/* Date */}
                      <span className="text-white/50 text-xs">
                        Added:{" "}
                        {new Date(wallet.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Wallet Address */}
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-sm font-mono break-all">
                        {wallet.wallet_address}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(wallet.wallet_address);
                          toast.success("Address copied to clipboard");
                        }}
                        className="flex-shrink-0 text-white/50 hover:text-white transition p-1"
                        aria-label="Copy address"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // Set form data for editing
                        setFormData({
                          currency: wallet.currency.toLowerCase(),
                          network: wallet.network.toLowerCase(),
                          walletAddress: wallet.wallet_address,
                          confirmWalletAddress: wallet.wallet_address,
                        });
                        // Scroll to top
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition text-sm font-medium border border-blue-500/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            "Are you sure you want to delete this wallet address?"
                          )
                        ) {
                          const result = await deleteWalletAddress(wallet.id);

                          if (result.success) {
                            // Remove from local state
                            setSavedWallets(
                              savedWallets.filter((w) => w.id !== wallet.id)
                            );
                            toast.success(
                              result.message || "Wallet address deleted"
                            );
                          } else {
                            toast.error(
                              result.error || "Failed to delete wallet address"
                            );
                          }
                        }
                      }}
                      className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm font-medium border border-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletAddressForm;
