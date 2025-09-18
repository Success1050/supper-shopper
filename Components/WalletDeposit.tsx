"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import {
  fetchChain,
  fetchToken,
  getUserSession,
  getUserWallet,
} from "@/app/dashboard/wallet/action";
import { useUserStore } from "@/store";

const MyBalanceDeposit: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"Deposit" | "Withdrawal">(
    "Deposit"
  );
  const [amount, setAmount] = useState<string>("");
  const [chains, setChain] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [CurrencyId, setCurrencyId] = useState<number>(1);
  const [walletAmount, setWalletAmount] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USDT");
  const [networks, setNetwork] = useState<string>("");
  const [showCurrencyDropdown, setShowCurrencyDropdown] =
    useState<boolean>(false);
  const [showNetworkDropdown, setShowNetworkDropdown] =
    useState<boolean>(false);
  const [userSession, setusersession] = useState<string>("");
  const [generatedAddress, setGeneratedAddress] = useState<string>("");
  const [txId, setTxId] = useState<string>("");
  const [isDropdown, setIsdropdown] = useState<boolean>(false);

  const generateAddress = async () => {
    try {
      if (!networks || !currency) return;
      const res = await fetch("/api/generate-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession}`,
        },
        body: JSON.stringify({
          user_id: user?.id,
          token_id: CurrencyId,
          chain_code: networks,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        console.log("✅ Wallet generated:", data);
        setGeneratedAddress(data.address);
        setIsdropdown(true);
        return data;
      } else {
        throw new Error(data.message || "Wallet generation failed");
      }
    } catch (error) {
      console.error("❌ Wallet generation error:", error);
      // Handle error in your UI
      throw error;
    }
  };

  const confirmDeposit = () => {
    if (amount && txId) {
      alert(
        "Deposit confirmed! Your account will be credited within 24 hours."
      );
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const confirmWithdrawal = () => {
    if (amount && txId) {
      alert(
        "Deposit confirmed! Your account will be credited within 24 hours."
      );
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const getWalletBal = async () => {
    const res = await getUserWallet();
    if (!res.success) {
      return;
    }

    setWalletAmount(res.data?.[0]?.balance);
  };

  const getAllChain = async () => {
    const res = await fetchChain();
    if (!res.success) {
      return;
      // console.log("chain errror", res.message);
    }
    console.log("chains", res.data);

    setChain(res.data || []);
  };

  const getAllTokens = async () => {
    const res = await fetchToken();
    if (!res.success) {
      return;
      // console.log("tokens errror", res.message);
    }
    console.log("tokens", res.data);

    setTokens(res.data || []);
  };

  const fetchUserSession = async () => {
    const res = await getUserSession();
    if (!res.success) {
      return;
      // console.log("sessions errror", res.message);
    }
    // console.log("sessions", res.data);
    setusersession(res.data?.access_token || "");
  };

  useEffect(() => {
    getWalletBal();
    fetchUserSession();
  }, [user?.id]);

  useEffect(() => {
    getAllChain();
    getAllTokens();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-1">
              My Balance
            </h1>
            <div className="text-white text-3xl font-bold">
              ${walletAmount ?? 0}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab("Deposit")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "Deposit"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-800/40 text-blue-200 hover:bg-blue-700/50"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setActiveTab("Withdrawal")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "Withdrawal"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-800/40 text-blue-200 hover:bg-blue-700/50"
              }`}
            >
              Withdrawal
            </button>
          </div>
        </div>

        {/* Deposit Form */}
        {activeTab === "Deposit" && (
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50">
            <h2 className="text-white text-xl font-semibold mb-6">Deposit</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Choose Amount */}
              <div>
                <label className="text-blue-200 text-sm mb-2 block">
                  Choose Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg pl-8 pr-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Choose Currency */}
              <div className="relative">
                <label className="text-blue-200 text-sm mb-2 block">
                  Choose Currency
                </label>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-blue-700/50 rounded-lg overflow-hidden z-10">
                    {tokens.map((curr) => (
                      <button
                        key={curr.id}
                        onClick={() => {
                          setCurrency(curr.name);
                          setCurrencyId(curr.id);
                          setShowCurrencyDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-blue-700 transition-colors"
                      >
                        {curr.name.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Choose Network */}
              <div className="relative">
                <label className="text-blue-200 text-sm mb-2 block">
                  Choose Network
                </label>
                <button
                  onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>{networks}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showNetworkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-blue-700/50 rounded-lg overflow-hidden z-10">
                    {chains.map((chain) => (
                      <button
                        key={chain.id}
                        onClick={() => {
                          setNetwork(chain.name);
                          setShowNetworkDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-blue-700 transition-colors"
                      >
                        {chain.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full items-center gap-4 md:flex-row">
              {/* Generate Address */}
              <div className="mb-6 w-full">
                <button
                  onClick={generateAddress}
                  className="w-full bg-blue-700/50 hover:bg-blue-600/50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Generate & Copy Address</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdown && (
                  <div className="mt-3 p-3 bg-blue-900/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-mono break-all">
                        {generatedAddress}
                      </span>
                      <Copy className="w-4 h-4 text-blue-300 cursor-pointer hover:text-white ml-2" />
                    </div>
                  </div>
                )}
              </div>

              {/* Paste TXID */}
              <div className="mb-6 w-full">
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder=" Paste TXID"
                  className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Confirm Deposit Button */}
            <button
              onClick={confirmDeposit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors mb-4"
            >
              Confirm Deposit
            </button>

            {/* Info Text */}
            <p className="text-blue-200 text-sm text-center">
              Your Account Will Be Credited Within 24 Hours.
            </p>
          </div>
        )}

        {/* Withdrawal Form (Placeholder) */}
        {activeTab === "Withdrawal" && (
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50">
            <h2 className="text-white text-xl font-semibold mb-6">Deposit</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Choose Amount */}
              <div>
                <label className="text-blue-200 text-sm mb-2 block">
                  Enter Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg pl-8 pr-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Choose Currency */}
              <div className="relative">
                <label className="text-blue-200 text-sm mb-2 block">
                  Choose Currency
                </label>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-blue-700/50 rounded-lg overflow-hidden z-10">
                    {tokens.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setShowCurrencyDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-blue-700 transition-colors"
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-blue-200 text-sm mb-2 block">
                  Add wallet address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="0x1234...abcd"
                    className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg pl-8 pr-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Choose Network */}
              <div className="relative">
                <label className="text-blue-200 text-sm mb-2 block">
                  Choose Network
                </label>
                <button
                  onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>
                    {networks.length > 0 ? networks[0] : "choose network"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showNetworkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-blue-700/50 rounded-lg overflow-hidden z-10">
                    {chains.map((net: string) => (
                      <button
                        key={net}
                        onClick={() => {
                          setWalletAddress(net);
                          setShowNetworkDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-blue-700 transition-colors"
                      >
                        {net}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Deposit Button */}
            <button
              onClick={confirmWithdrawal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors mb-4"
            >
              Confirm Withdrawal
            </button>

            {/* Info Text */}
          </div>
        )}
      </div>
      <button
        onClick={confirmWithdrawal}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg mt-6 transition-colors mb-4"
      >
        Withdraw now
      </button>
      <p className="text-blue-200 text-sm text-center">
        Congratulations! Your withdrawal is in process. It may take up to 72
        hours.
      </p>
    </div>
  );
};

export default MyBalanceDeposit;
