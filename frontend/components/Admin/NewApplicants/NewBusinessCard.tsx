import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { Business } from "@/types";
import { useRouter } from "next/router";

interface BusinessCardProps {
  business: Business; // Expect a single business object
}

export function NewBusinessCard({ business }: BusinessCardProps) {
  const router = useRouter();

  const handleContactClick = () => {
    router.push({
      pathname: "/Admin/new-applicants/business-applicant",
      query: { id: business.id },
    });
    console.log(business.id);
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className={`w-full bg-[#003034] rounded-lg px-4 text-white`}
      placeholder={undefined}
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex justify-between items-center gap-4 pt-0 pb-8 border-none rounded-none"
        placeholder={undefined}
      >
        <Image src={"/building.svg"} alt="building" width={50} height={50} />
        <p className="text-[16px] font-semibold tracking-wide text-white">
          {business.name} - {business.industry}
        </p>
      </CardHeader>
      <CardBody className="mb-6 p-0" placeholder={undefined}>
        <p className="font-thin text-[14px] text-[#cccccc] text-justify">
          Investment opportunity in {business.location} requiring ₹
          {business.investmentRequired.toLocaleString()}. Established in{" "}
          {business.establishmentYear}.
        </p>
        <div className="bg-[#103B3E] p-2 rounded-md border border-[#B8FF22] mt-2">
          <div className="flex justify-between">
            <p className="text-[#cccccc]">Legal Entity</p>
            <p className="text-[#cccccc] font-semibold">
              {business.legalEntity}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-[#cccccc] text-[15px]">EBIDTA Margin</p>
            <p className="text-[#cccccc] text-[15px]">NIL</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[13px] font-thin">Financial Investment</p>
            <p className="font-thin">
              INR <span className="text-[#A4E320]">4 Crore for 8%</span>
            </p>
          </div>
          <button
            onClick={handleContactClick}
            className="border border-[#A4E320] shadow-none text-[#A4E320] capitalize font-thin text-[14px] px-2 py-0 rounded-full"
          >
            Contact Business
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
