"use client";

import StepsSection from "@/Sections/Steps";
import Button from "@/Components/Button";
import { ArrowRight } from "lucide-react";

export default function StepsSectionClient(props: any) {
  return (
    <StepsSection
      {...props}
      isButton={false}
      button={
        <Button
          type="button"
          onClick={() => console.log("clicked")}
          fullWidth={true}
          icon={
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          }
          variant="primary"
          size="md"
        >
          Subscribe Now
        </Button>
      }
    />
  );
}
