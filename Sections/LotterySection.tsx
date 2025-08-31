// components/LotterySection.tsx
"use client";

import { lotteryData } from "@/constants";

const LotterySection = () => {
  return (
    <section
      className="py-16 lg:py-24"
      style={{
        background: "linear-gradient(135deg, #2563EB 0%, #0E3488 100%)",
      }}
    >
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {lotteryData.title}
            </h2>
            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-4">
              {lotteryData.subtitle}
            </p>
            <p className="text-sm md:text-base text-white/80">
              {lotteryData.note}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
                  style={{
                    backgroundImage: "url('/images/win.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Right - How Lottery Works */}
            <div className="order-1 lg:order-2 space-y-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                How Lottery Works
              </h3>

              <div className="space-y-6">
                {lotteryData.steps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2563EB] font-bold text-lg lg:text-xl">
                        {step.id}
                      </span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg lg:text-xl font-bold text-white">
                        {step.title}
                      </h4>
                      <p className="text-white/90 text-sm lg:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotterySection;
