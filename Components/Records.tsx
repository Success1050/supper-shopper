"use client";

import React, { useEffect, useState } from "react";
import HeaderDashboard from "./HeaderDashboard";
import { HistoryRecord } from "@/type";
import { useAuthStore } from "@/store";
import { fetchHistoryRecords, fetchSubscriptions } from "@/app/dashboard/records/action";


const Records: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All History");
  const [historyRecords, setHistoryRecords] = useState<HistoryRecord[]>([]);
  const userId = useAuthStore((state) => state.userId);

  const tabs = [
    "All History",
    "Task Profit",
    "Subscription Purchases",
    "Commission Profit",
    "Career Reward",
    "Deposits",
    "Withdrawals",
  ];

  useEffect(()=> {
    const getUserRecords = async() => {
const [historyRes, subscriptionsRes] = await Promise.all([
  fetchHistoryRecords(userId || undefined),
  fetchSubscriptions(userId || undefined)
])

if (historyRes && historyRes.success) {
  setHistoryRecords(historyRes.data as HistoryRecord[])
}else {
  console.log('historyRes.error', historyRes.error);
}

if (subscriptionsRes && subscriptionsRes.success) {
  setHistoryRecords((prev)=> [...prev, ...subscriptionsRes.data as HistoryRecord[]])
  console.log('subss', subscriptionsRes.data);
  
}else {
  console.log('subscriptionsRes.error', subscriptionsRes.error);
}

}
    getUserRecords()
  }, [userId])



  const formatDate = (createdAt: string) => {
const dateObj = new Date(createdAt);

const formattedDate = dateObj.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const formattedTime = dateObj.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

return {formattedDate, formattedTime}
  }




 // {
    //   id: "1",
    //   date: "2025-05-09",
    //   time: "14:35",
    //   type: "Task Profit",
    //   status: "Completed",
    //   amount: "+$0.50",
    //   color: "text-green-400",
    // },



  const getFilteredRecords = () => {
    if (activeTab === "All History") return historyRecords;
    return historyRecords.filter((record) => record.type === activeTab);
  };

  const filteredRecords = getFilteredRecords();

  return (
    <div className="min-h-screen bg-[#201d4c] p-4">
      <div>
        {/* Header */}
        <h1 className="text-white text-2xl font-semibold mb-8">History</h1>

        {/* Tabs */}
        <div className="grid grid-cols-3 md:grid-cols-7 items-center justify-center gap-y-3 md:mb-8 mb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={` py-2 text-white text-sm whitespace-nowrap font-medium transition-colors ${
                activeTab === tab
                  ? "border-b border-white"
                  : "hover:text-white text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6 flex justify-between items-center flex-wrap">
          <h2 className="text-white text-xl font-semibold">Records</h2>
        </div>
        {/* Records Section */}
        <div className=" backdrop-blur-sm  overflow-hidden">
          <div className=" max-h-[500px] overflow-y-auto ">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-6 transition-colors mb-4 bg-gradient-to-r from-[#2563EB] to-[#0A2B74] rounded-[10px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h2 className="text-white text-[16px]">
                          {formatDate(record.created_at).formattedDate} - {formatDate(record.created_at).formattedTime}
                        </h2>
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
                      <h2 className={`font-bold text-lg text-white`}>
                        {record.type == "Subscription Purchases" ? "-" : "+"}
                        ${record.amount}
                      </h2>
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
