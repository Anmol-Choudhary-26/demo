import { Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { KeyboardEvent } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";

export default function InvestorsHero(): JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();

  const handleSearch = (): void => {
    router.push("/auth/signup");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="pt-4">
      <div className="mt-20">
        <div className="lg:bg-[url('/Business_Header.svg')] z-[1000] bg-cover bg-no-repeat h-96 w-full">
          <div className="flex flex-col justify-center text-center gap-[24px]">
            <p
              className={`text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              4000+ registered <br /> businesses for{" "}
              <span
                className={`${
                  theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
                }`}
              >
                sale
              </span>
              ,
            </p>
          </div>
          <div
            className={`flex justify-center py-1 border border-gray-400 rounded-full ${
              theme === "dark"
                ? "bg-[#001D20] hover:border-[#B8FF22]"
                : "bg-[#f0f0f0] hover:border-[#248E38]"
            } m-auto max-w-[22rem] sm:max-w-[24rem] mt-20 sm:px-2 pl-8 pr-7`}
          >
            <div className="relative flex w-full max-w-[20rem]">
              <input
                placeholder="Search for the business or Investor"
                type="text"
                name="text"
                id="text"
                className={`p-2 text-sm bg-transparent focus:bg-transparent w-[20rem] h-10 rounded-full outline-none ${
                  theme === "dark" ? "text-white" : "text-[#00171A]"
                }`}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 rounded-full bg-[#248E38] dark:bg-[#B8FF22]"
            >
              <MagnifyingGlassIcon className="p-0 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
