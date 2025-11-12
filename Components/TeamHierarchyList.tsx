import React from "react";
import { TeamMember } from "./MyTeam";
import { Search } from "lucide-react";

interface Member {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  referral_code: string;
  personal_referral_code: string;
  referrer_id: string | null;
  level: number;
}

interface TeamHierarchyListProps {
  filteredMembers: TeamMember[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  getInitials: (firstName: string, lastName: string) => string;
}

export default function TeamHierarchyList({
  filteredMembers,
  searchQuery,
  getInitials,
  setSearchQuery,
}: TeamHierarchyListProps) {
  return (
    <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-[#2b2954] w-full">
      <h3 className="text-white text-[30px] font-semibold mb-4">
        Team Hierarchy
      </h3>

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
      <div className="space-y-3 h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-900/20">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-xl p-4 hover:bg-[#454169] transition-all"
            >
              {/* Left Section: Avatar + Name/Email */}
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg">
                  {getInitials(member.first_name ?? "", member.last_name ?? "")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-semibold text-base">
                      {member.first_name} {member.last_name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500 text-white w-[70px] h-[31px] text-center flex justify-center items-center">
                      Active
                    </span>
                  </div>
                  <div className="text-white text-sm truncate">
                    {member.email}
                  </div>
                </div>
              </div>

              {/* Right Section: Package + Date */}
              <div className="text-right ml-4">
                <div className="text-white font-semibold text-base mb-1">
                  $100
                </div>
                <div className="text-gray-400 text-sm">Jan 15 2024</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-sm text-center">
              No team members found
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
