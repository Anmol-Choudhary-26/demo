import About from "@/components/About";
import Buyers from "@/components/Buyers";
import CTA from "@/components/CTA";
import Categories from "@/components/Categories";
import { Footer } from "@/components/Common/Footer";
import Hero from "@/components/Hero";
import KeyPoints from "@/components/KeysPoints";
import RegisteredBusiness from "@/components/RegisteredBusiness";
import { Manrope } from "next/font/google";

export default function Home() {
  return (
    <main className="font-manrope">
      <div className="bg-[#ffffff] dark:bg-[#00171A]">
        <Hero />
        <About />
        <KeyPoints />
        <RegisteredBusiness />
        <Buyers />
        <CTA />
        <Categories />
      </div>
    </main>
  );
}
