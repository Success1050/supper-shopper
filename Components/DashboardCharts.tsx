"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const DashboardCharts: React.FC = () => {
  const tasksData = [
    { day: "MON", completed: 75, pending: 15 },
    { day: "TUE", completed: 20, pending: 120 },
    { day: "WED", completed: 25, pending: 5 },
    { day: "THU", completed: 85, pending: 5 },
    { day: "FRI", completed: 15, pending: 50 },
    { day: "SAT", completed: 20, pending: 120 },
    { day: "SUN", completed: 55, pending: 45 },
  ];

  const payoutsData = [
    { month: "JAN", payout: 300, income: 600 },
    { month: "FEB", payout: 450, income: 650 },
    { month: "MAR", payout: 550, income: 700 },
    { month: "APR", payout: 600, income: 650 },
    { month: "MAY", payout: 400, income: 500 },
    { month: "JUN", payout: 500, income: 750 },
    { month: "JUL", payout: 100, income: 900 },
    { month: "AUG", payout: 600, income: 700 },
    { month: "SEP", payout: 550, income: 650 },
    { month: "OCT", payout: 500, income: 750 },
    { month: "NOV", payout: 400, income: 600 },
  ];

  return (
    <div className="min-h-screen pt-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Completed per Day Chart */}
        <div className="bg-indigo-900/40 backdrop-blur-sm rounded-2xl p-6 border border-indigo-800/30">
          <div className="mb-2">
            <p className="text-indigo-300 text-sm font-medium">Spendings</p>
            <h2 className="text-white text-2xl md:text-3xl font-semibold">
              Tasks Completed per Day
            </h2>
          </div>

          <div className="mt-6 h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <div className="relative h-full">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[200, 150, 100, 50, 0].map((val) => (
                    <div
                      key={val}
                      className="border-t border-indigo-800/30"
                    ></div>
                  ))}
                </div>

                {/* Bars */}
                <div className="relative h-full flex items-end justify-around px-4">
                  {tasksData.map((item, idx) => {
                    const total = item.completed + item.pending;
                    const completedHeight = (item.completed / 200) * 100;
                    const pendingHeight = (item.pending / 200) * 100;

                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-2 flex-1 max-w-[60px]"
                      >
                        <div
                          className="w-full flex flex-col items-center"
                          style={{ height: "85%" }}
                        >
                          <div
                            className="w-full flex flex-col justify-end"
                            style={{ height: "100%" }}
                          >
                            <div
                              className="w-full bg-indigo-200/80 rounded-t-lg"
                              style={{ height: `${pendingHeight}%` }}
                            ></div>
                            <div
                              className="w-full bg-indigo-500 rounded-b-lg"
                              style={{ height: `${completedHeight}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-indigo-300 text-xs font-medium">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payouts vs Income Chart */}
        <div className="bg-indigo-900/40 backdrop-blur-sm rounded-2xl p-6 border border-indigo-800/30">
          <div className="mb-2 flex justify-between items-start">
            <h2 className="text-white text-2xl md:text-3xl font-semibold">
              Payouts vs Income
            </h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-indigo-300">Payout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-indigo-300">Income</span>
              </div>
            </div>
          </div>

          <div className="mt-6 h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={payoutsData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#4c1d95"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  stroke="#a5b4fc"
                  tick={{ fill: "#a5b4fc", fontSize: 12 }}
                  axisLine={{ stroke: "#4c1d95" }}
                />
                <YAxis
                  stroke="#a5b4fc"
                  tick={{ fill: "#a5b4fc", fontSize: 12 }}
                  axisLine={{ stroke: "#4c1d95" }}
                  ticks={[0, 300, 600, 900, 1200, 1500]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#312e81",
                    border: "1px solid #4c1d95",
                    borderRadius: "8px",
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
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex items-center mt-0 gap-2">
          <button className="w-[166px] h-auto rounded-[30px] py-[22px] bg-[#2563eb] text-white">
            Manage Users
          </button>
          <button className="w-fit h-auto rounded-[30px] py-[22px] border-2 border-white px-8 text-white">
            View Payout Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
