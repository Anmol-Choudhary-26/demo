import { Footer } from "@/components/Common/Footer";
import InvestorsCardList from "@/components/Investors/InvestorsCardList";
import InvestorsHero from "@/components/Investors/InvestorsHero";
import { NavbarTop } from "@/components/Common/Navbar";

export default function Home() {
  return (
    <main className="font-manrope">
      <div className="bg-[#ffffff] dark:bg-[#00171A]">
        <InvestorsHero />
        <InvestorsCardList />
      </div>
    </main>
  );
}
