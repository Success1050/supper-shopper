"use client";

import React, { useState } from "react";
import HeaderDashboard from "./HeaderDashboard";

interface HistoryRecord {
  id: string;
  date: string;
  time: string;
  type: string;
  status: "Completed" | "Processing";
  amount: string;
  color: string;
}

const Records: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All History");

  const tabs = [
    "All History",
    "Task Profit",
    "Subscription Purchases",
    "Commission Profit",
    "Career Reward",
    "Salary Reward",
  ];

  const historyRecords: HistoryRecord[] = [
    // {
    //   id: "1",
    //   date: "2025-05-09",
    //   time: "14:35",
    //   type: "Task Profit",
    //   status: "Completed",
    //   amount: "+$0.50",
    //   color: "text-green-400",
    // },
    // {
    //   id: "2",
    //   date: "2025-05-09",
    //   time: "13:22",
    //   type: "Commission Profit",
    //   status: "Completed",
    //   amount: "+$2.75",
    //   color: "text-green-400",
    // },
    // {
    //   id: "3",
    //   date: "2025-05-09",
    //   time: "12:15",
    //   type: "Withdrawal",
    //   status: "Processing",
    //   amount: "-$50.00",
    //   color: "text-red-400",
    // },
    // {
    //   id: "4",
    //   date: "2025-05-08",
    //   time: "16:45",
    //   type: "Deposit",
    //   status: "Completed",
    //   amount: "+$100.00",
    //   color: "text-green-400",
    // },
    // {
    //   id: "5",
    //   date: "2025-05-08",
    //   time: "16:30",
    //   type: "Affiliate Bonus",
    //   status: "Completed",
    //   amount: "+$5.00",
    //   color: "text-green-400",
    // },
    // {
    //   id: "6",
    //   date: "2025-05-08",
    //   time: "14:20",
    //   type: "Career Reward",
    //   status: "Completed",
    //   amount: "+$10.00",
    //   color: "text-green-400",
    // },
  ];

  const getFilteredRecords = () => {
    if (activeTab === "All History") return historyRecords;
    return historyRecords.filter((record) =>
      record.type
        .toLowerCase()
        .includes(activeTab.toLowerCase().replace(" ", ""))
    );
  };

  const filteredRecords = getFilteredRecords();

  return (
    <div className="min-h-screen bg-[#201d4c] p-6">
      <div>
        {/* Header */}
        <h1 className="text-white text-2xl font-semibold mb-8">History</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-[#2b2a54] p-3 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "hover:text-white text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6 border-b border-blue-700/50 flex justify-between items-center flex-wrap">
          <h2 className="text-white text-xl font-semibold">Records</h2>
          <div className="w-[170px] h-[53px] bg-[#2b2149] md:flex justify-center items-center rounded-xl hidden">
            <h2 className="text-xl font-semibold text-[#c3402e]">Delete</h2>
          </div>
        </div>
        {/* Records Section */}
        <div className=" backdrop-blur-sm  overflow-hidden">
          <div className=" max-h-[500px] overflow-y-auto ">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-6 hover:bg-blue-700/20 transition-colors mb-4 bg-[#18409f] border-blue-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="text-blue-200 text-sm">
                          {record.date} - {record.time}
                        </div>
                      </div>
                      <div className="text-white font-medium text-lg">
                        {record.type}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            record.status === "Completed"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-yellow-600/20 text-yellow-400"
                          }`}
                        >
                          {record.status}
                        </span>
                      </div>
                      <div className={`font-bold text-lg ${record.color}`}>
                        {record.amount}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="text-white text-lg">No records found</div>
                <div className="text-white text-sm mt-2">
                  Try selecting a different category
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {/* {filteredRecords.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Total Records</div>
              <div className="text-white font-bold text-xl">
                {filteredRecords.length}
              </div>
            </div>

            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Completed</div>
              <div className="text-green-400 font-bold text-xl">
                {filteredRecords.filter((r) => r.status === "Completed").length}
              </div>
            </div>

            <div className="bg-blue-800/40 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
              <div className="text-blue-200 text-sm mb-1">Processing</div>
              <div className="text-yellow-400 font-bold text-xl">
                {
                  filteredRecords.filter((r) => r.status === "Processing")
                    .length
                }
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Records;
