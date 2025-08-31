// components/AffiliateSection.tsx
"use client";

import { DollarSign, Users, Trophy } from "lucide-react";
import { commissionStructure } from "@/constants";

const AffiliateSection = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dollar":
        return <DollarSign size={24} className="text-white" />;
      case "user":
        return <Users size={24} className="text-white" />;
      case "trophy":
        return <Trophy size={24} className="text-white" />;
      default:
        return <DollarSign size={24} className="text-white" />;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              EARN MORE BY <span className="text-[#2563EB]">REFERRING</span>{" "}
              OTHERS
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Build your network and earn passive income through our generous
              affiliate program
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Commission Structure */}
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                Commission Structure
              </h3>

              <div className="space-y-6">
                {commissionStructure.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-900">
                          {item.title}
                        </h4>
                        <span className="text-[#2563EB] font-bold text-lg">
                          {item.percentage}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm lg:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=888&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Shopping bags overlay */}
                  <div className="absolute bottom-6 right-6">
                    <div className="flex space-x-2">
                      <div className="w-8 h-10 bg-orange-400 rounded-sm shadow-lg"></div>
                      <div className="w-8 h-10 bg-white rounded-sm shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;
