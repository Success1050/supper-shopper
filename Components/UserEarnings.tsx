"use client";

import { Award, DollarSign, TrendingUp, Trophy, Wallet } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const UserEarnings = ({
  walletAmount,
}: {
  walletAmount: number | undefined;
}) => {
  const router = useRouter();
  return (
    <div className="bg-[#292852] rounded-2xl p-6 h-fit w-[500px]">
      <h2 className="text-white text-lg font-semibold mb-6">
        Earnings Summary
      </h2>

      <div className="space-y-4">
        {/* My Active Balance */}
        <div className="flex items-center gap-4 bg-[#323159] p-4 rounded-[20px]">
          <Wallet className="w-5 h-5 text-white" />
          <div>
            <div className="text-gray-400 text-xs">My Active Balance</div>
            <div className="text-white text-lg font-bold">$0</div>
          </div>
        </div>

        {/* Available Balance */}
        <div className="flex items-center gap-4 bg-[#323159] p-4 rounded-[20px]">
          <DollarSign className="w-5 h-5 text-white" />
          <div>
            <div className="text-gray-400 text-xs">Available Balance</div>
            <div className="text-white text-lg font-bold">
              ${walletAmount?.toFixed(2) ?? 0}
            </div>
          </div>
        </div>

        {/* Daily Rewards */}
        <div className="flex items-center gap-4 bg-[#323159] p-4 rounded-[20px]">
          <Trophy className="w-5 h-5 text-white" />

          <div>
            <div className="text-gray-400 text-xs">Daily Rewards:</div>
            <div className="text-white text-lg font-bold">$0</div>
          </div>
        </div>

        {/* Weekly Rewards */}
        <div className="flex items-center gap-4 bg-[#323159] p-4 rounded-[20px]">
          <Award className="w-5 h-5 text-white" />
          <div>
            <div className="text-gray-400 text-xs">Weekly Rewards:</div>
            <div className="text-white text-lg font-bold">$0</div>
          </div>
        </div>

        {/* Total Reward */}
        <div className="flex items-center gap-4 bg-[#323159] p-4 rounded-[20px]">
          <TrendingUp className="w-5 h-5 text-white" />
          <div>
            <div className="text-gray-400 text-xs">Total Reward:</div>
            <div className="text-white text-lg font-bold">$0</div>
          </div>
        </div>
      </div>

      <button
        className="w-fit mt-6 bg-[#2723FF] hover:bg-blue-700 text-white font-semibold py-2.5 px-23 rounded-lg transition-colors"
        onClick={() => router.push("/dashboard/wallet")}
      >
        Deposit
      </button>
    </div>
  );
};

export default UserEarnings;
