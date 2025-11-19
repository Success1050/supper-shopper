import React from "react";

interface EarningsSummaryProps {
  activeBalance?: number;
  availableBalance?: number;
  dailyRewards?: number;
  weeklyRewards?: number;
  totalReward?: number;
  walletAmount: number | undefined;
  onPayout?: () => void;
}

export default function EarningsSummary({
  availableBalance = 0.0,
  dailyRewards = 0.0,
  weeklyRewards = 0.0,
  totalReward = 0.0,
  walletAmount,
  onPayout,
}: EarningsSummaryProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#2d2954] to-[#1f1b3d] rounded-2xl p-6 shadow-2xl border border-[#3d4167]">
      {/* Header */}
      <h2 className="text-white text-xl font-bold mb-6">Earnings Summary</h2>

      {/* Balance Section */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            My Active Balance
          </span>
          <span className="text-white text-lg font-bold">
            {formatCurrency(walletAmount ?? 0)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            Available Balance
          </span>
          <span className="text-white text-lg font-bold">
            {formatCurrency(availableBalance)}
          </span>
        </div>
      </div>

      {/* Payout Button */}
      <button
        onClick={onPayout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 mb-6 shadow-lg hover:shadow-xl active:scale-95"
      >
        Payout
      </button>

      {/* Rewards Section */}
      <div className="space-y-3 pt-4 border-t border-[#3d4167]">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            Daily Rewards:
          </span>
          <span className="text-white text-base font-bold">
            {formatCurrency(dailyRewards)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            Weekly Rewards:
          </span>
          <span className="text-white text-base font-bold">
            {formatCurrency(weeklyRewards)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm font-medium">
            Total Reward:
          </span>
          <span className="text-white text-lg font-bold">
            {formatCurrency(totalReward)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Example usage:
// <EarningsSummary
//   activeBalance={2450.00}
//   availableBalance={105.00}
//   dailyRewards={20.00}
//   weeklyRewards={500.50}
//   totalReward={25350.00}
//   onPayout={() => console.log('Payout clicked')}
// />
