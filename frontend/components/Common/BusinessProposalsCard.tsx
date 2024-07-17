import React, { FC } from "react";
import { useTheme } from "@/context/ThemeContext";

type InvestorProposalsCardProps = {
  onAccept: () => void;
  onReject: () => void;
  onChat: () => void;
};

const BusinessProposalsCard: FC<InvestorProposalsCardProps> = ({
  onAccept,
  onReject,
  onChat,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`space-y-2 px-4 py-4 rounded-xl m-4 ${
        theme === "dark" ? "bg-[#003034]" : "bg-[#f0f0f0]"
      }`}
    >
      <div className="sm:flex justify-between">
        <h1
          className={`text-[20px] sm:text-[24px] ${
            theme === "dark" ? "text-white" : "text-[#00171A]"
          }`}
        >
          Investor at Media Production Interested to Invest ₹1 Cr{" "}
        </h1>
        <h1 className="text-sm text-gray-400">5/12/23 || 04:02 am</h1>
      </div>
      <div
        className={`sm:flex justify-start sm:space-x-8 space-y-2 sm:space-y-0 ${
          theme === "dark" ? "text-white" : "text-[#00171A]"
        }`}
      >
        <p className="text-md">
          Email:
          <span className="text-thin text-gray-400 pl-2">
            Available only after Connect
          </span>
        </p>
        <p className="text-md mr-2">
          Phone No:
          <span className="text-thin text-gray-400 pl-2">
            Available Only after connect
          </span>
        </p>
      </div>
      <div className="gap-4 sm:space-x-2 grid grid-cols-1 sm:flex">
        <button
          className="bg-[#C3EC6C] text-[#103B3E] text-[14px] rounded-full py-3 px-8"
          onClick={onAccept}
        >
          Accept Now
        </button>
        <button
          className="bg-[#FFFFFF] text-[#FF2C46] border border-[#FF2C46] text-[14px] rounded-full py-3 px-8"
          onClick={onReject}
        >
          Reject Now
        </button>
        <button
          className="border border-[#A4E320] text-[#A4E320] text-[14px] rounded-full py-3 px-8"
          onClick={onChat}
        >
          Chat-only after connect
        </button>
      </div>
    </div>
  );
};

export default BusinessProposalsCard;
