import { teamVolumeBonusTiers } from "@/constants";
import { ArrowRight } from "lucide-react";
import React from "react";

const TeamVolume = () => {
  return (
    <>
      <div className="mb-12">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
          TEAM VOLUME <span className="text-[#2563EB]">BONUS TIERS</span>
        </h3>

        {/* All Tiers in one flex wrap */}
        <div className="flex flex-wrap justify-center gap-4">
          {teamVolumeBonusTiers.map((tier, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex items-center justify-center w-[160px] h-[160px]"
            >
              <div className="text-center space-y-2 w-full">
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {tier.tier}
                </div>
                <div className="text-lg font-semibold">{tier.volume}</div>
                <div className="text-sm font-medium text-gray-700">Bonus</div>
                <div className="text-[1.3rem] text-[#2563EB]">
                  {tier.period}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <button className="bg-[#2563EB] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto group">
          <span>Grow Your Team</span>
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </>
  );
};

export default TeamVolume;
