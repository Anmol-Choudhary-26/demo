import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import SecondaryButton from "./SecondaryButton";
import { Business } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { useBookmarks } from "@/context/BookmarkContext";

interface BusinessCardProps {
  business: Business; // Expect a single business object
}

export function BusinessCard({ business }: BusinessCardProps) {
  const { theme } = useTheme();
  const { bookmarkedBusinesses, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = bookmarkedBusinesses.some(
    (b) => b.name === business.name
  );

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(business);
    } else {
      addBookmark(business);
    }
  };

  if (!business) {
    // console.log("No business data provided");
    return null; // This will ensure nothing is rendered if business data is undefined.
  }

  const {
    name,
    industry,
    State,
    district,
    InvestmentRangeEnd,
    establishedDate,
    legalEntity,
  } = business;

  return (
    <Card
      color="transparent"
      shadow={false}
      className={`w-full relative ${
        theme === "dark"
          ? "bg-[#003034] text-white"
          : "bg-white text-[#00171A] border border-gray-400"
      } rounded-lg px-4`}
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
        <p
          className={`text-[16px] font-semibold tracking-wide ${
            theme === "dark" ? "text-white" : "text-[#00171A]"
          }`}
        >
          {name} - {industry}
        </p>
        {isBookmarked ? (
          <BsBookmarkFill
            onClick={handleBookmarkClick}
            className={`cursor-pointer ${
              theme === "dark" ? "text-[#A4E320]" : "text-[#248E38]"
            }`}
            size={24}
          />
        ) : (
          <BsBookmark
            onClick={handleBookmarkClick}
            className={`cursor-pointer ${
              theme === "dark" ? "text-[#A4E320]" : "text-[#248E38]"
            }`}
            size={24}
          />
        )}
      </CardHeader>
      <CardBody placeholder="" className="mb-6 p-0">
        <p className="font-thin text-[14px] text-[#cccccc] text-justify">
          Investment opportunity in {district}, {State} requiring ₹
          {InvestmentRangeEnd}. Established in{" "}
          {establishedDate}.
        </p>
        <div
          className={`${
            theme === "dark"
              ? "bg-[#103B3E] border-[#B8FF22]"
              : "bg-[#f0f0f0] border-[#248E38]"
          } p-2 rounded-md border mt-2`}
        >
          <div className="flex justify-between">
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              }`}
            >
              Legal Entity
            </p>
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } font-semibold`}
            >
              {legalEntity}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } text-[15px]`}
            >
              EBIDTA Margin
            </p>
            <p
              className={`${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              } text-[15px]`}
            >
              NIL
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[13px] font-thin">Financial Investment</p>
            <p className="font-thin">
              INR{" "}
              <span className="text-[#248E38] dark:text-[#A4E320] font-medium">
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
