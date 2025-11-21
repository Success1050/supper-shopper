"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/app/dashboard/wallet/action";

interface HeroSectionProps {
  imageUrl?: string;
}

const WhoWeAre: React.FC<HeroSectionProps> = ({
  imageUrl = "/api/placeholder/500/400",
}) => {
  const handleNavigation = async () => {
    const res = await getUserSession();
    if (res && res.success) {
      if (res.data) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } else {
      console.log(res.message);
    }
  };
  const router = useRouter();

  return (
    <section className="w-full px-4 md:px-8 lg:px-24 xl:px-[100px] py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              EMPOWERING PEOPLE.
              <br />
              CONNECTING COMMERCE.
            </h1>

            <p className="text-gray-600 text-base md:text-lg">
              Super shopper is a fir-tech a eronmerce ad businesses interact
              turning everyday engagement into real value.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-[#2563EB] text-white px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-lg"
                onClick={handleNavigation}
              >
                Start Earning Now
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button className="bg-white text-black border-2 border-gray-300 px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 hover:border-gray-400 transition">
                Learn More
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md md:max-w-lg">
              <Image
                src={imageUrl}
                alt="Person with storefront illustration"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
