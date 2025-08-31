"use client";
import Button from "@/Components/Button";
import TeamVolume from "@/Components/TeamVolume";
import { Lists, whyChooseSuperShopper } from "@/constants";
import CareerRankSection from "@/Sections/CareerRankSection";
import EcommerceSection from "@/Sections/EcommerceSection";
import FAQSection from "@/Sections/FAQSection";
import StepsSection from "@/Sections/Steps";
import SuperShopperSection from "@/Sections/SuperShopperSection";
import { ArrowRight, Check, Circle, CircleDot } from "lucide-react";
import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  const ecommerceSections = [
    {
      hasButton: true,
      changedOrder: false,
      paragraph:
        "Invite friends, grow your team, and unlock lifetime bonuses. With Super Shopper’s affiliate system, you earn extra rewards not only from subscriptions but also from your team’s daily activity.",
      image: "url('/images/boost.png')",
      leftHeader: (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Boost Earnings with Affiliate
          <span className="text-[#2563EB]"> Program</span>
        </h2>
      ),
      button: (
        <Button
          variant="primary"
          iconPosition="right"
          fullWidth={false}
          icon={<ArrowRight size={16} />}
        >
          Start Referencing
        </Button>
      ),
      lists: [
        "Invite friends and grow your network",
        "Earn direct bonuses from subscriptions and daily tasks",
        "Get career rank rewards based on team growth",
      ],
    },
    {
      hasButton: true,
      changedOrder: true,
      paragraph:
        "Our platform is not just for buyers – it’s also a powerful tool for sellers. Promote your products, reach more customers, and boost sales with our Business Owner Packages.",
      image: "url('/images/img2.png')",
      leftHeader: (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Extra Income with Weekly & Monthly Salary
        </h2>
      ),
      button: (
        <Button
          variant="primary"
          iconPosition="right"
          fullWidth={false}
          icon={<ArrowRight size={16} />}
        >
          Grow your team
        </Button>
      ),
      lists: [
        "Weekly salary = bonuses credited on weekends",
        "Monthly salary = end-of-month team growth rewards",
        "Long-term stability through passive income",
      ],
    },
  ];

  return (
    <section className="px-4">
      <SuperShopperSection
        backgroundImage="images/how-it-works.png"
        hasButton={false}
        mt={"sm"}
        header={
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight drop-shadow-lg text-white">
            How It Works
            <br />
          </h2>
        }
        content="A simple way to earn daily rewards while supporting e-commerce sellers."
      />

      <StepsSection
        mainHeader="Process"
        ishome={false}
        isButton={true}
        isParagraph={false}
        isIcon={false}
        text="01"
        boxHeader="Sign Up & Choose a Plan"
        isList={true}
        button={
          <Button
            variant="secondary"
            size="md"
            fullWidth={true}
            onClick={() => console.log("Signup")}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Signup
          </Button>
        }
        lists={
          <div>
            {Lists.map((list) => (
              <div key={list.id} className="space-y-4 text-left">
                {list.items.map((item, index) => (
                  <div
                    key={`${list.id}-${index}`}
                    className="flex items-start space-x-3"
                  >
                    <CircleDot
                      size={20}
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 text-sm lg:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
        button2={
          <Button
            variant="primary"
            size="md"
            fullWidth={true}
            onClick={() => console.log("View tasks")}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            View tasks
          </Button>
        }
        text2="02"
        boxHeader2="Complete Daily Tasks"
        lists2={
          <div>
            {Lists.map((list) => (
              <div key={list.id + 1} className="space-y-4 text-left">
                {list.items.map((item, index) => (
                  <div
                    key={`${list.id}-${index}`}
                    className="flex items-start space-x-3"
                  >
                    <CircleDot
                      size={20}
                      className="text-white mt-0.5 flex-shrink-0"
                    />
                    <span className="text-white text-sm lg:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
        boxHeader3="Earn daily profit"
        text3="03"
        lists3={
          <div>
            {Lists.map((list) => (
              <div key={list.id + 2} className="space-y-4 text-left">
                {list.items.map((item, index) => (
                  <div
                    key={`${list.id}-${index}`}
                    className="flex items-start space-x-3"
                  >
                    <CircleDot
                      size={20}
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-700 text-sm lg:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
        button3={
          <Button
            variant="secondary"
            size="md"
            fullWidth={true}
            onClick={() => console.log("View plans")}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            View plans
          </Button>
        }
      />

      {ecommerceSections.map((section, idx) => (
        <EcommerceSection
          key={idx}
          hasButton={section.hasButton}
          changedOrder={section.changedOrder}
          paragraph={section.paragraph}
          image={section.image}
          leftHeader={section.leftHeader}
          button={section.button}
          isList={true}
          lists={
            <div className="space-y-4 text-left">
              {section.lists.map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CircleDot
                    size={20}
                    className="text-blue-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-700 text-sm lg:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      ))}

      <TeamVolume />

      <CareerRankSection isCareer={false}>
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8">
            Why Choose <span className="text-[#2563EB]"> Super Shopper</span>?
          </h2>
        </div>

        {/* Rank Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {whyChooseSuperShopper.map((why) => (
            <div
              className="bg-[#D9D9D973] rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              key={why.id}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-[#2563EB] rounded-full flex items-center justify-center">
                  <Image
                    alt="work"
                    src={why.image}
                    width={42}
                    height={37}
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {why.header}
                </h3>

                {/* Description */}
                <div className="space-y-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                  {why.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Start Referring Button */}
        <div className="text-center">
          <button className="bg-white text-[#2563EB] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors flex items-center space-x-2 mx-auto group">
            <span>Start Referring</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </CareerRankSection>

      <EcommerceSection
        hasButton={true}
        changedOrder={false}
        paragraph={
          "Are you a business owner or seller? Our platform helps you reach new customers, grow your sales, and promote your products to an active community of buyers who are ready to shop."
        }
        image={"url('/images/img3.png')"}
        leftHeader={
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Expand Your Sales with
            <span className="text-[#2563EB]"> Super Shopper</span>
          </h2>
        }
        button={
          <Button
            variant="primary"
            iconPosition="right"
            fullWidth={false}
            icon={<ArrowRight size={16} />}
          >
            Grow your team
          </Button>
        }
        isList={true}
        lists={
          <div className="space-y-4 text-left">
            {[
              "Promote your e-commerce products via Business Owner Packages",
              "Packages include ads, clicks, impressions",
              "Grow your store’s reach and sales",
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <CircleDot
                  size={20}
                  className="text-blue-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-gray-700 text-sm lg:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        }
      />

      <FAQSection />

      <SuperShopperSection
        backgroundImage="/images/shopper.png"
        hasButton={true}
        header={
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight drop-shadow-lg text-white">
            SUPER SHOPPER – EARN DAILY REWARDS
            <br />
            <span className="text-white/90">& GROW YOUR BUSINESS</span>
          </h2>
        }
        content=" Connect buyers and sellers in one platform. Complete simple tasks,
                       earn daily profit, and help sellers boost their sales."
      />
    </section>
  );
};

export default HowItWorks;
