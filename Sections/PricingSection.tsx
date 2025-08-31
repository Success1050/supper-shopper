// components/PricingSection.tsx
"use client";

import { Check, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/constants";

const PricingSection = ({ bg }: { bg?: string }) => {
  return (
    <section className={`py-16 lg:py-24 bg-${bg}`}>
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              CHOOSE YOUR PLAN & START
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2563EB] mb-6">
              EARNING DAILY
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              The higher the plan, the higher the tasks & income.
            </p>
            <div className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-full text-sm md:text-base">
              All plans include daily guaranteed earnings
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-105 ${
                  plan.isPopular
                    ? "bg-white shadow-2xl border-2 border-[#2563EB]"
                    : "bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200"
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#2563EB] text-white px-4 py-2 rounded-full text-sm font-medium">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center space-y-6">
                  {/* Plan Name */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="text-3xl lg:text-4xl font-bold text-[#2563EB]">
                      {plan.price}
                    </div>
                    <p className="text-gray-600">{plan.period}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 text-left">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check
                          size={20}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-sm lg:text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Subscribe Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 group ${
                      plan.isPopular
                        ? "bg-[#2563EB] text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Money-back Guarantee */}
          <div className="text-center">
            <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto">
              <span className="font-medium">
                All Plans Come With A 7-Day Money-Back Guarantee
              </span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
