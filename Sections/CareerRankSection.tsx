// components/CareerRankSection.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { careerRankLevels } from "@/constants";
import React from "react";

interface CareerRankSectionProps {
  children?: React.ReactNode;
  isCareer?: boolean;
}

const CareerRankSection = ({
  children,
  isCareer = false,
}: CareerRankSectionProps) => {
  return (
    <section
      className="py-16 lg:py-24"
      style={
        isCareer
          ? {
              background: "linear-gradient(135deg, #2563EB 0%, #0E3488 100%)",
            }
          : {
              backgroundColor: "white",
            }
      }
    >
      <div className="px-4 md:px-8 lg:px-24 xl:px-[100px]">
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </div>
    </section>
  );
};

export default CareerRankSection;
