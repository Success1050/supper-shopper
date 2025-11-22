import React from "react";
import HomeHeader from "./HomEHeader";

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2563EB] to-[#55DF43] mx-4 mt-4 rounded-t-[40px]">
      <HomeHeader />
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              WHERE COMMERCE
              <br />
              MEETS ENGAGMENT
            </h1>
            <p className="text-white text-lg md:text-xl opacity-90">
              Earn While Helping Brands
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/hero.png"
              alt="Commerce Engagement Illustration"
              className="w-full max-w-md md:max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
