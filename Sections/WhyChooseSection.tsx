// components/WhyChooseSection.tsx
"use client";

import { Shield, Coins, Users, Target } from "lucide-react";
import { whyChooseFeatures } from "@/constants";

const WhyChooseSection = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <Shield size={32} className="text-white" />;
      case "coins":
        return <Coins size={32} className="text-white" />;
      case "users":
        return <Users size={32} className="text-white" />;
      case "target":
        return <Target size={32} className="text-white" />;
      default:
        return <Shield size={32} className="text-white" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              WHY CHOOSE <span className="text-[#2563EB]">SUPER SHOPPER</span>?
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-[#2563EB] rounded-full flex items-center justify-center">
                    {getIcon(feature.icon)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
