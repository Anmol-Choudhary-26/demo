import FranchiseCardList from "@/components/Franchise/FranchiseCardList";
import FranchiseHero from "@/components/Franchise/FranchiseHero";

export default function Home() {
  return (
    <main className="font-manrope">
      <div className="bg-[#ffffff] dark:bg-[#00171A]">
        <FranchiseHero />
        <FranchiseCardList />
      </div>
    </main>
  );
}
