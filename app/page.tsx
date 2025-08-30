import Image from "next/image";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import StepsSection from "@/components/Steps";

export default function Home() {
  return (
    <div className="min-h-screen bg-white px-2.5">
      <Header />
      <HeroSection />
      <StepsSection />
    </div>
  );
}
