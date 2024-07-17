import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Investor } from "@/types";

interface InvestorsCardProps {
  investors: Investor;
}

export function ManageInvestorsCard({ investors }: InvestorsCardProps) {
  const router = useRouter();

  const handleProposalClick = () => {
    router.push({
      pathname: "/Admin/manage-users/manage-investors",
      query: { id: investors.id },
    });
    console.log(investors.id);
  };

  return (
    <Card
      placeholder=""
      color="transparent"
      shadow={false}
      className={`w-full bg-[#003034] rounded-lg px-4 text-white`}
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
        <div className="text-white">
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
          <p className="text-[#cccccc] text-[14px] sm:text-[15px]">
            <span className="font-semibold tracking-wider text-[#ffffff]">
              Interests:
            </span>
            {investors.interests}
          </p>
          <p className="text-[#cccccc] pt-2 text-[14px] sm:text-[15px]">
            <span className="font-semibold tracking-wider text-[#ffffff]">
              Background:
            </span>
            {investors.background}
          </p>
        </div>
        <div className="bg-[#103B3E] p-2 rounded-md border border-[#B8FF22] mt-3">
          <div className="flex justify-between">
            <p className="text-[#cccccc] text-[15px]">Locations</p>
            <p className="text-[#cccccc] text-[15px]">
              {investors.additionalLocations}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#cccccc] text-[15px]">Industries</p>
            <p className="text-[#cccccc] text-[15px]">{investors.industries}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[13px] font-thin">Financial Investment</p>
            <p className="font-thin">
              INR{" "}
              <span className="text-[#A4E320]">
                {investors.financialInvestment}
              </span>
            </p>
          </div>
          <button
            onClick={handleProposalClick}
            className="border border-[#A4E320] shadow-none text-[#A4E320] capitalize font-thin text-[14px] px-2 py-0 rounded-full"
          >
            Send Proposal
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
