import PricingSection from "@/Sections/PricingSection";
import SuperShopperSection from "@/Sections/SuperShopperSection";
import React from "react";
import PricingTableSection from "@/Components/PlanTable";

const SubscriptionPage = () => {
  return (
    <section>
      <SuperShopperSection
        backgroundImage="images/img8.png"
        hasButton={false}
        mt={"sm"}
        header={
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-tight drop-shadow-lg text-white">
            Subscription Plans
          </h2>
        }
        content="Start your journey with Super Shopper by selecting a subscription plan. Each plan comes with daily rewards, access to tasks, and the ability to withdraw your profits in crypto anytime."
      />

      <PricingSection bg={"white"} />

      <PricingTableSection />

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

export default SubscriptionPage;
