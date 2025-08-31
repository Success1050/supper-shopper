// components/FAQSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqData } from "@/constants";

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              FREQUENTLY ASKED <span className="text-[#2563EB]">QUESTIONS</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    backgroundImage: "url('/images/questions.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Shopping bags overlay */}
                  <div className="absolute bottom-6 right-6">
                    <div className="flex space-x-2">
                      <div className="w-6 h-8 bg-pink-400 rounded-sm shadow-lg"></div>
                      <div className="w-6 h-8 bg-white rounded-sm shadow-lg"></div>
                      <div className="w-6 h-8 bg-yellow-400 rounded-sm shadow-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - FAQ Items */}
            <div className="order-1 lg:order-2 space-y-4">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {item.id}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm lg:text-base">
                        {item.question}
                      </span>
                    </div>
                    <div className="text-[#2563EB] flex-shrink-0">
                      {openItems.includes(item.id) ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openItems.includes(item.id)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4 pl-18">
                      <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
