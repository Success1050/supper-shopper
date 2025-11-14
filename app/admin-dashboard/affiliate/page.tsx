"use client";

import React from "react";
import { Award, Users, DollarSign, TrendingUp } from "lucide-react";

interface Affiliate {
  id: number;
  user: string;
  directReferrals: number;
  earnings: number;
  level: number;
}

const AffiliateDashboard = () => {
  const affiliates: Affiliate[] = [
    { id: 1, user: "Alex R.", directReferrals: 18, earnings: 210, level: 2 },
    { id: 2, user: "Sarah M.", directReferrals: 12, earnings: 145, level: 2 },
    { id: 3, user: "John P.", directReferrals: 8, earnings: 95, level: 1 },
  ];

  return (
    <div className="min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Affiliate Program</h1>
        <p className="text-slate-400 text-lg">
          Track User Referrals And Commission Performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Total Affiliates */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Total Affiliates</p>
              <h2 className="text-4xl font-bold">540</h2>
            </div>
            <div className="bg-amber-600/20 p-3 rounded-2xl">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Active Referrals */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Active Referrals</p>
              <h2 className="text-4xl font-bold">1,920</h2>
            </div>
            <div className="bg-blue-600/20 p-3 rounded-2xl">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Commissions Paid */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Commissions Paid</p>
              <h2 className="text-4xl font-bold">$5,740</h2>
            </div>
            <div className="bg-orange-600/20 p-3 rounded-2xl">
              <DollarSign className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Avg per Affiliate */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Avg. per Affiliate</p>
              <h2 className="text-4xl font-bold">$10.63</h2>
            </div>
            <div className="bg-green-600/20 p-3 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Top Performers
        </h2>

        {/* Table - Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 mb-4 px-6 py-4">
            <div className="text-slate-400 font-medium">User</div>
            <div className="text-slate-400 font-medium">Direct Referrals</div>
            <div className="text-slate-400 font-medium">Earnings</div>
            <div className="text-slate-400 font-medium">Level</div>
            <div className="text-slate-400 font-medium">Actions</div>
          </div>

          {/* Table Rows */}
          {affiliates.map((affiliate) => (
            <div
              key={affiliate.id}
              className="grid grid-cols-5 gap-4 items-center px-6 py-5 bg-slate-900/30 rounded-2xl mb-3 hover:bg-slate-900/50 transition-all"
            >
              <div className="text-white font-medium">{affiliate.user}</div>
              <div className="text-white font-medium">
                {affiliate.directReferrals}
              </div>
              <div className="text-white font-medium">
                ${affiliate.earnings}
              </div>
              <div>
                <span className="inline-block px-6 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
                  Level {affiliate.level}
                </span>
              </div>
              <div>
                <button className="px-6 py-2 rounded-xl text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800/50 transition-all">
                  View Tree
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden space-y-4">
          {affiliates.map((affiliate) => (
            <div
              key={affiliate.id}
              className="bg-slate-900/30 rounded-2xl p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="text-white font-medium text-lg">
                  {affiliate.user}
                </div>
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                  Level {affiliate.level}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-400 text-sm mb-1">
                    Direct Referrals
                  </p>
                  <p className="text-white font-medium">
                    {affiliate.directReferrals}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Earnings</p>
                  <p className="text-white font-medium">
                    ${affiliate.earnings}
                  </p>
                </div>
              </div>

              <button className="w-full px-4 py-2 rounded-xl text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800/50 transition-all">
                View Tree
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
