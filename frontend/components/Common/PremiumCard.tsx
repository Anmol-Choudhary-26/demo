import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import SecondaryButton from "./SecondaryButton";
import { useTheme } from "@/context/ThemeContext";

export function PremiumCard() {
  const { theme } = useTheme();

  return (
    <Card
      placeholder={undefined}
      color="transparent"
      shadow={false}
      className={`w-full rounded-lg px-4 ${
        theme === "dark"
          ? "bg-[#003034] text-white"
          : "bg-white text-[#00171A] border border-gray-400"
      }`}
    >
      <CardHeader
        placeholder={undefined}
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex justify-between items-center gap-4 pt-0 pb-8 border-none rounded-none"
      >
        <Image
          src={"/premium.svg"}
          alt="building"
          className=""
          width={50}
          height={50}
        />
        <p
          className={`text-[16px] font-semibold tracking-wide ${
            theme === "dark" ? "text-[#FFAF1A]" : "text-[#FFAF1A]"
          }`}
        >
          Edutech company Investment opportunity in Bangalore
        </p>
        <p
          className={`text-sm ${
            theme === "dark"
              ? "text-[#003034] bg-[#FFAF1A]"
              : "text-[#FFAF1A] bg-[#003034]"
          } font-semibold py-1 px-4 rounded-xl`}
        >
          Premium
        </p>
      </CardHeader>
      <CardBody placeholder={undefined} className="mb-6 p-0">
        <p
          className={`font-thin text-[14px] sm:text-[15px] text-justify ${
            theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Edtech leader with 1.1M students trained, 30+ yrs exp, seeking funds
          to expand existing business. Skill development training. IT
          certification training. IT staffing. IT system integration. CCTV
          surveillance and video
        </p>
        <div
          className={`p-2 rounded-md border mt-2 ${
            theme === "dark"
              ? "bg-[#103B3E] border-[#B8FF22]"
              : "bg-[#e0e0e0] border-[#248E38]"
          }`}
        >
          <div className="flex justify-between">
            <p
              className={`text-[15px] ${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              }`}
            >
              Run rate sales
            </p>
            <p
              className={`text-[15px] ${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              }`}
            >
              INR <span className="font-semibold">2.4 Crore</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className={`text-[15px] ${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              }`}
            >
              EBIDTA Margin
            </p>
            <p
              className={`text-[15px] ${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              }`}
            >
              NIL
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[13px] font-medium">Financial Investment</p>
            <p className="font-medium">
              INR{" "}
              <span className="text-[#248E38] dark:text-[#A4E320]">
                4 Crore for 8%
              </span>
            </p>
          </div>
          <SecondaryButton
            title="Contact Business"
            backgroundStyle={`border shadow-none capitalize font-thin text-[14px] px-2 py-0 rounded-full ${
              theme === "dark"
                ? "border-[#A4E320] text-[#A4E320]"
                : "border-[#248E38] text-[#248E38]"
            }`}
          />
        </div>
      </CardBody>
    </Card>
  );
}
