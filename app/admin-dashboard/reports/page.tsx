"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Download, FileDown, ChevronDown } from "lucide-react";

const ReportsAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUN");
  const [showTooltip, setShowTooltip] = useState(false);

  // Payouts vs Income data
  const payoutIncomeData = [
    { month: "JAN", payout: 500, income: 850 },
    { month: "FEB", payout: 700, income: 900 },
    { month: "MAR", payout: 650, income: 820 },
    { month: "APR", payout: 600, income: 750 },
    { month: "MAY", payout: 550, income: 700 },
    { month: "JUN", payout: 700, income: 1200 },
    { month: "JUL", payout: 750, income: 950 },
    { month: "AUG", payout: 650, income: 900 },
    { month: "SEP", payout: 600, income: 850 },
    { month: "OCT", payout: 550, income: 800 },
    { month: "NOV", payout: 500, income: 750 },
  ];

  // ROI by Plan data
  const roiData = [
    { month: "MAR", basic: 650, pro: 400 },
    { month: "ABR", basic: 500, pro: 750 },
    { month: "MAY", basic: 300, pro: 550 },
    { month: "JUN", basic: 500, pro: 650 },
    { month: "JUL", basic: 550, pro: 520 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
          <p className="text-white font-bold mb-2">{selectedMonth}</p>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-slate-300 text-sm">$500</span>
            <span className="text-slate-400 text-sm">11%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-slate-300 text-sm">$1500</span>
            <span className="text-slate-400 text-sm">42%</span>
          </div>
          <div className="border-t border-slate-700 mt-2 pt-2">
            <span className="text-slate-300 text-sm">Total: </span>
            <span className="text-white font-bold text-sm">100%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-slate-400 text-lg">
          Review Business Performance By Plan, Date, Or Region.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-[#2b2a54] rounded-3xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date Range */}
          <div>
            <label className="text-slate-300 text-sm mb-2 block">
              Date Range
            </label>
            <div className="relative">
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-slate-900/70 transition-all">
                <option>Last 30 Days</option>
                <option>Last 60 Days</option>
                <option>Last 90 Days</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="text-slate-300 text-sm mb-2 block">Country</label>
            <div className="relative">
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-slate-900/70 transition-all">
                <option>All Countries</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Plans */}
          <div>
            <label className="text-slate-300 text-sm mb-2 block">Plans</label>
            <div className="relative">
              <select className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:bg-slate-900/70 transition-all">
                <option>All Plans</option>
                <option>Basic</option>
                <option>Pro</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition-all">
            <Download className="w-5 h-5" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-6 py-3 rounded-xl font-medium transition-all">
            <FileDown className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payouts vs Income Chart */}
        <div className="bg-[#2b2a54] -blur rounded-3xl p-6">
          <h3 className="text-2xl font-bold mb-6">Payouts vs Income</h3>

          {/* Legend */}
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-slate-300 text-sm">Payout</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-slate-300 text-sm">Income</span>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={payoutIncomeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
                axisLine={{ stroke: "#334155" }}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
                axisLine={{ stroke: "#334155" }}
                ticks={[0, 100, 300, 600, 900, 1200, 1500]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="payout"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: "#22c55e", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ROI by Plan Chart */}
        <div className="bg-[#2b2a54] -blur rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">ROI by Plan</h3>
            <div className="relative">
              <select
                className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-white appearance-none cursor-pointer hover:bg-slate-900/70 transition-all pr-10"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                tick={{ fill: "#94a3b8" }}
                axisLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="basic"
                stackId="a"
                fill="#93c5fd"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="pro"
                stackId="a"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex gap-6 mt-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-slate-300 text-sm">Basic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-slate-300 text-sm">Pro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
