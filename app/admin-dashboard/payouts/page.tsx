"use client";

import React, { useState } from "react";
import { Users, FileText, Clock, Check, X } from "lucide-react";

interface PayoutRequest {
  id: number;
  user: string;
  amount: number;
  date: string;
  method: string;
  status: "pending" | "approved" | "completed" | "rejected";
}

const PayoutDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "pending" | "approved" | "completed" | "rejected"
  >("pending");
  const [requests, setRequests] = useState<PayoutRequest[]>([
    {
      id: 1,
      user: "Sarah M.",
      amount: 75.0,
      date: "09/11/25",
      method: "PayPal",
      status: "pending",
    },
    {
      id: 2,
      user: "John P.",
      amount: 120.5,
      date: "09/11/25",
      method: "Bank Transfer",
      status: "pending",
    },
    {
      id: 3,
      user: "Sarah M.",
      amount: 200.0,
      date: "08/11/25",
      method: "PayPal",
      status: "approved",
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id: number) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const filteredRequests = requests.filter((req) => req.status === activeTab);
  const pendingCount = requests.filter(
    (req) => req.status === "pending"
  ).length;

  return (
    <div className="min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Payout Requests</h1>
        <p className="text-slate-400 text-lg">
          Approve Or Reject Pending Withdrawal Requests.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Processed */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/40 backdrop-blur rounded-3xl p-6 border border-indigo-800/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-2">Total Processed</p>
              <h2 className="text-4xl font-bold">$42,300</h2>
            </div>
            <div className="bg-blue-600/20 p-3 rounded-2xl">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/40 backdrop-blur rounded-3xl p-6 border border-indigo-800/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-2">Pending Requests</p>
              <h2 className="text-4xl font-bold">{pendingCount}</h2>
            </div>
            <div className="bg-amber-600/20 p-3 rounded-2xl">
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Avg Processing Time */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/40 backdrop-blur rounded-3xl p-6 border border-indigo-800/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-2">
                Avg. Processing Time
              </p>
              <h2 className="text-4xl font-bold">36 hours</h2>
            </div>
            <div className="bg-orange-600/20 p-3 rounded-2xl">
              <Clock className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800/40 backdrop-blur rounded-3xl p-8 border border-indigo-800/30">
        {/* Header with Tabs */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Payout Requests</h2>

          {/* Tabs */}
          <div className="flex gap-2 bg-slate-900/50 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "pending"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "approved"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "completed"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === "rejected"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 mb-4 px-6 py-4">
            <div className="text-slate-400 font-medium">User</div>
            <div className="text-slate-400 font-medium">Amount</div>
            <div className="text-slate-400 font-medium">Date</div>
            <div className="text-slate-400 font-medium">Method</div>
            <div className="text-slate-400 font-medium">Status</div>
            <div className="text-slate-400 font-medium">Actions</div>
          </div>

          {/* Table Rows */}
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="grid grid-cols-6 gap-4 items-center px-6 py-5 bg-slate-900/30 rounded-2xl mb-3 hover:bg-slate-900/50 transition-all"
            >
              <div className="text-white font-medium">{request.user}</div>
              <div className="text-white font-medium">
                ${request.amount.toFixed(2)}
              </div>
              <div className="text-slate-300">{request.date}</div>
              <div className="text-slate-300">{request.method}</div>
              <div>
                <span
                  className={`inline-block px-5 py-2 rounded-full text-sm font-medium ${
                    request.status === "pending"
                      ? "bg-slate-700/50 text-blue-400"
                      : request.status === "approved"
                      ? "bg-blue-600/30 text-blue-300"
                      : request.status === "completed"
                      ? "bg-green-600/30 text-green-300"
                      : "bg-red-600/30 text-red-300"
                  }`}
                >
                  {request.status}
                </span>
              </div>
              <div className="flex gap-2">
                {request.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700 p-2 rounded-xl transition-all"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-xl transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayoutDashboard;
