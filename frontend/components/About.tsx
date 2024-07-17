import PrimaryButton from "./Common/PrimaryButton";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function About() {
  const { theme } = useTheme();

  return (
    <section className="mt-10 py-10 px-4 sm:px-10">
      <div className="flex flex-col-reverse md:flex-row flex-wrap justify-between">
        <div className="">
          <p
            className={`text-5xl font-bold ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Finding an{" "}
            <span className="text-[#248E38] dark:text-[#B8FF22]">Investor</span>{" "}
            was
            <br className="hidden sm:block" /> never been an easy{" "}
            <br className="hidden sm:block" /> before
          </p>
          <p
            className={`text-[14px] sm:text-[15px] pt-4 ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Access a vast network of pre-vetted investors, spanning{" "}
            <br className="hidden sm:block" />
            various industries and investment levels.
          </p>
          <div className="">
            <div className="pt-6">
              <div className="flex">
                <Image
                  alt="Points"
                  src={"/Shapes.svg"}
                  width={20}
                  height={20}
                />
                <h1
                  className={`text-[16px] font-semibold tracking-wider pl-2 ${
                    theme === "dark" ? "text-white" : "text-[#00171A]"
                  }`}
                >
                  Targeted Matching
                </h1>
              </div>
              <p
                className={`text-[14px] sm:text-[15px] pt-2 pl-7 ${
                  theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
                }`}
              >
                Our algorithm intelligently connects you with investors{" "}
                <br className="hidden sm:block" /> based on your specific needs
                and industry.
              </p>
            </div>
            <div className="pt-6">
              <div className="flex">
                <Image
                  alt="Points"
                  src={"/Shapes.svg"}
                  width={20}
                  height={20}
                />
                <h1
                  className={`text-[16px] font-semibold tracking-wider pl-2 ${
                    theme === "dark" ? "text-white" : "text-[#00171A]"
                  }`}
                >
                  Effortless Communication
                </h1>
              </div>
              <p
                className={`text-[14px] sm:text-[15px] pt-2 pl-7 ${
                  theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
                }`}
              >
                Send personalized messages and schedule meetings
                <br className="hidden sm:block" /> directly through Biwi&apos;s
                secure platform.
              </p>
            </div>
          </div>
          <div className="pt-10">
            <Link href="/auth/signup">
              <PrimaryButton
                title="Create An Account"
                backgroundStyle="bg-[#248E38] dark:bg-[#B8FF22] border-none shadow-none text-white dark:text-[#103B3E] capitalize  font-thin text-[14px]"
              />
            </Link>
          </div>
        </div>
        <div className="pb-4 sm:pb-0 hidden xl:block">
          <Image
            alt="FeatureImage"
            src="/FeatueImage.png"
            width={440}
            height={440}
          />
        </div>
      </div>
    </section>
  );
}
