"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Users, Search, User } from "lucide-react";
import Progressbar from "./Progressbar";
import { useAuthStore } from "@/store";
import { getTeamMembers } from "@/app/dashboard/myTeam/actions";
import LoadingBar from "./MainLoading";
import TeamHierarchyList from "./TeamHierarchyList";
import ComingSoonBanner from "./shortComingSoon";
import EarningsOverviewBox from "./Earning";
import { getProfile, getUserProfile } from "@/app/dashboard/profile/actions";
import { TeamMember } from "@/type";

const MyTeam: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = React.useState(false);
  const [refferralCode, setReferralCode] = useState<string | "">("");
  const userId = useAuthStore((state) => state.userId);

  const affiliateUrl = useMemo(
    () => `https://www.supershopper.app/signup?ref=${refferralCode}`,
    [refferralCode]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [affiliateUrl]);

  // Fetch all data in parallel on mount
  useEffect(() => {
    if (!userId) return;
    const initializeTeamData = async () => {
      setLoading(true);

      try {
        // Fetch all data in parallel
        const [teamRes, profileRes] = await Promise.all([
          getTeamMembers(userId ?? undefined),
          getProfile(userId ?? undefined),
        ]);

        // Set team members
        if (teamRes && teamRes.success) {
          console.log("Team Data:", teamRes.data);
          setTeamMembers(teamRes.data ?? []);
        }

        // Set referral code
        if (profileRes && profileRes.success) {
          setReferralCode(profileRes.data.personal_referral_code);
        }
        console.log("referralcode error", profileRes.message);
      } catch (error) {
        console.error("Error initializing team data:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeTeamData();
  }, [userId]); // Run only once on mount

  // 🧮 Filter for search - memoized
  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const name = `${member.first_name ?? ""} ${
        member.last_name ?? ""
      }`.trim();
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.email?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
      );
    });
  }, [teamMembers, searchQuery]);

  const getInitials = useCallback(
    (first?: string | null, last?: string | null) => {
      if (!first && !last) return "??";
      return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
    },
    []
  );

  // Memoize team stats
  const directMembersCount = useMemo(
    () => teamMembers.filter((m) => m.level === 1).length,
    [teamMembers]
  );

  const totalMembersCount = useMemo(() => teamMembers.length, [teamMembers]);

  if (loading) {
    return (
      <div className="min-h-full flex justify-center items-center bg-[#201d4c]">
        <LoadingBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#201d4c] p-6 pt-0">
      <div>
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-white text-2xl font-semibold">My Team</h1>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* My Direct Members */}
          <div className="bg-[#2b2a5b] rounded-2xl border border-[#3b376c] p-4 md:p-6 md:py-1 hidden items-center justify-center md:flex md:items-center md:justify-between gap-3 ">
            <div className="flex items-center gap-3 md:justify-self-start">
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-[#373575]">
                <User size={36} className="text-white w-6 h-6" />
              </div>
              <h2 className="text-white text-xs md:text-sm">
                My Direct Members
              </h2>
            </div>
            <h2 className="text-white font-bold text-[25px] md:justify-self-end md:self-center">
              {directMembersCount}
            </h2>
          </div>

          <div className="bg-[#2b2a5b] rounded-2xl border border-[#3b376c] p-4 md:p-6 flex flex-col items-center md:hidden gap-3 ">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-[#373575]">
                <User size={36} className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-xs md:text-sm opacity-80">
                  My Direct Members
                </h2>
                <h2 className="text-white font-bold text-lg md:text-2xl">
                  {directMembersCount}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-[#2b2a5b] rounded-2xl border border-[#3b376c] p-4 md:p-6 flex flex-col items-center md:hidden gap-3 ">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-[#373575]">
                <User size={36} className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-xs md:text-sm opacity-80">
                  Total Team Members
                </h2>
                <h2 className="text-white font-bold text-lg md:text-2xl">
                  {totalMembersCount}
                </h2>
              </div>
            </div>
          </div>

          {/* Total Team Members */}
          <div className="bg-[#2b2a5b] rounded-2xl border border-[#3b376c] p-4 md:p-6 hidden items-center justify-center md:flex md:items-center md:justify-between gap-3 ">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-[#373575]">
                <User size={36} className="text-white w-6 h-6" />
              </div>
              <h2 className="text-white text-xs md:text-sm ">
                Total Team Members
              </h2>
            </div>
            <h2 className="text-white font-bold text-[25px]">
              {totalMembersCount}
            </h2>
          </div>
        </div>

        {/* AFFILAITE LINK */}

        <div className="bg-[#2b2a54] backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-[30px] font-semibold">
              Affiliate Link
            </h2>
          </div>

          <div className="flex gap-3">
            {/* Input Field */}
            <div className="flex-1 border border-white rounded-xl px-4 py-3 text-slate-400 text-sm font-mono overflow-hidden">
              <div className="truncate">{affiliateUrl}</div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="text-white px-5 py-3 rounded-xl border-white border-2 font-medium text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-indigo-900/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {copied ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                )}
              </svg>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Team Earnings */}
        <div className="mb-8 bg-[#2b2a54] p-8 rounded-2xl">
          <h2 className="text-white text-[30px] font-semibold mb-4 ">
            Affiliate Marketing
          </h2>
          <div className="grid grid-cols-2 gap-y-4 md:gap-4">
            <div className="bg-[#36355d] backdrop-blur-sm rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none md:rounded-lg p-4 ">
              <h2 className="text-white text-[17px] mb-1 whitespace-nowrap truncate">
                Today Commission
              </h2>
              <div className="text-[#55DF43] font-bold text-[22.8px]">$0</div>
            </div>

            <div className="bg-[#36355d] backdrop-blur-sm rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg md:rounded-lg p-4 ">
              <h2 className="text-white text-[17px] mb-1 whitespace-nowrap truncate">
                Total Commision
              </h2>
              <div className="text-[#55DF43] font-bold text-[22.8px]">$0</div>
            </div>

            <div className="bg-[#36355d] backdrop-blur-sm rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none md:rounded-lg p-4 ">
              <h2 className="text-white text-[17px] mb-1">
                Refferal Bonus today
              </h2>
              <div className="text-[#3EBFD9] font-bold text-[22.8px]">$0</div>
            </div>

            <div className="bg-[#36355d] backdrop-blur-sm rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg md:rounded-lg p-4 ">
              <h2 className="text-white text-[17px] mb-1">
                Refferal Bonus weekly
              </h2>
              <div className="text-[#3EBFD9] font-bold text-[22.8px]">$0</div>
            </div>

            <div className="bg-[#36355d] backdrop-blur-sm  rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none md:rounded-lg p-4 ">
              <h2 className="text-white text-[17px] mb-1">Total commission</h2>
              <div className="text-[#55DF43] font-bold text-[22.8px]">$0</div>
            </div>

            <div className="bg-[#36355d] backdrop-blur-sm rounded-tl-none rounded-bl-none rounded-tr-lg rounded-br-lg md:rounded-lg p-4 ">
              <h2 className="text-white text-[17px] mb-1">
                Total career reward
              </h2>
              <div className="text-[#55DF43] font-bold text-[22.8px]">$0</div>
            </div>
          </div>
        </div>

        <div className="bg-[#2b2a54] rounded-2xl p-6 relative">
          {/* Blurred Content */}
          <div className="blur-sm pointer-events-none">
            {/* Header */}
            <div>
              <h2 className="text-white text-xl font-semibold mb-1">
                Team Task Career Progress
              </h2>
              <p className="text-white text-3xl font-bold">20</p>
            </div>
            <div className="flex justify-end items-start mb-6">
              <div className="text-right">
                <p className="text-white text-sm mb-1">Next Reward At</p>
                <p className="text-white text-2xl font-bold">100</p>
                <p className="text-white text-sm">40%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <p className="text-white text-sm mb-2">Progress</p>
              <Progressbar />
            </div>

            {/* Deposit Button */}
            <button className="w-fit bg-[#2723FF] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              Deposit
            </button>
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                Coming Soon
              </h3>
              <p className="text-white/70 text-sm md:text-base">
                This feature will be available shortly
              </p>
            </div>
          </div>
        </div>

        
        {/* Team Hierarchy List */}
        <div className="mb-8">
            <TeamHierarchyList 
                filteredMembers={filteredMembers}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                getInitials={getInitials}
            />
        </div>

      </div>
    </div>
  );
};

export default MyTeam;
