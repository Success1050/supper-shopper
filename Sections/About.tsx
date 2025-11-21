import AboutHero from "@/Components/AboutHero";
import ContactFormSection from "@/Components/ContactFormSection";
import FAQSection from "@/Components/FAQSection";
import FastSecureWithdrawals from "@/Components/FastSecureWithdrawals";
import MissionVisionValues from "@/Components/MissionValue";
import WhoWeAre from "@/Components/WhoWeAre";
import React from "react";
import SuperShopperSection from "./SuperShopperSection";

const About = () => {
  return (
    <div>
      <WhoWeAre imageUrl="/chatgpt.png" />
      <AboutHero imageUrl="/2.png" />
      <MissionVisionValues />
      <FastSecureWithdrawals imageUrl="/laptop.png" />
      <FAQSection imageUrl="/phone.png" />
      <ContactFormSection />
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
};

export default About;
