// components/WithdrawalsSection.tsx
"use client";

import { DollarSign, Clock, CreditCard } from "lucide-react";
import { withdrawalFeatures } from "@/constants";

const WithdrawalsSection = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "dollar":
        return <DollarSign size={24} className="text-white" />;
      case "clock":
        return <Clock size={24} className="text-white" />;
      case "card":
        return <CreditCard size={24} className="text-white" />;
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
              FAST & SECURE WITHDRAWALS
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Your earnings are protected with bank-level security and multiple
              cryptocurrency withdrawal options
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Withdrawal Features */}
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                Withdrawal Features
              </h3>

              <div className="space-y-6">
                {withdrawalFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-start space-x-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                      {getIcon(feature.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm lg:text-base">
                        {feature.description}
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
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#2563EB]/20"
                  style={{
                    backgroundImage: "url('/images/laptop.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithdrawalsSection;
