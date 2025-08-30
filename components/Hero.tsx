// components/HeroSection.tsx
import { ChevronRight, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero_section">
      {/* Background decorative elements */}
      <div className="svg">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.09 8.26L22 9L16 14.74L17.18 22.84L12 19.77L6.82 22.84L8 14.74L2 9L9.91 8.26L12 2Z" />
        </svg>
      </div>
      <div className="svg2">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      <div className="main_cont">
        <div className="sub_cont">
          <div className="sub_cont2">
            {/* Left Content */}
            <div className="left_cont">
              <div className="parent">
                <h1>
                  TURN YOUR
                  <br />
                  SHOPPING INTO
                  <br />
                  <span>DAILY PROFITS</span>
                </h1>

                <p>
                  Join Super Shopper - where buyers earn crypto rewards and
                  sellers grow their business
                </p>
              </div>

              {/* Features List */}
              <div className="featured_list">
                <div className="shared_layout">
                  <div className="empty_div"></div>
                  <p>Complete simple tasks, earn daily profits</p>
                </div>
                <div className="shared_layout">
                  <div className="empty_div"></div>
                  <p>Help brands increase their visibility and sales</p>
                </div>
                <div className="shared_layout">
                  <div className="empty_div"></div>
                  <p>Get paid in cryptocurrency with easy withdrawals</p>
                </div>
                <div className="shared_layout">
                  <div className="empty_div"></div>
                  <p>Multi-level affiliate program for extra earnings</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="cta_cont">
                <button className="earn_btn">
                  <span className="font-medium">Start Earning Now</span>
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button className="learn_btn">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Right Images */}
            <div className="right_cont">
              <div className="sub_cont">
                {/* Main large image container */}
                <div
                  className="large_img"
                  style={{
                    backgroundImage: "url('/images/big_img.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Woman with laptop showing chart */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Overlapping round image */}
                <div
                  className="absolute left-4 md:-left-6 lg:-left-8 top-0 w-24 h-24 md:w-32 md:h-32 lg:w-[209px] lg:h-[209px] rounded-full overflow-hidden shadow-lg border-4 border-white"
                  style={{
                    backgroundImage: "url('/images/small_img.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Shopping bags overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-2 left-2 md:top-4 md:left-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-4 md:w-4 md:h-5 bg-red-400 rounded-sm"></div>
                      <div className="w-3 h-4 md:w-4 md:h-5 bg-blue-400 rounded-sm"></div>
                      <div className="w-3 h-4 md:w-4 md:h-5 bg-green-400 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
