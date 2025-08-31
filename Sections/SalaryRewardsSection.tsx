"use client";

import { Calendar, CreditCard, ArrowRight } from "lucide-react";
import { salaryRewards, teamVolumeBonusTiers } from "@/constants";
import TeamVolume from "@/Components/TeamVolume";

const SalaryRewardsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="px-0 md:px-8 lg:px-24 xl:px-[100px]">
        <div className=" mx-auto">
          {/* Salary Rewards Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              GET EXTRA <span className="text-[#2563EB]">SALARY REWARDS</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Earn additional income based on your personal performance and team
              volume
            </p>
          </div>

          {/* Weekly & Monthly Salary Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Weekly Salary */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-[#2563EB] rounded-full flex items-center justify-center">
                  <Calendar size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {salaryRewards.weekly.title}
                </h3>

                <div className="text-3xl font-bold text-[#2563EB]">
                  {salaryRewards.weekly.amount}
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personal Volume:</span>
                    <span className="font-medium">
                      {salaryRewards.weekly.details.personalVolume}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Volume:</span>
                    <span className="font-medium">
                      {salaryRewards.weekly.details.teamVolume}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekly Bonus:</span>
                    <span className="font-bold text-[#2563EB]">
                      {salaryRewards.weekly.details.weeklyBonus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Salary */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto bg-[#2563EB] rounded-full flex items-center justify-center">
                  <CreditCard size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {salaryRewards.monthly.title}
                </h3>

                <div className="text-3xl font-bold text-[#2563EB]">
                  {salaryRewards.monthly.amount}
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personal Volume:</span>
                    <span className="font-medium">
                      {salaryRewards.monthly.details.personalVolume}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Volume:</span>
                    <span className="font-medium">
                      {salaryRewards.monthly.details.teamVolume}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Bonus:</span>
                    <span className="font-bold text-[#2563EB]">
                      {salaryRewards.monthly.details.monthlyBonus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Volume Bonus Tiers */}
          <TeamVolume />
        </div>
      </div>
    </section>
  );
};

export default SalaryRewardsSection;
