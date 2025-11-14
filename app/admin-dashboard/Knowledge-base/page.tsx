"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface Article {
  id: number;
  title: string;
  category: string;
  lastUpdated: string;
  status: "Published" | "Draft";
}

const KnowledgeBasePage = () => {
  const [articles] = useState<Article[]>([
    {
      id: 1,
      title: "How to Withdraw Funds",
      category: "Payouts",
      lastUpdated: "08 Nov 2025",
      status: "Published",
    },
    {
      id: 2,
      title: "Getting Started with Tasks",
      category: "Tasks",
      lastUpdated: "07 Nov 2025",
      status: "Published",
    },
    {
      id: 3,
      title: "Understanding Affiliate Commissions",
      category: "Affiliates",
      lastUpdated: "06 Nov 2025",
      status: "Published",
    },
    {
      id: 4,
      title: "Account Security Best Practices",
      category: "Account",
      lastUpdated: "05 Nov 2025",
      status: "Draft",
    },
    {
      id: 5,
      title: "Payment Methods Guide",
      category: "Payouts",
      lastUpdated: "04 Nov 2025",
      status: "Published",
    },
  ]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-white text-sm">
            Manage Support Articles For User Self-Help
          </p>
        </div>

        {/* Articles Section */}
        <div className=" rounded-lg overflow-hidden bg-[#2b2a54]">
          <div className="px-6 py-4">
            <h2 className="text-white text-[26px] py-2.5 font-semibold">
              Help Center Articles
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className=" bg-[#36355d] rounded-[20px] border-4 border-[#2b2a54] my-5">
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Last Updated
                  </th>
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-white text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="bg-[#36355d] hover:bg-indigo-800/20 transition-colors border-4 border-[#2b2a54] rounded-[20px]"
                  >
                    <td className="px-6 py-4 text-white text-sm">
                      {article.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium  text-white border border-white">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white text-sm">
                      {article.lastUpdated}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-4 py-1.5 rounded-md text-xs font-medium ${
                          article.status === "Published"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-400 text-gray-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-indigo-700/50 rounded-md transition-colors"
                          aria-label="Edit article"
                        >
                          <Edit2 className="w-4 h-4 text-white" />
                        </button>
                        <button
                          className="p-2 hover:bg-indigo-700/50 rounded-md transition-colors"
                          aria-label="Delete article"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
