"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  earnings: string;
  withdrawn: string;
  status: "active" | "suspended";
}

const User: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const users: User[] = [
    {
      id: "U-1001",
      name: "Sarah M.",
      email: "sarah.m@example.com",
      plan: "Premium+",
      earnings: "$430",
      withdrawn: "$250",
      status: "active",
    },
    {
      id: "U-1002",
      name: "John P.",
      email: "john.p@example.com",
      plan: "Pro",
      earnings: "$280",
      withdrawn: "$150",
      status: "active",
    },
    {
      id: "U-1003",
      name: "Maria K.",
      email: "maria.k@example.com",
      plan: "VIP",
      earnings: "$890",
      withdrawn: "$600",
      status: "active",
    },
    {
      id: "U-1004",
      name: "Alex R.",
      email: "alex.r@example.com",
      plan: "Free",
      earnings: "$45",
      withdrawn: "$0",
      status: "active",
    },
  ];

  const tabs = ["All", "Active", "Suspended", "VIP", "Free Plan"];

  const filteredUsers = users.filter((user) => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return user.status === "active";
    if (activeTab === "Suspended") return user.status === "suspended";
    if (activeTab === "VIP") return user.plan === "VIP";
    if (activeTab === "Free Plan") return user.plan === "Free";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#201d4c] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
            User Management
          </h1>
          <p className="text-indigo-300 text-sm md:text-base">
            View And Control All Registered Users, Their Plans, And Activity.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#2b2a54] overflow-hidden">
          {/* Card Header with Tabs */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-white text-2xl font-semibold">All Users</h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#36355d] rounded-[16px] p-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#2723FF] text-white shadow-lg shadow-blue-600/30"
                      : "bg-indigo-800/40 text-indigo-300 hover:bg-indigo-800/60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-t border-b border-indigo-800/30">
                  <th className="text-left text-indigo-300 font-medium text-sm px-6 py-4">
                    ID
                  </th>
                  <th className="text-left text-indigo-300 font-medium text-sm px-6 py-4">
                    Name
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Email
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Plan
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Earnings
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Withdrawn
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b border-indigo-800/20 hover:bg-indigo-800/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-white text-sm">{user.id}</td>
                    <td className="px-6 py-4 text-white text-sm">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-white text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#403f65] text-white text-xs font-medium">
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-medium">
                      {user.earnings}
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-medium">
                      {user.withdrawn}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-4 py-1 rounded-full bg-[#2723FF] text-white text-xs font-medium">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-[50%] border-2 border-white hover:bg-indigo-800/60 text-white hover:text-white transition-all"
                          aria-label="Edit user"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="p-2 rounded-[50%] border-2 border-white hover:bg-red-600/20 text-white hover:text-red-400 transition-all"
                          aria-label="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State (if no users found) */}
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-white text-lg">
                No users found for this filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
