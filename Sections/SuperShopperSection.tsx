"use client";

import Button from "@/Components/Button";
import React from "react";

interface SuperShopperSectionProps {
  backgroundImage?: string;
  imageOpacity?: number;
  hasButton?: boolean;
  header?: React.ReactNode;
  content?: string;
  mt?: "sm" | "none";
}

export default function SuperShopperSection({
  backgroundImage,
  imageOpacity = 0.5,
  hasButton = false,
  mt = "sm",
  header,
  content,
}: SuperShopperSectionProps) {
  const handleGetStarted = () => {
    // Handle get started action
    console.log("Get started clicked");
  };

  const handleViewPlans = () => {
    // Handle view plans action
    console.log("View plans clicked");
  };

  const ArrowIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );

  const EyeIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  const margin = {
    sm: "mt-20 lg:mt-24 mb-6",
    none: "mt-0",
  };

  return (
    <section className={`md:px-8 px-3 mb-6 ${margin[mt]}`}>
      <div
        className="relative md:w-[95%] w-[98%] mx-auto h-160 overflow-hidden rounded-3xl"
        style={{
          background: backgroundImage
            ? `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%), url(${backgroundImage})`
            : "linear-gradient(180deg, #2563EB 0%, #0E3488 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background Image Layer with Opacity Control */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              opacity: imageOpacity,
            }}
          />
        )}

        {/* Gradient Overlay for better text readability */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{
            background: backgroundImage
              ? "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)"
              : "linear-gradient(180deg, rgba(37, 99, 235, 0.7) 0%, rgba(14, 52, 136, 0.8) 100%)",
          }}
        />

        {/* Background Pattern/Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/10 -translate-y-16 translate-x-16"></div>
          <div className="absolute left-0 bottom-0 w-24 h-24 md:w-36 md:h-36 rounded-full bg-white/5 translate-y-12 -translate-x-12"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/5 transform -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full flex-col">
          {/* Main Content */}
          <div className="text-center mb-8">
            {header}

            <p className="text-white/95 text-sm md:text-base w-[90%] px-0.5 mx-auto leading-relaxed drop-shadow-md">
              {content}
            </p>
          </div>

          {hasButton && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <div className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleGetStarted}
                  fullWidth
                  icon={ArrowIcon}
                >
                  Get Started Now!
                </Button>
              </div>

              <div className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleViewPlans}
                  fullWidth
                  icon={EyeIcon}
                >
                  View Plans
                </Button>
              </div>
            </div>
          )}
          {/* Action Buttons */}
        </div>

        {/* Additional Visual Elements */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div
            className="absolute top-12 right-8 w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-8 left-6 w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </section>
  );
}
