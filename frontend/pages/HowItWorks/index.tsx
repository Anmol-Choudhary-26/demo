import { Footer } from "@/components/Common/Footer";
import { NavbarTop } from "@/components/Common/Navbar";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="font-manrope">
      <div className="bg-[#ffffff] dark:bg-[#00171A]">
        <HowItWorks defaultTab={""} />
      </div>
    </main>
  );
}
