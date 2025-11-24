"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import {
  fetchChain,
  fetchToken,
  GetExistingData,
  getUserSession,
  getUserWallet,
} from "@/app/dashboard/wallet/action";
import { useUserStore } from "@/store";
import {
  Session,
  User,
  UserAppMetadata,
  UserMetadata,
} from "@supabase/supabase-js";

const MyBalanceDeposit: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"Deposit" | "Withdrawal">(
    "Deposit"
  );
  const [amount, setAmount] = useState<string>("");
  const [chains, setChain] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any[]>([]);
  const [CurrencyId, setCurrencyId] = useState<number>(1);
  const [walletAmount, setWalletAmount] = useState<number | undefined>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USDT");
  const [network, setNetwork] = useState<string>("");
  const [showCurrencyDropdown, setShowCurrencyDropdown] =
    useState<boolean>(false);
  const [showNetworkDropdown, setShowNetworkDropdown] =
    useState<boolean>(false);
  const [userSession, setusersession] = useState<Session | null>(null);
  const [generatedAddress, setGeneratedAddress] = useState<string>("");
  const [txId, setTxId] = useState<string>("");
  const [isDropdown, setIsdropdown] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  // console.log("the user session", userSession);

  const generateAddress = async () => {
    try {
      if (!network || !currency) return;
      if (!userSession?.user?.id) {
        console.log("user does not exists");
      }

      setloading(true);

      const existing = await GetExistingData(
        userSession?.user?.id,
        currency,
        network
      );

      if (existing.success && existing.data) {
        setGeneratedAddress(existing.data.address);
        setIsdropdown(true);
        return existing.data;
      }

      const res = await fetch("/api/generate-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession}`,
        },
        body: JSON.stringify({
          user_id: userSession?.user?.id,
          coin: currency,
          network: network,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.success && data.wallet) {
        setGeneratedAddress(data.wallet);
        setIsdropdown(true);

        return data;
      } else {
        throw new Error(data.message || "Wallet generation failed");
      }
    } catch (error) {
      console.error(" Wallet generation error:", error);
      throw error;
    } finally {
      setloading(false);
    }
  };

  console.log(network, currency);

  const confirmDeposit = () => {
    if (amount && txId) {
      alert(
        "Deposit confirmed! Your account will be credited within 24 hours."
      );
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const confirmWithdrawal = async () => {
    if (!amount || !walletAddress || !network) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (!walletAmount) return;

    if (parseFloat(amount) > walletAmount) {
      alert("Insufficient balance for this withdrawal.");
      return;
    }
  };

  const getWalletBal = async () => {
    const res = await getUserWallet(userSession?.user?.id);
    if (!res.success) {
      return;
    }

    console.log("user balance", res.data);

    setWalletAmount(res?.data);
  };

  const FetchSelectedChain = async () => {
    if (!CurrencyId) return;

    const res = await fetchChain(CurrencyId);
    if (!res.success) {
      console.log(res.message);
      return;
    }

    console.log("Raw chain data:", res.data);

    const formatted = (res.data ?? []).map((item) => ({
      id: item.id,
      name: item.chain?.name,
      network_code: item.chain?.network_code,
    }));

    setChain(formatted);
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
    setusersession(res?.data ?? null);
  };

  useEffect(() => {
    getWalletBal();
    fetchUserSession();
  }, [userSession?.user?.id]);

  useEffect(() => {
    getAllTokens();
  }, []);

  useEffect(() => {
    FetchSelectedChain();
  }, [CurrencyId]);

  return (
    <div className="min-h-screen bg-[#201d4c] to-purple-900 p-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex md:flex-row items-start md:items-center justify-between md:gap-20 gap-8 flex-col">
            <div>
              <h1 className="text-white text-[20px] md:text-2xl font-semibold mb-1">
                My Active Balance
              </h1>
              <h2 className="text-white text-3xl font-bold text-[20px] md:text-2xl">
                $22,330
              </h2>
            </div>

            <button
              onClick={() => setActiveTab("Deposit")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "Deposit"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-800/40 text-white hover:bg-blue-700/50"
              }`}
            >
              Deposit
            </button>
          </div>

          <div className="flex md:flex-row items-center justify-between md:gap-20 gap-8 flex-col">
            <div className="flex flex-col items-start m-0">
              <h1 className="text-white text-[20px] md:text-2xl font-semibold mb-1">
                My Balance
              </h1>
              <h2 className="text-white text-3xl font-bold text-[20px] md:text-2xl">
                $22,330
              </h2>
            </div>
            <button
              onClick={() => setActiveTab("Withdrawal")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "Withdrawal"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-800/40 text-white hover:bg-blue-700/50"
              }`}
            >
              Withdrawal
            </button>
          </div>
        </div>

        {/* Deposit Form */}
        {activeTab === "Deposit" && (
          <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#37355d]">
            <h2 className="text-white text-xl font-semibold mb-6">Deposit</h2>

            <div className="w-full">
              <label className="text-white text-sm mb-2 block">
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
                  className="w-full bg-[#37355d] border border-[#37355d] rounded-lg pl-8 pr-4 py-3 text-white placeholder-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
              {/* Choose Amount */}

              {/* Choose Currency */}
              <div className="relative">
                <label className="text-white text-sm mb-2 block">
                  Choose Currency
                </label>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-[#37355d] rounded-lg overflow-hidden z-10">
                    {tokens.map((curr) => (
                      <button
                        key={curr.id}
                        onClick={() => {
                          setCurrency(curr.symbol);
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
                <label className="text-white text-sm mb-2 block">
                  Choose Network
                </label>
                <button
                  onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>{network}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showNetworkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-[#37355d] rounded-lg overflow-hidden z-10">
                    {chains.map((chain) => (
                      <button
                        key={chain.id}
                        onClick={() => {
                          setNetwork(chain.network_code);
                          setShowNetworkDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-blue-700 transition-colors"
                      >
                        {chain.name} ({chain.network_code})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-6">
              {/* Generate Address */}
              <div className="w-full ">
                <button
                  onClick={generateAddress}
                  className="w-full bg-[#454368] hover:bg-blue-600/50 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-between space-x-2 px-2"
                >
                  <span>
                    {loading ? "Generating..." : "Generate & Copy Address"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdown && (
                  <div className="mt-3 p-3 bg-[#37355d] rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-mono break-all">
                        {generatedAddress}
                      </span>
                      <Copy className="w-4 h-4 text-white cursor-pointer hover:text-white ml-2" />
                    </div>
                  </div>
                )}
              </div>

              {/* Paste TXID */}
              <div className=" w-full">
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder=" Paste TXID"
                  className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white placeholder-[#9696ae] focus:outline-none focus:border-blue-500"
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
            <p className="text-white text-sm text-center">
              Your Account Will Be Credited Within 24 Hours.
            </p>
          </div>
        )}

        {/* Withdrawal Form (Placeholder) */}
        {activeTab === "Withdrawal" && (
          <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#37355d]">
            <h2 className="text-white text-xl font-semibold mb-6">
              Withdrawal
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-6 w-full md:w-[50%]">
              {/* Choose Amount */}
              <div>
                <label className="text-white text-sm mb-2 block">
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
                    className="w-full bg-[#37355d] border border-[#37355d] rounded-lg pl-8 pr-4 py-3 text-white placeholder-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Choose Currency */}
              <div className="relative">
                <label className="text-white text-sm mb-2 block">
                  Choose Currency
                </label>
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-[#37355d] rounded-lg overflow-hidden z-10">
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
                <label className="text-white text-sm mb-2 block">
                  Add wallet address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="0x1234...abcd"
                    className="w-full bg-[#37355d] border border-[#37355d] rounded-lg pl-8 pr-4 py-3 text-white placeholder-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Choose Network */}
              <div className="relative">
                <label className="text-white text-sm mb-2 block">
                  Choose Network
                </label>
                <button
                  onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  className="w-full bg-[#37355d] border border-[#37355d] rounded-lg px-4 py-3 text-white flex items-center justify-between focus:outline-none focus:border-blue-500"
                >
                  <span>
                    {network.length > 0 ? network[0] : "choose network"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showNetworkDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-blue-800 border border-[#37355d] rounded-lg overflow-hidden z-10">
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
      {activeTab === "Withdrawal" ? (
        <>
          <button
            onClick={confirmWithdrawal}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg mt-6 transition-colors mb-4"
          >
            Withdraw now
          </button>
          <p className="text-white text-sm text-center">
            Congratulations! Your withdrawal is in process. It may take up to 72
            hours.
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyBalanceDeposit;
