import React from "react";

interface CareerRewardsBannerProps {
  headerTitle?: string;
  headerDescription?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  footerText?: string;
}

const CareerRewardsBanner: React.FC<CareerRewardsBannerProps> = ({
  headerTitle = "Career Rewards & Progress",
  headerDescription = "Grow Your Journey With Super Shopper — Unlock New Levels, Bonuses, And Team Rewards As You Progress!",
  bannerTitle = "Your Career Dashboard Is On The Way!",
  bannerDescription = "Track Your Milestones, Achievements, And Exclusive Career Rewards Right Here.",
  footerText = "Stay Tuned — Exciting Updates And Reward Features Are Being Developed To Take Your Super Shopper Experience To The Next Level.",
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div>
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-3">
            {headerTitle}
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            {headerDescription}
          </p>
        </div>

        {/* Coming Soon Banner Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 mb-6">
          {/* Coming Soon Header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🚀</span>
            <h3 className="text-white text-base md:text-lg font-bold">
              Coming Soon
            </h3>
          </div>

          {/* Title */}
          <h4 className="text-white text-lg md:text-xl font-bold mb-3">
            {bannerTitle}
          </h4>

          {/* Description */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {bannerDescription}
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-white/70 text-xs md:text-sm leading-relaxed">
          {footerText}
        </p>
      </div>
    </div>
  );
};

export default CareerRewardsBanner;
