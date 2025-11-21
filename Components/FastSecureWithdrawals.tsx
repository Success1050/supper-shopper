import React from "react";
import Image from "next/image";

interface WithdrawalsProps {
  imageUrl?: string;
}

const FastSecureWithdrawals: React.FC<WithdrawalsProps> = ({
  imageUrl = "/api/placeholder/600/400",
}) => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-24 xl:px-[100px] py-16 md:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            FAST & SECURE WITHDRAWALS
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Your earnings are protected with bank-level security and multiple
            cryptocurrency withdrawal options
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
          {/* Left Side - Features List */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-8">
              Withdrawal Features
            </h3>

            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg md:text-xl font-bold text-black mb-2">
                  Minimum Withdrawal $10
                </h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Low minimum threshold for easy access to your earnings
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg md:text-xl font-bold text-black mb-2">
                  Processing Time 12-72 Hours
                </h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Fast processing for quick access to your funds
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg md:text-xl font-bold text-black mb-2">
                  Fee 10%
                </h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Winners are notified and prizes are delivered within 30 days
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="rounded-3xl overflow-hidden border-4 border-[#2563EB] shadow-2xl">
                <Image
                  src={imageUrl}
                  alt="Withdrawal system on laptop"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastSecureWithdrawals;
