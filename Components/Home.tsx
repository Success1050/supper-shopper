import React from "react";
import HeaderDashboard from "./HeaderDashboard";
import { Clock } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Progressbar from "./Progressbar";
import EarningsOverviewBox from "./Earning";
import { StatCard } from "./StatsCard";

const DashboardHome = () => {
  return (
    <section className="w-full p-2">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Active Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <ProductCard title="Smart Watch Pro" image="/images/product1.png" />
        <ProductCard title="Wireless Earbuds" image="/images/product2.png" />

        <StatCard title="My Team">
          <div className="space-y-3">
            <div className="text-blue-200 text-sm">Active Members</div>
            <div className="text-blue-200 text-sm">Task Progress</div>
            <div className="text-blue-200 text-sm">Profit Share</div>
            <Progressbar width={10} />
            <div className="text-white font-bold text-xl">0/100,000</div>
          </div>
        </StatCard>

        <StatCard title="My Profit">
          <div className="space-y-3">
            <div className="text-blue-200 text-sm">Packages</div>
            <div className="text-blue-200 text-sm">Daily Tasks</div>
            <div className="text-blue-200 text-sm">Profits</div>
            <div className="text-white text-md font-semibold">$</div>
          </div>
        </StatCard>
        <StatCard title="Task Career Rank">
          <Progressbar width={10} />
          <div className="text-white font-bold text-xl">0/100,000</div>
        </StatCard>
        <StatCard title="All Time Income" value="$500" />
      </div>

      <EarningsOverviewBox />
    </section>
  );
};

export default DashboardHome;
