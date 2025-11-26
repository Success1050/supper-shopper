"use client";

import React, { useState } from "react";
import { Ticket, CheckCircle, Clock } from "lucide-react";

interface SupportTicket {
  id: string;
  user: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  lastUpdate: string;
  agent: string;
}

const SupportTickets = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "open" | "in-progress" | "resolved"
  >("all");
  const [tickets] = useState<SupportTicket[]>([
    {
      id: "#1024",
      user: "John P.",
      category: "Payment",
      status: "in-progress",
      lastUpdate: "2h ago",
      agent: "Ayesha",
    },
    {
      id: "#1023",
      user: "Sarah M.",
      category: "Account",
      status: "open",
      lastUpdate: "3h ago",
      agent: "Unassigned",
    },
    {
      id: "#1022",
      user: "Alex R.",
      category: "Technical",
      status: "in-progress",
      lastUpdate: "5h ago",
      agent: "Ali",
    },
  ]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "open":
        return "bg-[#2723FF] text-white";
      case "in-progress":
        return "bg-slate-300 text-blue-600";
      case "resolved":
        return "bg-green-600/30 text-green-300";
      default:
        return "bg-slate-300 text-slate-800";
    }
  };

  const filteredTickets =
    activeTab === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === activeTab);

  const openTicketsCount = tickets.filter((t) => t.status === "open").length;
  const resolvedTodayCount = tickets.filter(
    (t) => t.status === "resolved"
  ).length;

  return (
    <div className="min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Support Tickets</h1>
        <p className="text-slate-400 text-lg">
          Manage And Respond To User Tickets Quickly.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Open Tickets */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Open Tickets</p>
              <h2 className="text-4xl font-bold">24</h2>
            </div>
            <div className="bg-[#2723FF]/20 p-3 rounded-2xl">
              <Ticket className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Resolved Today</p>
              <h2 className="text-4xl font-bold">16</h2>
            </div>
            <div className="bg-amber-600/20 p-3 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm mb-2">Avg. Response Time</p>
              <h2 className="text-4xl font-bold">42 mins</h2>
            </div>
            <div className="bg-orange-600/20 p-3 rounded-2xl">
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* All Tickets Section */}
      <div className="bg-[#2b2a54] backdrop-blur rounded-3xl p-6 md:p-8 h-[70vh] flex flex-col">
        {/* Header with Tabs */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">All Tickets</h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900/50 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all ${
                activeTab === "all"
                  ? "bg-[#2723FF] text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("open")}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all ${
                activeTab === "open"
                  ? "bg-[#2723FF] text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Open
            </button>

            <button
              onClick={() => setActiveTab("in-progress")}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all ${
                activeTab === "in-progress"
                  ? "bg-[#2723FF] text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              In Progress
            </button>

            <button
              onClick={() => setActiveTab("resolved")}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all ${
                activeTab === "resolved"
                  ? "bg-[#2723FF] text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Scrollable Table */}
        <div
          className="overflow-y-auto pr-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Make table scroll horizontally on small screens */}
          <div className="min-w-[750px]">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 mb-4 px-6 py-4 sticky top-0 bg-slate-900/40 backdrop-blur z-10">
              <div className="text-slate-400 font-medium text-sm md:text-base">
                Ticket ID
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                User
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                Category
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                Status
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                Last Update
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                Agent
              </div>
            </div>

            {/* Table Rows */}
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-6 gap-4 items-center px-6 py-5 bg-slate-900/30 rounded-2xl mb-3 hover:bg-slate-900/50 transition-all"
              >
                <div className="text-white font-medium text-sm md:text-base">
                  {ticket.id}
                </div>
                <div className="text-white font-medium text-sm md:text-base">
                  {ticket.user}
                </div>

                <div>
                  <span className="inline-block px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium border border-slate-600 text-slate-300">
                    {ticket.category}
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-block px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium ${getStatusStyle(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <div className="text-slate-300 text-sm md:text-base">
                  {ticket.lastUpdate}
                </div>
                <div className="text-slate-300 text-sm md:text-base">
                  {ticket.agent}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
