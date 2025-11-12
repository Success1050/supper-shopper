"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
}

export default function HelpSupportPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    subject: "",
  });

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How Do I Withdraw My Bounties?",
      answer:
        "Using The 'Available Balance' To Your Dashboard Section You May Withdraw Your Earned Bounties To Your Preferred Wallet Address.",
    },
    {
      id: 2,
      question: "How Do I Dispute A Damaged?",
      answer:
        "You can dispute a damaged item by contacting our support team with your order details and photos of the damage.",
    },
    {
      id: 3,
      question: "What Are Daily And Weekly Rewards?",
      answer:
        "Daily and weekly rewards are bonuses you can earn by completing specific tasks or maintaining activity streaks.",
    },
    {
      id: 4,
      question: "How Do I Contact Support?",
      answer:
        "You can contact support by filling out the form below or emailing us directly at support@supershop.com",
    },
  ];

  const toggleFaq = (id: number): void => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (): void => {
    alert("Form submitted!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center">
          <ArrowLeft
            className="w-6 h-6 text-white"
            onClick={() => router.back()}
          />
          <div className="pl-[25%] flex"> b nm
            <h1 className="text-white text-2xl font-bold mb-2 text-center ">
              Help & Support
            </h1>
          </div>
        </div>

        {/* Headphones Icon */}
        <div className="mb-8 bg-[#2b2a54] p-8 flex flex-col items-center rounded-[20px] mt-3">
          <p className="text-white text-[18px] font-medium mb-8">
            We're Here To Help You Anytime
          </p>
          <Image
            src={"/headphone.png"}
            alt="headphone"
            height={2000}
            width={2000}
            className="w-[172px] h-auto"
          />
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-white text-lg font-semibold mb-4">FAQ</h2>

          <div className="space-y-2">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-800/30 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-indigo-900/30 transition-colors"
                >
                  <span className="text-slate-300 text-sm font-medium pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
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
                </button>

                {openFaq === faq.id && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Form */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Contact Support Form
          </h2>

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John"
                className="w-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 rounded-xl px-4 py-3 text-slate-300 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="John.Doe@Email.Com"
                className="w-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 rounded-xl px-4 py-3 text-slate-300 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-indigo-900/20 backdrop-blur-sm border border-indigo-800/30 rounded-xl px-4 py-3 text-slate-300 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
