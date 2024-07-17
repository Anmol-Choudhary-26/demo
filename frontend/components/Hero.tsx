// components/Common/Hero.tsx
import React from "react";
import { Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section className="pt-4">
      <div>
        <div
          className={`lg:bg-[url('/Dark.svg')] ${
            theme === "light" && "lg:bg-[url('/Light.svg')]"
          } bg-contain bg-no-repeat lg:h-screen w-full`}
        >
          <p
            className={`flex justify-center text-center pt-10 ${
              theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
            }`}
          >
            Welcome to PehlaStake
          </p>
          <div className="flex flex-col justify-center text-center gap-[24px]">
            <p
              className={`text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              A platform to{" "}
              <span className="text-[#248E38] dark:text-[#B8FF22]">
                connect
              </span>
              ,
              <br /> network and get Funded
            </p>
            <p
              className={`text-[13px] sm:text-[15px] font-medium tracking-wider px-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Unlock endless possibilities for your business or investment
              journey. <br className="hidden sm:block" /> Join a thriving
              community where opportunities meet expertise.
            </p>
          </div>
          <div className="flex justify-center py-1 border-2 rounded-full border-gray-400 dark:border-white hover:border-[#248E38] dark:hover:border-[#B8FF22] m-auto max-w-[22rem] sm:max-w-[24rem] mt-4 sm:px-2 pl-8 pr-7">
            <div className="relative flex w-full max-w-[20rem]">
              <input
                placeholder="Search for the business or Investor"
                type="text"
                name="text"
                id="text"
                className={`p-2 text-sm bg-transparent focus:bg-transparent w-[20rem] h-10 rounded-full outline-none ${
                  theme === "dark" ? "text-white" : "text-black"
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
        <div
          className={`bg-[url('/moonDark.svg')] bg-cover bg-top w-full bg-no-repeat h-96`}
        >
          <p
            className={`hidden sm:block justify-center text-center pt-32 sm:pt-48 px-4 text-white tracking-wider`}
          >
            Biwi is a revolutionary marketplace designed to connect ambitious
            founders with the right investors to bring their dreams to life.{" "}
            <br className="hidden lg:block" /> We understand the challenges
            faced by both founders seeking funding and investors searching for
            promising ventures. Our
            <br className="hidden lg:block" /> platform provides a seamless and
            efficient solution to overcome these hurdles and{" "}
            <br className="hidden lg:block" /> foster mutually beneficial
            partnerships.
          </p>
          <Image
            alt="mobile-image"
            src={"/MobileImage.svg"}
            width={315}
            height={300}
            className="object-contain block sm:hidden ml-4"
          />
        </div>
      </div>
    </section>
  );
}
