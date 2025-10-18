"use client";

import React, { useEffect, useState } from "react";
import { Users, Search } from "lucide-react";
import Progressbar from "./Progressbar";
import { useUserStore } from "@/store";
import { getTeamMembers } from "@/app/dashboard/myTeam/actions";

interface TeamMember {
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
      <div className="min-h-screen bg-[#201d4c] flex justify-center items-center text-white">
        Loading team members...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">My Team</h1>
          <p className="text-blue-200 text-sm">
            Manage and track your MLM network performance
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#2b2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954]">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="text-blue-300 w-5 h-5" />
              <span className="text-blue-200 text-sm">My Direct Members</span>
            </div>
            <div className="text-white text-3xl font-bold">
              {teamMembers.filter((m) => m.level === 1).length}
            </div>
          </div>

          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954]">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="text-blue-300 w-5 h-5" />
              <span className="text-blue-200 text-sm">Total Team Members</span>
            </div>
            <div className="text-white text-3xl font-bold">
              {teamMembers.length}
            </div>
          </div>
        </div>

        {/* Team Earnings */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">
            Team Earnings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-blue-200 text-sm mb-1">Today Commission</div>
              <div className="text-red-400 font-bold text-lg">$38.00</div>
            </div>

            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-blue-200 text-sm mb-1">Total Commision</div>
              <div className="text-blue-200 font-bold text-lg">-</div>
            </div>

            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-blue-200 text-sm mb-1">Affiliate Bonus</div>
              <div className="text-green-400 font-bold text-lg">$200.00</div>
            </div>

            <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-4 border border-[#2b2954]">
              <div className="text-blue-200 text-sm mb-1">Career Bonus</div>
              <div className="text-green-400 font-bold text-lg">$400.00</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Task Career Progress */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954]">
            <h3 className="text-white text-lg font-semibold mb-4">
              Team Task Career Progress
            </h3>

            <div className="mb-4">
              <p className="text-blue-200 text-sm mb-2">
                10,000 tasks need for 1$ bonus... count all task from direct to
                10. level
              </p>
              <div className="text-white text-2xl font-bold mb-2">20</div>

              <div className="flex justify-between text-sm text-blue-200 mb-2">
                <span>Progress</span>
                <span>Next Reward At 100</span>
              </div>

              <Progressbar width={10} />

              <div className="text-blue-200 text-sm">
                80 Tasks Remaining To Next Reward
              </div>
            </div>
          </div>

          {/* Team Hierarchy */}
          <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954]">
            <h3 className="text-white text-lg font-semibold mb-4">
              Team Hierarchy
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9696ae] w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name and email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#37355d] border border-[#2b2954] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#9696ae] text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Team Members List */}
            <div className="space-y-3 h-36 overflow-y-scroll">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-[#9696ae] text-sm font-semibold">
                        {getInitials(member.first_name, member.last_name)}
                      </div>
                      <div>
                        <div className="text-[#9696ae] font-medium text-sm">
                          {member.first_name} {member.last_name}
                        </div>
                        <div className="text-[#9696ae] text-xs">
                          {member.email}
                        </div>
                        <div className="text-[#9696ae] text-xs">
                          Level {member.level}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[#9696ae] text-sm text-center">
                  No team members found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
