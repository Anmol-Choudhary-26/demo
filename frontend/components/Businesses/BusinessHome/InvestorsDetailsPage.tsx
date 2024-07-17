import PrimaryButton from "@/components/Common/PrimaryButton";
import React from "react";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

const industries = [
  "Advertising",
  "Media & Marketing",
  "Health tech",
  "Education",
  "Web Infotech",
];

const location = ["bangalore", "Chennai", "Cochin", "Goa"];

const InvestorsDetailsPage = () => {
  const { theme } = useTheme(); // Use theme from context

  return (
    <section className="sm:flex">
      <div
        className={`${
          theme === "dark"
            ? "bg-[#003034] border-[#EAD514]"
            : "bg-[#F5F5F5] border-gray-200"
        } border rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-4 col-span-2 sm:w-3/4`}
      >
        <div className="flex flex-col space-y-2 dark:text-[#ffffff]">
          <p
            className={`${
              theme === "dark" ? "text-[#EAD514]" : "text-[#103B3E]"
            } text-[24px]`}
          >
            Investor at Media Production , Digital <br /> Marketing based on
            Kolkata, West Bengal
          </p>
          <h4 className="text-md font-semibold">
            Email:
            <span className="text-md font-medium ml-2">
              Available only after Connect
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Phone No:
            <span className="text-md font-medium ml-2">
              Available Only after connect
            </span>
          </h4>
          <h4 className="text-md font-semibold">Professional Bio:</h4>
          <p className="text-md font-medium">
            With [number] years of experience navigating the dynamic landscape
            of media and advertising, I boast a{" "}
            <br className="sm:block hidden" /> proven track record of
            identifying disruptive trends, nurturing innovative ventures, and
            driving exceptional <br className="sm:block hidden" /> returns for
            investors. My passion for storytelling and keen understanding of
            consumer behavior have fueled
            <br className="sm:block hidden" />
            successful investments in a diverse portfolio of top companies
            across the media spectrum.
          </p>
          <h4 className="text-md font-semibold">Industry Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {industries.map((industry) => (
              <p
                key={industry}
                className="bg-[#248E38] dark:bg-[#B8FF22] text-white dark:text-[#00171A] px-4 py-2 rounded-full text-center"
              >
                {industry}
              </p>
            ))}
          </div>
          <h4 className="text-md font-semibold">Location Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {location.map((place) => (
              <p
                key={place}
                className="bg-[#248E38] dark:bg-[#B8FF22] text-white dark:text-[#00171A] px-4 py-2 rounded-full text-center"
              >
                {place}
              </p>
            ))}
          </div>
          <h4 className="text-md font-semibold">Investment Range:</h4>
          <p className="text-md text-[24px] ml-2">10L to 5 Cr</p>
          <h4 className="text-md font-semibold">Recent Activity</h4>
          <div className="flex  flex-col space-y-4">
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#248E38] dark:bg-[#B8FF22] text-white dark:text-[#00171A] rounded-full mr-4" />
              <p>Connected with Two Businesses</p>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#248E38] dark:bg-[#B8FF22] text-white  rounded-full mr-4" />
              <div>
                <p>Received 10 Proposals</p>
                <p className="sm:block hidden text-md text-gray-600 font-medium">
                  From Two startup - in Healthtech and Edtech
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#248E38] dark:bg-[#B8FF22] text-white dark:text-[#00171A] rounded-full mr-4" />
              <div>
                <p>Earlier than 7 days </p>
                <p className="sm:block hidden text-md text-gray-600 font-medium">
                  Received 8 proposals from - Edtech, health tech, manufacture,
                  Hotel Chain, Medical
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#248E38] dark:bg-[#B8FF22] text-white  rounded-full mr-4" />
              <div>
                <p>Earlier than 14 days </p>
                <p className="sm:block hidden text-md text-gray-600 font-medium">
                  Received 3 proposals from - Edtech, health tech, manufacture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          theme === "dark"
            ? "bg-[#003034] text-white"
            : "bg-[#F5F5F5] text-black"
        } text-center rounded-xl p-4 m-4 sm:w-1/4 self-start border ${
          theme === "dark" ? "border-[#EAD514]" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-[20px]">Send Business Proposal</h1>
          <p className="text-md">
            To engage serious business, sending proposals is <br /> allowed only
            on premium plans
          </p>
          <div className="m-auto">
            <PrimaryButton
              title="Send Proposal"
              backgroundStyle="bg-[#248E38] dark:bg-[#B8FF22] text-white dark:text-[#00171A] capitalize text-[14px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorsDetailsPage;
