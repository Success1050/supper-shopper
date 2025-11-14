"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface Tasks {
  id: string;
  type: string;
  reward: string;
  plan: string;
  partner: string;
  views: string;
  date: string;
  status: "active" | "suspended";
}

const TasksComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const users: Tasks[] = [
    {
      id: "U-1001",
      type: "Sarah M.",
      reward: "sarah.m@example.com",
      plan: "Premium+",
      partner: "$430",
      views: "$250",
      date: "09 Nov 2025",
      status: "active",
    },
    {
      id: "U-1002",
      type: "John P.",
      reward: "john.p@example.com",
      plan: "Pro",
      partner: "$280",
      views: "$150",
      date: "09 Nov 2025",
      status: "active",
    },
    {
      id: "U-1003",
      type: "Maria K.",
      reward: "maria.k@example.com",
      plan: "VIP",
      partner: "$890",
      date: "09 Nov 2025",
      views: "$600",
      status: "active",
    },
    {
      id: "U-1004",
      type: "Alex R.",
      reward: "alex.r@example.com",
      plan: "Free",
      date: "09 Nov 2025",
      partner: "$45",
      views: "$0",
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
            Task Management
          </h1>
          <p className="text-indigo-300 text-sm md:text-base">
            Manage and track all marketing and engagement tasks.
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
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-indigo-300 hover:bg-indigo-800/60"
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
                    Task ID
                  </th>
                  <th className="text-left text-indigo-300 font-medium text-sm px-6 py-4">
                    Type
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Reward
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Partner
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Views
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-white font-medium text-sm px-6 py-4">
                    Date
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
                      {user.type}
                    </td>
                    <td className="px-6 py-4 text-white text-sm">
                      {user.reward}
                    </td>

                    <td className="px-6 py-4 text-white text-sm font-medium">
                      {user.partner}
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-medium">
                      {user.views}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{user.date}</td>
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

export default TasksComponent;
