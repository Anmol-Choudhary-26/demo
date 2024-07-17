import { investorsData } from "@/constants";
import { BuyersCard } from "../Common/BuyersCard";
import SecondaryButton from "../Common/SecondaryButton";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function InvestorsCardList() {
  const { theme } = useTheme();
  const selectedInvestors = investorsData.slice(0, 3);

  return (
    <section className="mt-10 py-10">
      <div
        className={`flex justify-between items-center px-4 sm:px-10 ${
          theme === "dark" ? "text-white" : "text-[#00171A]"
        }`}
      >
        <p>400 Result found</p>
        <p
          className={`${
            theme === "dark" ? "text-[#C7C7C7]" : "text-[#666666]"
          }`}
        >
          Short by:{" "}
          <span
            className={`${
              theme === "dark" ? "text-[#ffffff]" : "text-[#00171A]"
            }`}
          >
            New Listing
          </span>
        </p>
      </div>
      <div className="px-6 sm:px-8 pt-10 card-layout">
        {selectedInvestors.map((investor) => (
          <BuyersCard key={investor.id} investors={investor} />
        ))}
      </div>
      <div
        className={`px-6 sm:px-8 pt-2 card-layout relative card-shadow select-none ${
          theme === "dark" ? "bg-[#001D20]" : "bg-[#f0f0f0]"
        }`}
      >
        <div className="mt-8 absolute inset-0 flex flex-col justify-center items-center z-[1000]">
          <div
            className={`text-xl font-medium text-center ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Get access to All Investors, Startups, <br /> Businesses and
            Franchises listing Database
          </div>
          <Link href="/auth/signup">
            <SecondaryButton
              title="Register and unlock"
              backgroundStyle={`mt-8 border rounded-lg capitalize font-thin text-[14px] ${
                theme === "dark"
                  ? "border-[#A4E320] text-[#A4E320]"
                  : "border-[#248E38] text-[#248E38]"
              }`}
            />
          </Link>
        </div>
        {selectedInvestors.map((investor) => (
          <BuyersCard key={investor.id} investors={investor} />
        ))}
      </div>
    </section>
  );
}
