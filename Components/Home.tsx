import React from "react";
import HeaderDashboard from "./HeaderDashboard";
import { Clock } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Progressbar from "./Progressbar";
import EarningsOverviewBox from "./Earning";
import { StatCard } from "./StatsCard";
import { RiTeamLine } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import EarningsSummary from "./smallscreenearningbox";

const DashboardHome = () => {
  return (
    <section className="w-full p-2 bg-[#201d4c]">
      <div className="md:hidden mb-3">
        <EarningsSummary />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Active Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
        <ProductCard title="Smart Watch Pro" image="/images/product1.png" />
        <ProductCard title="Wireless Earbuds" image="/images/product2.png" />

        <div className="w-full bg-[#292852] hidden md:block rounded-lg p-6 text-white">
          <h2 className="text-sm font-semibold mb-6">Earnings Summary</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border-b border-indigo-800 bg-[#323159]">
              <div className="bg-indigo-800/50 rounded-lg p-2">
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
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-indigo-300 mb-1">Daily Reward</p>
                <p className="text-lg font-bold">$18.75</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#323159]">
              <div className="bg-indigo-800/50 rounded-lg p-2">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-indigo-300 mb-1">Total Reward</p>
                <p className="text-lg font-bold">$680</p>
              </div>
            </div>
          </div>
        </div>

        <StatCard title="Team Overview">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <RiTeamLine color="white" />
              <p className="text-xs text-white text-[15px] font-normal mb-1">
                Members: <span className="text-white text-[16px]">12</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaRegCheckCircle color="white" />
              <p className="text-xs text-white text-[15px] font-normal mb-1">
                Taskscompleted
              </p>
            </div>
            <Progressbar width={10} />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              View tasks
            </button>
          </div>
        </StatCard>

        <div className="md:flex hidden">
          <StatCard title="Active products">
            <div className="text-white font-bold text-2xl">3</div>
            <div className="text-white font-medium text-sm">
              Active Products
            </div>
            <button className="bg-[#55DF43] text-white px-4 py-2 rounded-lg text-sm font-medium">
              Complete a task
            </button>
          </StatCard>
        </div>
        <div className="md:flex hidden">
          <StatCard title="All Time Income" value="$500" />
        </div>
      </div>

      <div className="hidden md:block">
        <EarningsOverviewBox />
      </div>
    </section>
  );
};

export default DashboardHome;
