import Image from "next/image";
import Header from "@/Sections/Header";
import HeroSection from "@/Sections/Hero";
import StepsSection from "@/Sections/Steps";
import PricingSection from "@/Sections/PricingSection";
import AffiliateSection from "@/Sections/AffiliateSection";
import CareerRankSection from "@/Sections/CareerRankSection";
import SalaryRewardsSection from "@/Sections/SalaryRewardsSection";
import EcommerceSection from "@/Sections/EcommerceSection";
import LotterySection from "@/Sections/LotterySection";
import WithdrawalsSection from "@/Sections/WithdrawalsSection";
import WhyChooseSection from "@/Sections/WhyChooseSection";
import FAQSection from "@/Sections/FAQSection";
import ContactForm from "@/Sections/ContactForm";
import SuperShopperSection from "@/Sections/SuperShopperSection";
import { ArrowRight, DollarSign, Download, TrendingUp } from "lucide-react";
import Button from "@/Components/Button";
import StepsSectionClient from "@/wrappers/StepWrapperClient";
import { careerRankLevels } from "@/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StepsSectionClient
        ishome={true}
        mainHeader="START EARNING IN JUST"
        spanHeader="3 SIMPLE STEPS"
        paragraphHeader="Join thousands of users who are already boosting their income and helping brands grow every day."
        paragraphSubHeader="The process is designed to be simple, rewarding, and secure for everyone."
        isIcon={true}
        icon={<Download size={32} className="text-white" />}
        text=""
        lists=""
        isList={false}
        boxHeader="Sign Up & Fund Your Account"
        boxContent=" Sign up for your account and determine how much you would like to invest in your earning potential. Choose from our various investment packages (eg: starter $100) you can fund via your bank account, bitcoin, USDT or BTC to your secure wallet in less than 5 minutes. The more you fund, the higher your daily earning capacity!"
        icon2={<TrendingUp size={32} className="text-white" />}
        text2=""
        boxHeader2=" Boost Sales & Earn Rewards"
        isParagraph={true}
        lists2=""
        boxContent2="Once your account is funded, start your daily earning potential by performing sponsored brand tasks. Complete tasks like earn your share of the profits. The more consistently you participate, the more you earn. Complete these tasks to earn your share of the profits. The more consistently you participate, the more you earn.
"
        icon3={<DollarSign size={32} className="text-white" />}
        text3=""
        boxHeader3="Get Paid Daily In Crypto"
        lists3=""
        boxContent3=" Track all your earnings and completed tasks and collect your balance every 24 hours. simply request withdrawal to your linked wallet. Withdraw a Tether USDT as you earn your regular earnings from your investment. You earn every day! Low threshold withdrawals to multiple cryptocurrencies."
      />

      <PricingSection bg="gradient-to-br from-blue-50 to-purple-50" />
      <AffiliateSection />
      <CareerRankSection isCareer={true}>
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            CAREER RANK BONUS LEVELS
          </h2>
        </div>

        {/* Rank Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {careerRankLevels.map((rank) => (
            <div
              key={rank.id}
              className={`${rank.bgColor} rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="text-center space-y-4">
                <h3
                  className={`text-xl lg:text-2xl font-bold ${rank.textColor}`}
                >
                  {rank.name}
                </h3>

                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">Team Volume</p>
                  <div className="text-2xl lg:text-3xl font-bold text-[#2563EB]">
                    {rank.teamVolume}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">Weekly Bonus</p>
                  <div className="text-xl lg:text-2xl font-bold text-[#2563EB]">
                    {rank.weeklyBonus}
                  </div>
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
      <SalaryRewardsSection />
      <EcommerceSection
        leftHeader={
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            BOOST YOUR E-COMMERCE
            <span className="text-[#2563EB]"> BUSINESS</span>
          </h2>
        }
        paragraph="Leverage our platform to drive traffic, increase sales, and grow your online presence with targeted marketing packages."
        image="url('/images/boost.png')"
      />
      <LotterySection />
      <WithdrawalsSection />
      <WhyChooseSection />
      <FAQSection />
      <ContactForm />
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
    </div>
  );
}
