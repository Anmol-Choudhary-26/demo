import PrimaryButton from "@/components/Common/PrimaryButton";
import SecondaryButton from "@/components/Common/SecondaryButton";
import { Progress } from "@material-tailwind/react";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const BusinessDetailsPage = () => {
  const { theme } = useTheme();

  return (
    <section className="sm:flex">
      <div
        className={`border rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-4 col-span-2 sm:w-3/4 ${
          theme === "dark"
            ? "bg-[#003034] border-[#EAD514] text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <p
            className={`text-[24px] ${
              theme === "dark" ? "text-[#EAD514]" : "text-[#00171A]"
            }`}
          >
            Film Production company in Thrissur{" "}
            <br className="sm:block hidden" /> looking for Investment at Chennai
          </p>
          <div
            className={`border rounded-xl py-4 px-4 space-y-2 ${
              theme === "dark" ? "border-gray-400" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between">
              <h1 className="text-md">Investment Range</h1>
              <p>
                Required amount :{" "}
                <span
                  className={`text-${
                    theme === "dark" ? "[#A4E320]" : "[#248E38]"
                  }`}
                >
                  ₹3 Cr
                </span>
              </p>
            </div>
            <div>
              <Progress
                className={`border-none ${
                  theme === "dark" ? "bg-[#A4E320]" : "bg-[#248E38]"
                }`}
                value={25}
                size="lg"
                color="green"
                placeholder={undefined}
              />
            </div>
            <p
              className={`text-${theme === "dark" ? "[#A4E320]" : "[#248E38]"}`}
            >
              ₹ 30 L (30%) <span className="text-white">raised</span>
            </p>
          </div>
          <h4 className="text-md font-semibold">
            Established Year:
            <span
              className={`text-md font-thin ml-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              2016
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Industry :
            <span
              className={`text-md font-thin ml-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Media and Marketing
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            District:
            <span
              className={`text-md font-thin ml-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Thrissur
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Type of Business :
            <span
              className={`text-md font-thin ml-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Film Production
            </span>
          </h4>
          <h4 className="text-md font-semibold">Product and Services:</h4>
          <p
            className={`text-md font-thin ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
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
          <h4 className="text-md font-semibold">Business Short Bio :</h4>
          <p
            className={`text-md font-thin ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
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
          <h4 className="text-md font-semibold">Facility Info :</h4>
          <p
            className={`text-md font-thin ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`text-md border py-5 px-5 rounded-xl space-y-4 ${
                  theme === "dark"
                    ? "text-white border-[#A4E320]"
                    : "text-black border-[#248E38]"
                }`}
              >
                <h1>Current Monthly Sales :</h1>
                <p
                  className={`${
                    theme === "dark" ? "text-[#A4E320]" : "text-[#248E38]"
                  }`}
                >
                  ₹ 3,11,79,272.00 Rs
                </p>
              </div>
            ))}
          </div>
          <h4 className="text-md font-semibold">Assets Info:</h4>
          <p
            className={`text-md font-thin ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
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
          <div className="flex items-center space-x-2">
            <h4 className="text-md font-semibold">Type of Investor:</h4>
            <p
              className={`p-2 rounded-full ${
                theme === "dark" ? "bg-[#001719]" : "bg-[#e0e0e0]"
              } justify-start`}
            >
              Multiple
            </p>
          </div>
        </div>
      </div>
      <div
        className={`text-center rounded-xl p-4 m-4 sm:w-1/4 self-start ${
          theme === "dark"
            ? "bg-[#003034] text-white"
            : "bg-[#f0f0f0] text-black"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <h1
            className={`text-[20px] ${
              theme === "dark" ? "text-[#A4E320]" : "text-[#248E38]"
            }`}
          >
            connected!
          </h1>
          <p
            className={`text-md ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            To engage serious business, sending proposals is <br /> allowed only
            on premium plans
          </p>
          <div className="m-auto">
            <SecondaryButton
              title="Chat"
              backgroundStyle={`border capitalize font-[14px] rounded-full ${
                theme === "dark"
                  ? "border-[#A4E320] text-[#A4E320]"
                  : "border-[#248E38] text-[#248E38]"
              }`}
            />
          </div>
          <div className="m-auto">
            <SecondaryButton
              title="Report User"
              backgroundStyle={`border capitalize font-[14px] rounded-full ${
                theme === "dark"
                  ? "border-[#A4E320] text-[#A4E320]"
                  : "border-[#248E38] text-[#248E38]"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessDetailsPage;
