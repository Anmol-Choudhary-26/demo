import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import SecondaryButton from "./SecondaryButton";
import { Investor } from "@/types";
import { useTheme } from "@/context/ThemeContext";

interface InvestorsCardProps {
  investors: Investor;
}

export const BuyersCard: React.FC<InvestorsCardProps> = ({ investors }) => {
  const { theme } = useTheme();

  return (
    <Card
      placeholder=""
      color="transparent"
      shadow={false}
      className={`w-full rounded-lg px-4 ${
        theme === "dark"
          ? "bg-[#003034] text-white"
          : "bg-white text-[#00171A] border border-gray-400"
      }`}
    >
      <CardHeader
        placeholder=""
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex justify-start items-center gap-4 pt-0 pb-4 rounded-none border-none"
      >
        <Image
          src={"/Buyers.svg"}
          alt="building"
          className=""
          width={50}
          height={50}
        />
        <div
          className={`${theme === "dark" ? "text-white" : "text-[#00171A]"}`}
        >
          <p className="text-[15px] font-semibold tracking-wider">
            {investors.name}
          </p>
          <p className="text-[13px] tracking-wider">
            {investors.buyerType} in {investors.location}
          </p>
        </div>
      </CardHeader>
      <CardBody placeholder="" className="mb-6 p-0">
        <div className="text-justify mt-3">
          <p
            className={`text-[14px] sm:text-[15px] ${
              theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
            }`}
          >
            <span
              className={`font-semibold tracking-wider ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Interests:
            </span>
            {investors.interests}
          </p>
          <p
            className={`pt-2 text-[14px] sm:text-[15px] ${
              theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
            }`}
          >
            <span
              className={`font-semibold tracking-wider ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Background:
            </span>
            {investors.background}
          </p>
        </div>
        <div
          className={`${
            theme === "dark"
              ? "bg-[#103B3E] border-[#B8FF22]"
              : "bg-[#f0f0f0] border-[#248E38]"
          } p-2 rounded-md border mt-3`}
        >
          <div className="flex justify-between">
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } text-[15px]`}
            >
              Locations
            </p>
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } text-[15px]`}
            >
              {investors.additionalLocations}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } text-[15px]`}
            >
              Industries
            </p>
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } text-[15px]`}
            >
              {investors.industries}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[13px] font-medium">Financial Investment</p>
            <p className="font-medium">
              INR{" "}
              <span className="text-[#248E38] dark:text-[#A4E320]">
                {investors.financialInvestment}
              </span>
            </p>
          </div>
          <SecondaryButton
            title="Send Proposal"
            backgroundStyle={`border shadow-none capitalize font-thin text-[14px] px-4 py-0 rounded-full ${
              theme === "dark"
                ? "border-[#A4E320] text-[#A4E320]"
                : "border-[#248E38] text-[#248E38]"
            }`}
          />
        </div>
      </CardBody>
    </Card>
  );
};
