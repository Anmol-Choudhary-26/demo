import { useTheme } from "@/context/ThemeContext";
import CategoriesMiniCard from "./CategoriesMiniCard";
import PrimaryButton from "./Common/PrimaryButton";
import SecondaryButton from "./Common/SecondaryButton";
import Link from "next/link";

export default function Categories() {
  const { theme } = useTheme();
  return (
    <section className="mt-10 mx-4 sm:mx-10">
      <div className="m-auto">
        <h1 className="flex justify-center text-center text-white text-5xl font-semibold pt-4 sm:pt-0">
          Popular categories
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-12">
          <SecondaryButton
            title="Health Care"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px]"
              ${
                theme === "dark"
                  ? "border-[#A4E320] text-white bg-[#103B3E]"
                  : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
              }`}
          />
          <SecondaryButton
            title="Educational App"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
          <SecondaryButton
            title="Crypto"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
          <SecondaryButton
            title="Food Tech"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
          <SecondaryButton
            title="Marketing"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
          <SecondaryButton
            title="Media and ADs"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
          <SecondaryButton
            title="Hotel Industry"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
          <SecondaryButton
            title="Space Innovation"
            backgroundStyle={`border border-[#A4E320] rounded-full text-white bg-[#103B3E] capitalize  font-thin text-[14px] ${
              theme === "dark"
                ? "border-[#A4E320] text-white bg-[#103B3E]"
                : "border-[#248E38] text-[#248E38] bg-[#f0f0f0]"
            }`}
          />
        </div>
      </div>
      <div className="flex justify-between flex-col xl:flex-row w-full py-20">
        <div className="bg-[url('/Investor.svg')] w-full xl:w-1/2 bg-top xl:flex xl:justify-start xl:text-left flex flex-col justify-center text-center bg-contain bg-no-repeat xl:pl-7 mt-8 xl:mt-0">
          <p className="text-2xl sm:text-4xl font-semibold pt-2 sm:pt-7">
            Want to Grow your <br className="hidden md:block" /> portfolio as an{" "}
            <br className="hidden md:block" /> Investor ?
          </p>
          <p className="text-[14px] sm:text-[16px] px-2 py-2 sm:py-5">
            Find your next winning venture with targeted opportunities{" "}
            <br className="hidden md:block" /> and direct connections. Discover
            Deals Now!
          </p>
          <Link href="/auth/signup">
            <PrimaryButton
              title="Find Businesses"
              backgroundStyle="bg-[#268F3A] sm:mb-0 xl:flex xl:justify-start w-[170px] xl:mr-[440px] m-auto mb-44 sm:mb-28 border-nonenone text-[#ffffff] capitalize font-thin text-[14px]"
            />
          </Link>
        </div>
        <div className="bg-[url('/Business.svg')] w-full xl:w-1/2 bg-top xl:flex xl:justify-start xl:text-left flex flex-col justify-center text-center bg-contain bg-no-repeat xl:pl-7 sm:mt-8 xl:mt-0">
          <p className="text-2xl sm:text-4xl font-semibold pt-2 sm:pt-7">
            Seeking Investment to <br className="hidden md:block" /> Grow Your
            Startup or <br className="hidden md:block" /> Business ?
          </p>
          <p className="text-[14px] sm:text-[16px] px-2 py-2 sm:py-5">
            Showcase your potential to a curated pool of investors{" "}
            <br className="hidden md:block" /> and ignite your success. Get
            Funded Today!
          </p>
          <Link href="/auth/signup">
            <PrimaryButton
              title="Create an Account"
              backgroundStyle="bg-[#268F3A] sm:mb-0 xl:flex xl:justify-start w-[170px] xl:mr-[440px] m-auto mb-44 sm:mb-28 border-nonenone text-[#ffffff] capitalize font-thin text-[14px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
