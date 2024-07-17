import React from "react";
import { Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SecondaryButton from "@/components/Common/SecondaryButton";
import { PremiumCard } from "@/components/Common/PremiumCard";
import { BusinessCard } from "@/components/Common/BusinessCard";
import { businessesData } from "@/constants";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

const BusinessHomepage = () => {
  const { theme } = useTheme(); // Use theme from context

  const selectedBusiness = businessesData.slice(0, 2);
  const selectedBusinessTech = businessesData.slice(3, 5);

  return (
    <section
      className={`pt-4 ${theme === "dark" ? "bg-[#00171A]" : "bg-white"}`}
    >
      <div>
        <div
          className={`lg:bg-[url('/Dark.svg')] ${
            theme === "light" && "lg:bg-[url('/Light.svg')]"
          } bg-contain bg-no-repeat lg:h-screen w-full`}
        >
          <p className="text-[#248E38] dark:text-[#B8FF22] flex justify-center text-center pt-10">
            Welcome to PehlaStake
          </p>
          <div className="flex flex-col justify-center text-center gap-6">
            <p
              className={`text-5xl lg:text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              A platform to{" "}
              <span className="text-[#248E38] dark:text-[#B8FF22]">
                connect
              </span>
              , <br /> network and get Funded
            </p>
            <p
              className={`text-[13px] sm:text-[15px] font-medium px-4 md:px-8 lg:px-12 tracking-wider ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Unlock endless possibilities for your business or investment
              journey. <br className="hidden sm:block" /> Join a thriving
              community where opportunities meet expertise.
            </p>
          </div>
          <div className="flex justify-center py-1 border border-gray-400 rounded-full hover:border-[#248E38] dark:hover:border-[#B8FF22] m-auto max-w-[22rem] sm:max-w-[24rem] mt-4 sm:px-2 pl-8 pr-7">
            <div className="relative flex w-full max-w-[20rem]">
              <input
                placeholder="Search for the business or Investor"
                type="text"
                name="text"
                id="text"
                className={`p-2 text-sm bg-transparent focus:bg-transparent w-[20rem] h-10 rounded-full outline-none ${
                  theme === "dark" ? "text-white" : "text-[#00171A]"
                }`}
              />
            </div>
            <Button
              placeholder=""
              size="sm"
              className="right-1 top-1 rounded-full bg-[#248E38] dark:bg-[#B8FF22]"
            >
              <MagnifyingGlassIcon className="p-0 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="m-auto mt-10 mx-4 sm:mx-10">
        <h1
          className={`flex justify-center text-center text-4xl md:text-5xl font-semibold pt-4 sm:pt-0 ${
            theme === "dark" ? "text-white" : "text-[#00171A]"
          }`}
        >
          Popular categories
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-12">
          {[
            "Health Care",
            "Educational App",
            "Crypto",
            "Food Tech",
            "Marketing",
            "Media and ADs",
            "Hotel Industry",
            "Space Innovation",
          ].map((category) => (
            <SecondaryButton
              key={category}
              title={category}
              backgroundStyle={`border rounded-full capitalize font-thin text-[14px] ${
                theme === "dark"
                  ? "border-[#A4E320] text-white bg-[#103B3E]"
                  : "border-[#248E38] text-[#00171A] bg-[#f0f0f0]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="my-10">
        <div className="flex flex-row flex-wrap justify-between px-4 sm:px-10">
          <h1
            className={`text-3xl sm:text-5xl font-bold pb-4 sm:pb-0 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Investors Agro Tech Investor
          </h1>
          <div>
            <SecondaryButton
              title="View all Businesses"
              backgroundStyle={`border rounded-full capitalize font-thin text-[14px] ${
                theme === "dark"
                  ? "border-[#A4E320] text-[#A4E320]"
                  : "border-[#248E38] text-[#248E38]"
              }`}
            />
          </div>
        </div>
        <div className="w-full px-6 sm:px-8 pt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {selectedBusiness.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
          <PremiumCard />
        </div>
      </div>
      <div className="my-10">
        <div className="flex flex-row flex-wrap justify-between px-4 sm:px-10">
          <h1
            className={`text-3xl sm:text-5xl font-bold pb-4 sm:pb-0 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Health Tech Investor
          </h1>
          <div>
            <SecondaryButton
              title="View all Businesses"
              backgroundStyle={`border rounded-full capitalize font-thin text-[14px] ${
                theme === "dark"
                  ? "border-[#A4E320] text-[#A4E320]"
                  : "border-[#248E38] text-[#248E38]"
              }`}
            />
          </div>
        </div>
        <div className="w-full px-6 sm:px-8 pt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {selectedBusinessTech.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
          <PremiumCard />
        </div>
      </div>
    </section>
  );
};

export default BusinessHomepage;
