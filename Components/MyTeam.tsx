"use client";

import React, { useState } from "react";
import { Users, Search } from "lucide-react";
import Progressbar from "./Progressbar";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  package: string;
  joinDate: string;
  avatar: string;
}

const MyTeam: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const teamMembers: TeamMember[] = [
    {
      id: "JD",
      name: "John Doe",
      email: "john***@gmail.com",
      status: "Active",
      package: "$100 Package",
      joinDate: "Jun 15, 2024",
      avatar: "JD",
    },
    {
      id: "SL",
      name: "Sarah Lopez",
      email: "sar***@yahoo.com",
      status: "Inactive",
      package: "$35 Package",
      joinDate: "Jan 20, 2024",
      avatar: "SL",
    },
    {
      id: "SL2",
      name: "Michael Brown",
      email: "mich***@hotmail.com",
      status: "Active",
      package: "$35 Package",
      joinDate: "Jan 20, 2024",
      avatar: "SL",
    },
    {
      id: "SL3",
      name: "Michael Brown",
      email: "mich***@hotmail.com",
      status: "Active",
      package: "$35 Package",
      joinDate: "Jan 20, 2024",
      avatar: "SL",
    },
    {
      id: "SL4",
      name: "Michael Brown",
      email: "mich***@hotmail.com",
      status: "Active",
      package: "$35 Package",
      joinDate: "Jan 20, 2024",
      avatar: "SL",
    },
  ];

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
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
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="text-blue-300 w-5 h-5" />
              <span className="text-blue-200 text-sm">My Direct Members</span>
            </div>
            <div className="text-white text-3xl font-bold">12</div>
          </div>

          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="text-blue-300 w-5 h-5" />
              <span className="text-blue-200 text-sm">Total Team Members</span>
            </div>
            <div className="text-white text-3xl font-bold">320</div>
          </div>
        </div>

        {/* Team Earnings */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-4">
            Team Earnings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Today Commission</div>
              <div className="text-red-400 font-bold text-lg">$38.00</div>
            </div>

            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Total Commision</div>
              <div className="text-blue-200 font-bold text-lg">-</div>
            </div>

            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Affiliate Bonus</div>
              <div className="text-green-400 font-bold text-lg">$200.00</div>
            </div>

            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Career Bonus</div>
              <div className="text-green-400 font-bold text-lg">$400.00</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Task Career Progress */}
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50">
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
          <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-6 border border-blue-700/50">
            <h3 className="text-white text-lg font-semibold mb-4">
              Team Hierarchy
            </h3>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name and email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-blue-900/50 border border-blue-700/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Team Members List */}
            <div className="space-y-3 h-36 overflow-y-scroll">
              {filteredMembers.map((member) => (
                <div
                  key={`${member.id}-${member.name}`}
                  className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        {member.name}
                      </div>
                      <div className="text-blue-200 text-xs">
                        {member.email}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          member.status === "Active"
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-gray-200"
                        }`}
                      >
                        {member.status}
                      </span>
                      <span className="text-white text-sm">
                        {member.package}
                      </span>
                    </div>
                    <div className="text-blue-200 text-xs">
                      {member.joinDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
