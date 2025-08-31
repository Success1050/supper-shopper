// components/EcommerceSection.tsx
"use client";

import { CircleDot, Eye, MousePointer } from "lucide-react";
import { businessStats } from "@/constants";
import React from "react";

interface EcommerceSectionProps {
  leftHeader?: React.ReactNode;
  paragraph?: string;
  lists?: React.ReactNode;
  isList?: boolean;
  button?: React.ReactNode;
  hasButton?: boolean;
  changedOrder?: boolean;
  image?: string;
}

const EcommerceSection = ({
  leftHeader,
  paragraph,
  lists,
  image,
  isList = false,
  button,
  hasButton = false,
  changedOrder = false,
}: EcommerceSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${changedOrder ? "order-2" : ""}`}>
              <div className="space-y-6">
                {leftHeader}
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              </div>

              {isList ? (
                lists
              ) : (
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#2563EB] rounded-full flex items-center justify-center">
                      <Eye size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-[#2563EB]">
                        {businessStats.monthlyViews}
                      </div>
                      <p className="text-gray-600 text-sm lg:text-base">
                        Monthly Views
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#2563EB] rounded-full flex items-center justify-center">
                      <MousePointer size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-2xl lg:text-3xl font-bold text-[#2563EB]">
                        {businessStats.dailyClicks}
                      </div>
                      <p className="text-gray-600 text-sm lg:text-base">
                        Daily Clicks
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {/* Stats */}

              {hasButton ? button : null}
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative">
                <div
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    backgroundImage: image,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Shopping bags overlay */}
                  <div className="absolute bottom-6 left-6">
                    <div className="flex space-x-2">
                      <div className="w-6 h-8 bg-yellow-400 rounded-sm shadow-lg"></div>
                      <div className="w-6 h-8 bg-pink-400 rounded-sm shadow-lg"></div>
                      <div className="w-6 h-8 bg-blue-400 rounded-sm shadow-lg"></div>
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

export default EcommerceSection;
