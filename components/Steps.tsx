// components/StepsSection.tsx
import { Download, TrendingUp, DollarSign } from "lucide-react";

const StepsSection = () => {
  return (
    <section className="steps">
      <div className="main">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="header">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              START EARNING IN JUST
              <span className="text-[#2563EB]"> 3 SIMPLE STEPS</span>
            </h2>
            <div className="main2">
              <p>
                Join thousands of users who are already boosting their income
                and helping brands grow every day.
              </p>
              <p>
                The process is designed to be simple, rewarding, and secure for
                everyone.
              </p>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid">
            {/* Step 1 */}
            <div className="step_1">
              <div className="shared_layout">
                {/* Icon */}
                <div className="icon">
                  <Download size={32} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Sign Up & Fund Your Account
                </h3>

                {/* Description */}
                <div className="desc">
                  <p>
                    Sign up for your account and determine how much you would
                    like to invest in your earning potential. Choose from our
                    various investment packages (eg: starter $100) you can fund
                    via your bank account, bitcoin, USDT or BTC to your secure
                    wallet in less than 5 minutes. The more you fund, the higher
                    your daily earning capacity!
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 - Featured with gradient */}
            <div
              className="featured"
              style={{
                background: "linear-gradient(180deg, #2563EB 0%, #0E3488 100%)",
              }}
            >
              <div className="shared_layout">
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 middle_cont bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <TrendingUp size={32} className="text-white" />
                </div>
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold">
                  Boost Sales & Earn Rewards
                </h3>
                {/* Description */}
                <div className="middle_cont_p">
                  <p>
                    Once your account is funded, start your daily earning
                    potential by performing sponsored brand tasks. Complete
                    tasks like earn your share of the profits. The more
                    consistently you participate, the more you earn.
                  </p>
                  <p>
                    Complete these tasks to earn your share of the profits. The
                    more consistently you participate, the more you earn.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step3">
              <div className="cont">
                {/* Icon */}
                <div className="icon">
                  <DollarSign size={32} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Get Paid Daily In Crypto
                </h3>

                {/* Description */}
                <div className="desc">
                  <p>
                    Track all your earnings and completed tasks and collect your
                    balance every 24 hours. simply request withdrawal to your
                    linked wallet. Withdraw a Tether USDT as you earn your
                    regular earnings from your investment. You earn every day!
                    Low threshold withdrawals to multiple cryptocurrencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
