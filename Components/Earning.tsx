import React from "react";
import Progressbar from "./Progressbar";

export default function EarningsOverviewBox() {
  return (
    <div className="bg-[#2c2954] backdrop-blur-sm rounded-lg p-6 border border-blue-700/50 w-full mt-[15px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Earnings Overview
          </h3>
          {/* Progress bar */}
          <Progressbar width={10} />
          <div className="text-white font-bold text-xl">0/500,000</div>
        </div>

        <div className="flex space-x-6 text-right">
          <div>
            <div className="text-blue-200 text-sm mb-1">Week</div>
            <div className="text-white text-sm">$0</div>
            <div className="text-white text-sm">$0</div>
          </div>
          <div>
            <div className="text-blue-200 text-sm mb-1">Month</div>
            <div className="text-white text-sm">$0</div>
            <div className="text-white text-sm">$0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
