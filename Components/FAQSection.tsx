"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  imageUrl?: string;
}

const FAQSection: React.FC<FAQProps> = ({
  imageUrl = "/api/placeholder/400/400",
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs: FAQItem[] = [
    {
      question: "How does Super Shopper work?",
      answer:
        "Super Shopper is a platform that connects buyers and sellers. Buyers complete simple daily tasks, earn profits, and sellers benefit from increased product sales and exposure.",
    },
    {
      question: "How can I start earning?",
      answer:
        "Sign up for an account, complete your profile verification, and start completing simple tasks to earn money immediately.",
    },
    {
      question: "What payment methods are supported?",
      answer:
        "We support multiple payment methods including bank transfers, cryptocurrency, and various digital wallets for your convenience.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, your earnings are protected with bank-level security and encryption. We use industry-standard security measures to keep your funds safe.",
    },
    {
      question: "How do withdrawals work?",
      answer:
        "Withdrawals are processed within 12-72 hours. The minimum withdrawal amount is $10, and you can choose from multiple withdrawal methods.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-24 xl:px-[100px] py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            FREQUENTLY ASKED <span className="text-[#2563EB]">QUESTIONS</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden border-4 border-[#2563EB] shadow-2xl">
                <Image
                  src={imageUrl}
                  alt="Person using Super Shopper app"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-[#2563EB]"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-base md:text-lg font-semibold text-gray-800">
                      {index + 1}.
                    </span>
                    <span className="text-base md:text-lg font-semibold text-gray-800">
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Icon */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                {openIndex === index && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5">
                    <div className="pl-8 pt-2 border-t border-gray-200">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-3">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
