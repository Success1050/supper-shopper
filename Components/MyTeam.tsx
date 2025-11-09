"use client";

import React, { useEffect, useState } from "react";
import { Users, Search } from "lucide-react";
import Progressbar from "./Progressbar";
import { useUserStore } from "@/store";
import { getTeamMembers } from "@/app/dashboard/myTeam/actions";
import LoadingBar from "./MainLoading";
import TeamHierarchyList from "./TeamHierarchyList";

export interface TeamMember {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  country: string | null;
  referral_code: string | null;
  personal_referral_code: string | null;
  referrer_id: string | null;
  level: number;
}

const MyTeam: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const res = await getTeamMembers();
      if (res && res.success) {
        console.log("Team Data:", res.data);
        setTeamMembers(res.data ?? []);
      } else {
        console.log("Error loading team", res?.error);
      }
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  // 🧮 Filter for search
  const filteredMembers = teamMembers.filter((member) => {
    const name = `${member.first_name ?? ""} ${member.last_name ?? ""}`.trim();
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.email?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
    );
  });

  const getInitials = (first?: string | null, last?: string | null) => {
    if (!first && !last) return "??";
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-full flex justify-center items-center bg-[#201d4c]">
        <LoadingBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">My Team</h1>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* My Direct Members */}
          <div className="bg-gradient-to-b from-[#2b2954] to-[#1e1b3a] rounded-2xl border border-[#3b376c] p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-black/30">
            <Users className="text-white w-6 h-6 mb-2" />
            <span className="text-white text-xs md:text-sm opacity-80">
              My Direct Members
            </span>
            <span className="text-white font-bold text-lg md:text-2xl mt-1">
              {teamMembers.filter((m) => m.level === 1).length}
            </span>
          </div>

          {/* Total Team Members */}
          <div className="bg-gradient-to-b from-[#2b2954] to-[#1e1b3a] rounded-2xl border border-[#3b376c] p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-black/30">
            <Users className="text-white w-6 h-6 mb-2" />
            <span className="text-white text-xs md:text-sm opacity-80">
              Total Team Members
            </span>
            <span className="text-white font-bold text-lg md:text-2xl mt-1">
              {teamMembers.length}
            </span>
          </div>
        </div>

        {/* Team Earnings */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">
            Team Earnings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-white text-sm mb-1">Today Commission</div>
              <div className="text-[#F54A25] font-bold text-lg">$38.00</div>
            </div>

            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-white text-sm mb-1">Total Commision</div>
              <div className="text-[#2563EB] font-bold text-lg">300</div>
            </div>

            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-white text-sm mb-1">Affiliate Bonus</div>
              <div className="text-[#3EBFD9] font-bold text-lg">$200.00</div>
            </div>

            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-white text-sm mb-1">Career Bonus</div>
              <div className="text-white font-bold text-lg">$400.00</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Task Career Progress */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954]">
            <h3 className="text-white text-[30px] font-semibold mb-4">
              Team Task Career Progress
            </h3>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-white mb-2">
                <div className="text-white text-2xl font-bold mb-2">20</div>

                <div className="flex flex-col justify-center items-end text-end">
                  <span>Next Reward At</span>
                  <span>100</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-white mb-2 flex-wrap">
                <h4>Progress</h4>
                <h4>20%</h4>
              </div>

              <Progressbar width={10} color="bg-white" />

              <div className="text-white text-sm md:flex hidden">
                80 Tasks Remaining To Next Reward
              </div>

              <div className="bg-[#2723ff] w-full md:hidden flex justify-center items-center ounded-xl">
                <button className="p-2 text-center text-white text-[12px] r">
                  <h2 className="text-center"> View Team peference</h2>
                </button>
              </div>
            </div>
          </div>

          {/* Team Hierarchy */}

          <div className="hidden md:flex">
            <TeamHierarchyList
              filteredMembers={filteredMembers}
              getInitials={getInitials}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
