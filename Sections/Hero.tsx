// components/HeroSection.tsx
"use client";

import { ChevronRight, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden mt-20 lg:mt-13">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-8 h-8 text-[#2563EB] opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.84L12 19.77L6.82 22.84L8 14.74L2 9L9.91 8.26L12 2Z" />
        </svg>
      </div>
      <div className="absolute top-32 left-1/4 w-6 h-6 text-[#2563EB] opacity-20">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      <div className="relative px-4 md:px-8 lg:px-24 xl:px-[100px] py-8 lg:py-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-200px)]">
            {/* Left Content */}
            <div className="order-1 lg:order-2 space-y-6 lg:space-y-8 ">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  TURN YOUR
                  <br />
                  SHOPPING INTO
                  <br />
                  <span className="text-[#2563EB]">DAILY PROFITS</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-md">
                  Join Super Shopper - where buyers earn crypto rewards and
                  sellers grow their business
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Complete simple tasks, earn daily profits
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Help brands increase their visibility and sales
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Get paid in cryptocurrency with easy withdrawals
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm md:text-base">
                    Multi-level affiliate program for extra earnings
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group">
                  <span className="font-medium">Start Earning Now</span>
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 group">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Right Images */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative w-full max-w-[603px] mx-auto">
                {/* Main large image container */}
                <div
                  className="relative w-full aspect-[603/697] rounded-tl-[120px] md:rounded-tl-[180px] lg:rounded-tl-[250px] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100"
                  style={{
                    backgroundImage: "url('/images/big-img.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Woman with laptop showing chart */}
                </div>

                {/* Overlapping round image */}
                <div
                  className="absolute -left-4 md:-left-6 lg:-left-8 top-0 w-24 h-24 md:w-32 md:h-32 lg:w-[209px] lg:h-[209px] rounded-full overflow-hidden shadow-lg border-4 border-white"
                  style={{
                    backgroundImage: "url('/images/small-img.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Shopping bags overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-2 left-2 md:top-4 md:left-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-4 md:w-4 md:h-5 bg-red-400 rounded-sm"></div>
                      <div className="w-3 h-4 md:w-4 md:h-5 bg-blue-400 rounded-sm"></div>
                      <div className="w-3 h-4 md:w-4 md:h-5 bg-green-400 rounded-sm"></div>
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

export default HeroSection;
