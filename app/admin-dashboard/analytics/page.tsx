"use client";

import React from "react";
import { Clock, Ticket, TrendingUp, Star } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "@/Components/StatComponent";

interface AgentProps {
  name: string;
  ticketsHandled: number;
  rating: number;
}

const SupportAnalytics = () => {
  const ticketVolumeData = [
    { month: "Jan", tickets: 400 },
    { month: "Feb", tickets: 600 },
    { month: "Mar", tickets: 500 },
    { month: "Apr", tickets: 800 },
    { month: "May", tickets: 700 },
    { month: "Jun", tickets: 900 },
    { month: "Jul", tickets: 1100 },
    { month: "Aug", tickets: 1300 },
    { month: "Sep", tickets: 1000 },
    { month: "Oct", tickets: 1200 },
    { month: "Nov", tickets: 800 },
    { month: "Dec", tickets: 600 },
  ];

  const agents: AgentProps[] = [
    { name: "Ali R.", ticketsHandled: 180, rating: 4.9 },
    { name: "Ayesha K.", ticketsHandled: 165, rating: 4.8 },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">
            Support Analytics
          </h1>
          <p className="text-white text-sm">
            Measure Performance And Satisfaction Scores.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Clock className="w-5 h-5 text-red-400" />}
            title="Avg Response Time"
            value="42 mins"
            change="-8%"
            isPositive={true}
          />
          <StatCard
            icon={<Ticket className="w-5 h-5 text-yellow-400" />}
            title="Tickets / Day"
            value="58"
            change="+18%"
            isPositive={false}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            title="Resolution Rate"
            value="94%"
            change="+2%"
            isPositive={true}
          />
          <StatCard
            icon={<Star className="w-5 h-5 text-blue-400" />}
            title="Satisfaction"
            value="4.8"
            change="+0.2"
            isPositive={true}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ticket Volume Chart */}
          <div className="bg-[#2b2a54] p-6">
            <h2 className="text-white text-lg font-semibold mb-6">
              Ticket Volume (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ticketVolumeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#4338ca"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="month"
                  stroke="#a5b4fc"
                  tick={{ fill: "#a5b4fc", fontSize: 12 }}
                />
                <YAxis
                  stroke="#a5b4fc"
                  tick={{ fill: "#a5b4fc", fontSize: 12 }}
                  domain={[0, 1400]}
                  ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#312e81",
                    border: "1px solid #4338ca",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Rate */}
          <div className="bg-[#2b2a54] p-6">
            <h2 className="text-white text-lg font-semibold mb-6">
              Resolution Rate
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-indigo-200 text-sm">Resolved</span>
                  <span className="text-indigo-200 text-sm font-medium">
                    84%
                  </span>
                </div>
                <div className="w-full bg-indigo-950/50 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "84%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-indigo-200 text-sm">In Progress</span>
                  <span className="text-indigo-200 text-sm font-medium">
                    4%
                  </span>
                </div>
                <div className="w-full bg-indigo-950/50 rounded-full h-2.5">
                  <div
                    className="bg-purple-500 h-2.5 rounded-full"
                    style={{ width: "4%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-indigo-200 text-sm">Unresolved</span>
                  <span className="text-indigo-200 text-sm font-medium">
                    2%
                  </span>
                </div>
                <div className="w-full bg-indigo-950/50 rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: "2%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-[#2b2a54] overflow-hidden">
          <div className="px-6 py-4 border-b border-indigo-700/50">
            <h2 className="text-white text-lg font-semibold">
              Agent Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indigo-700/50">
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Agent
                  </th>
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Tickets Handled
                  </th>
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Avg. Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent, index) => (
                  <tr
                    key={index}
                    className="border-b border-indigo-800/30 hover:bg-indigo-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-white text-sm">
                      {agent.name}
                    </td>
                    <td className="px-6 py-4 text-indigo-200 text-sm">
                      {agent.ticketsHandled}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">
                          {agent.rating}
                        </span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAnalytics;
