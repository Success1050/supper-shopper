"use client";

import { useState } from "react";
import { ChevronDown, Send } from "lucide-react";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>("withdraw");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    {
      id: "withdraw",
      question: "How do I start earning?",
      answer:
        "Join the pilot by choosing a pre-entry package, then complete engagement tasks. Rewards depend solely on your actions inside the platform.",
    },
    {
      id: "campaign",
      question: "What payment methods are supported?",
      answer:
        "During the pilot, deposits and withdrawals operate through crypto: USDC/USDT. (MiCa approved). More options will be added after launch.",
    },
    {
      id: "rewards",
      question: "Is my money safe?",
      answer:
        "Yes. Funds are processed through secure, industry-standard crypto payment systems. During the pilot, all withdrawals are manually verified for safety.",
    },
    {
      id: "contact",
      question: "How do withdrawals work?",
      answer:
        "Once you reach the required amount, you can request a withdrawal directly from your dashboard. Processing takes 12–72 hours in pilot mode.",
    },
    {
      id: "future",
      question: "What happens after the pilot?",
      answer:
        "Users who participated in the pilot will keep their accounts and progress. The full platform will expand with new features, automated payouts, and seller tools.",
    },
  ];

  const chatMessages = [
    {
      id: 1,
      message: "Hi There, Sjaan Can To Help Today?",
      time: "3day Ago",
      timestamp: "12:00AM",
    },
    {
      id: 2,
      message: "Hi There, Sjaan Can To Help Today?",
      time: "1Week Ago",
      timestamp: "12:00AM",
    },
    {
      id: 3,
      message: "Hi There, Sjaan Can To Help Today?",
      time: "3day Ago",
      timestamp: "12:00AM",
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen p-6">
      <div className=" mx-auto bg-[#2b2a54] p-6">
        {/* Page Title */}
        <h1 className="text-white text-2xl font-semibold mb-6">
          Personal Information
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* We're Here To Help Card */}
            <div className="bg-[#36355d] rounded-2xl p-8">
              <h2 className="text-white text-xl font-semibold text-center mb-6">
                We're Here To Help You Anytime
              </h2>
              <div className="flex justify-center">
                <div className="relative">
                  {/* Headphones with chat icon */}
                  <div className="w-48 h-48 relative">
                    {/* Left earphone */}
                    <div className="absolute left-0 top-8 w-16 h-24 bg-gradient-to-br from-[#5d5fef] to-[#8b8dff] rounded-full"></div>
                    {/* Right earphone */}
                    <div className="absolute right-0 top-8 w-16 h-24 bg-gradient-to-br from-[#5d5fef] to-[#8b8dff] rounded-full"></div>
                    {/* Headband */}
                    <div className="absolute top-0 left-8 right-8 h-16 border-t-8 border-[#5d5fef] rounded-t-full"></div>
                    {/* Center chat bubble */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-[#5d5fef] to-[#8b8dff] rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="rounded-2xl p-6 ">
              <h2 className="text-white text-xl font-semibold mb-4">FAQs</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id}>
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between bg-[#36355d] rounded-xl px-4 py-3 transition-all"
                    >
                      <span
                        className={`text-left font-medium ${
                          openFaq === faq.id ? "text-[#2563EB]" : "text-white"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`text-white transition-transform ${
                          openFaq === faq.id ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </button>
                    {openFaq === faq.id && (
                      <div className="mt-2 px-4 py-3 bg-[#36355d] rounded-xl">
                        <p className="text-white/70 text-sm">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Support Chat */}
            <div className="bg-[#36355d] rounded-2xl p-6 ">
              <h2 className="text-white text-xl font-semibold mb-4">
                Live Support Chat
              </h2>
              <div className="space-y-3">
                {chatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-3 rounded-xl p-3 bg-[#3d3c65]"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5d5fef] to-[#8b8dff] flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {chat.message}
                      </p>
                      <p className="text-white/50 text-xs">{chat.time}</p>
                    </div>
                    <span className="text-white/50 text-xs flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support Form */}
            <div>
              <h2 className="text-white text-xl font-semibold mb-4">
                Contact Support Form
              </h2>
              <div className="bg-[#36355d] rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[#403f65] text-white placeholder-white rounded-xl px-4 py-3  focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="John.Doe@Email.Com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#403f65] text-white placeholder-white rounded-xl px-4 py-3 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full bg-[#403f65] text-white  rounded-xl px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Type Here"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="w-full bg-[#403f65] text-white placeholder-white rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button className="w-full bg-[#2723FF] hover:bg-[#1f1acc] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    Send Message
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
