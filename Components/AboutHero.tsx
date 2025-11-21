import React from "react";
import Image from "next/image";

interface WhoWeAreProps {
  imageUrl?: string;
}

const AboutHero: React.FC<WhoWeAreProps> = ({
  imageUrl = "/api/placeholder/400/500",
}) => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-24 xl:px-[100px] py-16 md:py-24 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm">
              <div className="rounded-3xl overflow-hidden border-8 border-[#2563EB] shadow-2xl">
                <Image
                  src={imageUrl}
                  alt="Woman with shopping bag"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              WHO WE ARE
            </h2>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              super shopper is a fintech and e-commerce platform that connects
              users, brands, and marketplaces through digital engagement.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              our mission is to make online interaction meaningful helping users
              earn and businesses grow through visibility and engagement.
            </p>

            {/* Alert Box */}
            <div className="bg-white border-2 border-[#2563EB] rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black text-base md:text-lg mb-2">
                    Super Shopper Is Currently A Pilot Project.
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    there are no guarantees of earnings or profits we are
                    building this together testing a new way to connect people
                    and e-commerce.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
