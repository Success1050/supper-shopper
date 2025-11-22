import React from "react";

interface AffiliateStatsProps {
  todayCommission?: string;
  totalCommission?: string;
  referralBonusToday?: string;
  totalCommission2?: string;
  careerBonus?: string;
  referralBonusTotal?: string;
}

const AffiliateMarketingStats: React.FC<AffiliateStatsProps> = ({
  todayCommission = "$35.00",
  totalCommission = "$100.00",
  referralBonusToday = "$200.00",
  totalCommission2 = "$750.00",
  careerBonus = "$300.00",
  referralBonusTotal = "$600.00",
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <h2 className="text-white text-xl font-bold mb-6">
          Affiliate Marketing
        </h2>

        {/* Stats Grid */}
        <div className="space-y-4">
          {/* Row 1 - Today Commission & Total Commission */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Today Commission</p>
              <p className="text-[#4ade80] text-2xl font-bold">
                {todayCommission}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white/80 text-sm mb-2">Total Commission</p>
              <p className="text-[#4ade80] text-2xl font-bold">
                {totalCommission}
              </p>
            </div>
          </div>

          {/* Row 2 - Referral Bonus Today */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-2">Referral Bonus Today</p>
            <p className="text-[#4ade80] text-2xl font-bold">
              {referralBonusToday}
            </p>
          </div>

          {/* Row 3 - Total Commission */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-2">Total Commision</p>
            <p className="text-[#4ade80] text-2xl font-bold">
              {totalCommission2}
            </p>
          </div>

          {/* Row 4 - Career Bonus */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-2">Career Bonus</p>
            <p className="text-[#4ade80] text-2xl font-bold">{careerBonus}</p>
          </div>

          {/* Row 5 - Referral Bonus Total */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-2">Referral Bonus Total</p>
            <p className="text-[#4ade80] text-2xl font-bold">
              {referralBonusTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateMarketingStats;
