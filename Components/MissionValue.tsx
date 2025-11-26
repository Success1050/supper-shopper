import React from "react";

const MissionVisionValues: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-24 xl:px-[100px] py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              MISSION
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              To create a global marketplace where real people interact with
              real products and get rewarded for real actions.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
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
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              VISION
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              A trusted engagement ecosystem that connects shoppers and brands
              worldwide, increases transparency in e-commerce, and provides
              measurable value to every participant — from individual users to
              international sellers.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            OUR CORE VALUES
          </h2>
        </div>

        {/* Core Values Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Transparency */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3">
              Transparency
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Clear rules, honest communication, and no hidden promises. What
              you see is what you get.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3">
              Community First
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We grow together. Feedback from early users and sellers shapes
              every step of our product.
            </p>
          </div>

          {/* Innovation */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3">
              Innovation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We simplify complex fintech and engagement models into something
              easy, intuitive, and accessible.
            </p>
          </div>

          {/* Growth */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="w-14 h-14 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-3">
              Real Value Creation
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rewards are tied to real actions, and sellers pay only for
              measurable results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
