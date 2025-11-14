import React from "react";
import {
  ArrowUp,
  Package,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import DashboardCharts from "@/Components/DashboardCharts";

interface StatCard {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  percent: number;
}

export default function Overview() {
  const stats: StatCard[] = [
    {
      id: 1,
      value: "178",
      label: "Total Products",
      icon: <Package className="w-5 h-5" />,
      iconBg: "bg-blue-500/20 text-blue-400",
      percent: 1.8,
    },
    {
      id: 2,
      value: "20",
      label: "Top Products",
      icon: <ShoppingBag className="w-5 h-5" />,
      iconBg: "bg-yellow-500/20 text-yellow-400",
      percent: 15,
    },
    {
      id: 3,
      value: "190",
      label: "Sales Products",
      icon: <ShoppingCart className="w-5 h-5" />,
      iconBg: "bg-orange-500/20 text-orange-400",
      percent: 20,
    },
    {
      id: 4,
      value: "12",
      label: "Hot Appration",
      icon: <TrendingUp className="w-5 h-5" />,
      iconBg: "bg-purple-500/20 text-purple-400",
      percent: 29,
    },
  ];

  return (
    <div className="bg-[#201d4c] py-6 px-4 md:py-8 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Text */}
        <div className="mb-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">
            Welcome Back, Admin!
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Here's A Quick Look At Your Super Shopper Performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#2b2a54] rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{stat.label}</p>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-1">
                    {stat.value}
                  </h3>
                  <div className="flex items-center">
                    <span>
                      <ArrowUp color="#1EFF00" />
                    </span>
                    <h3 className="text-[#1EFF00]"> {stat.percent}%</h3>
                  </div>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <DashboardCharts />
      </div>
    </div>
  );
}
