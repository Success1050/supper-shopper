// components/StepsSection.tsx
"use client";

import React from "react";
import { Download, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import Button from "@/Components/Button";

interface StepsSectionProps {
  paragraphHeader?: string | "";
  paragraphSubHeader?: string | "";
  isIcon?: boolean;
  text?: string | "";
  icon?: React.ReactNode;
  boxHeader?: string | "";
  boxContent?: string | "";
  isList?: boolean;
  lists?: React.ReactNode;
  text2?: string | "";
  boxHeader2?: string | "";
  boxContent2?: string | "";
  lists2?: React.ReactNode;
  text3?: string | "";
  boxHeader3?: string | "";
  boxContent3?: string | "";
  lists3?: React.ReactNode;
  ishome?: boolean;
  mainHeader?: string | "";
  icon2?: React.ReactNode;
  icon3?: React.ReactNode;
  spanHeader?: string | "";
  isButton?: boolean;
  isParagraph?: boolean;
  button?: React.ReactNode;
  button2?: React.ReactNode;
  button3?: React.ReactNode;
}

const StepsSection = ({
  paragraphHeader,
  paragraphSubHeader,
  isIcon,
  icon2,
  text,
  icon3,
  icon,
  boxHeader,
  button,
  isButton,
  boxContent,
  isList,
  lists,
  boxHeader2,
  text2,
  lists2,
  boxContent2,
  text3,
  boxHeader3,
  boxContent3,
  lists3,
  ishome,
  mainHeader,
  spanHeader,
  isParagraph,
  button2,
  button3,
}: StepsSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            {ishome ? (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {mainHeader}

                <span className="text-[#2563EB]">{spanHeader}</span>
              </h2>
            ) : (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2563EB]">
                {mainHeader}
              </h2>
            )}

            {isParagraph ? (
              <div className="space-y-2 max-w-3xl mx-auto">
                <p className="text-base md:text-lg text-gray-600">
                  {paragraphHeader}
                </p>
                <p className="text-base md:text-lg text-gray-600">
                  {paragraphSubHeader}
                </p>
              </div>
            ) : null}
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-[#2563EB] rounded-full flex items-center justify-center">
                  {isIcon ? (
                    icon
                  ) : (
                    // <Download size={32} className="text-white" />
                    <h2 className="text-white text-[32px] font-bold">{text}</h2>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {boxHeader}
                </h3>

                {/* Description */}
                <div className="space-y-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                  {isList ? lists : <p>{boxContent}</p>}
                </div>
              </div>

              {isButton ? button : null}
            </div>

            {/* Step 2 - Featured with gradient */}
            <div
              className="rounded-2xl p-6 lg:p-8 shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
              style={{
                background: "linear-gradient(180deg, #2563EB 0%, #0E3488 100%)",
              }}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  {isIcon ? (
                    icon2
                  ) : (
                    <h2 className="text-white text-[32px] font-bold">
                      {text2}
                    </h2>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold">{boxHeader2}</h3>

                {/* Description */}
                <div className="space-y-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                  {isList ? (
                    lists2
                  ) : (
                    <p className="text-white">{boxContent2}</p>
                  )}
                </div>
              </div>
              {isButton ? button2 : null}
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto bg-[#2563EB] rounded-full flex items-center justify-center">
                  {isIcon ? (
                    icon3
                  ) : (
                    <h2 className="text-white text-[32px] font-bold">
                      {text3}
                    </h2>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {boxHeader3}
                </h3>

                {/* Description */}
                <div className="space-y-4 text-sm lg:text-base text-gray-600 leading-relaxed">
                  {isList ? (
                    <ul>
                      <li>{lists3}</li>
                    </ul>
                  ) : (
                    <p>{boxContent3}</p>
                  )}
                </div>
              </div>
              {isButton ? button3 : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
