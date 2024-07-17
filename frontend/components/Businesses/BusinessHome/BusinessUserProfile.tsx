import React, { useState, ChangeEvent } from "react";
import { Progress } from "@material-tailwind/react";
import { useTheme } from "@/context/ThemeContext";

type BusinessProfileData = {
  investmentRange: string;
  raisedAmount: string;
  establishedYear: string;
  industry: string;
  district: string;
  businessType: string;
  productsAndServices: string;
  shortBio: string;
  facilityInfo: string;
  currentMonthlySales: string[];
  assetsInfo: string;
  typeOfInvestor: string;
};

const BusinessUserProfile: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<BusinessProfileData>({
    investmentRange: "₹50,00,000",
    raisedAmount: "₹30,00,000",
    establishedYear: "2015",
    industry: "Technology",
    district: "Bangalore",
    businessType: "Startup",
    productsAndServices:
      "With [number] years of experience navigating the dynamic landscape of media and advertising, I boast a proven track record of identifying disruptive trends, nurturing innovative ventures, and driving exceptional returns for investors.",
    shortBio:
      "With [number] years of experience navigating the dynamic landscape of media and advertising, I boast a proven track record of identifying disruptive trends, nurturing innovative ventures, and driving exceptional returns for investors.",
    facilityInfo:
      "With [number] years of experience navigating the dynamic landscape of media and advertising, I boast a proven track record of identifying disruptive trends, nurturing innovative ventures, and driving exceptional returns for investors.",
    currentMonthlySales: [
      "₹3,11,79,272.00",
      "₹3,11,79,272.00",
      "₹3,11,79,272.00",
      "₹3,11,79,272.00",
      "₹3,11,79,272.00",
      "₹3,11,79,272.00",
    ],
    assetsInfo:
      "With [number] years of experience navigating the dynamic landscape of media and advertising, I boast a proven track record of identifying disruptive trends, nurturing innovative ventures, and driving exceptional returns for investors.",
    typeOfInvestor: "Multiple",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    arrayName: "currentMonthlySales"
  ) => {
    const { value } = e.target;
    setProfileData((prevData) => {
      const updatedArray = [...prevData[arrayName]];
      updatedArray[index] = value;
      return { ...prevData, [arrayName]: updatedArray };
    });
  };

  const { theme } = useTheme();

  return (
    <section className={`sm:flex`}>
      <div
        className={`${
          theme === "dark"
            ? "bg-[#003034] text-white border-[#EAD514]"
            : "bg-[#f6f4f4] text-[#00171A] border-gray-200"
        }  border border-white rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-2 col-span-2 sm:w-full`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className=" dark:bg-[#C3EC6C] bg-[#248E38] text-white px-4 py-2 rounded-full"
          >
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>
        <div className="flex flex-col space-y-2 ">
          <p className=" font-bold text-[24px]">
            Tech Innovators in Bangalore <br className="sm:block hidden" />{" "}
            looking for Investment at Bangalore
          </p>
          <div className="border border-gray-400 rounded-xl py-4 px-4 space-y-2">
            <div className="flex justify-between">
              <h1 className="text-md">Investment Range</h1>
              {isEditMode ? (
                <input
                  type="text"
                  name="investmentRange"
                  value={profileData.investmentRange}
                  onChange={handleInputChange}
                  className=" bg-transparent border rounded-xl p-2 text-gray-400 border-gray-400"
                />
              ) : (
                <p className="">
                  Required amount :{" "}
                  <span className="text-[#EAD514]">
                    {profileData.investmentRange}
                  </span>
                </p>
              )}
            </div>
            <div>
              <Progress
                className="border-none bg-[#A4E320]"
                value={
                  (parseInt(profileData.raisedAmount.replace(/[₹,]/g, "")) /
                    parseInt(
                      profileData.investmentRange.replace(/[₹,]/g, "")
                    )) *
                  100
                }
                size="lg"
                color="green"
                placeholder={undefined}
              />
            </div>
            <p className="dark:text-[#A4E320] text-[#248E38]">
              {profileData.raisedAmount} ( 60%)
              <span className=""> raised</span>
            </p>
          </div>
          <h4 className="text-md font-semibold">
            Established Year:
            {isEditMode ? (
              <input
                type="text"
                name="establishedYear"
                value={profileData.establishedYear}
                onChange={handleInputChange}
                className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
              />
            ) : (
              <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
                {profileData.establishedYear}
              </span>
            )}
          </h4>
          <h4 className="text-md font-semibold">
            Industry :
            {isEditMode ? (
              <input
                type="text"
                name="industry"
                value={profileData.industry}
                onChange={handleInputChange}
                className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
              />
            ) : (
              <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
                {profileData.industry}
              </span>
            )}
          </h4>
          <h4 className="text-md font-semibold">
            District:
            {isEditMode ? (
              <input
                type="text"
                name="district"
                value={profileData.district}
                onChange={handleInputChange}
                className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
              />
            ) : (
              <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
                {profileData.district}
              </span>
            )}
          </h4>
          <h4 className="text-md font-semibold">
            Type of Business :
            {isEditMode ? (
              <input
                type="text"
                name="businessType"
                value={profileData.businessType}
                onChange={handleInputChange}
                className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
              />
            ) : (
              <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
                {profileData.businessType}
              </span>
            )}
          </h4>
          <h4 className="text-md font-semibold">Product and Services:</h4>
          {isEditMode ? (
            <textarea
              name="productsAndServices"
              value={profileData.productsAndServices}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <p className="text-md dark:text-gray-400 text-gray-800 font-medium">
              {profileData.productsAndServices}
            </p>
          )}
          <h4 className="text-md font-semibold">Business Short Bio :</h4>
          {isEditMode ? (
            <textarea
              name="shortBio"
              value={profileData.shortBio}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <p className="text-md dark:text-gray-400 text-gray-800 font-medium">
              {profileData.shortBio}
            </p>
          )}
          <h4 className="text-md font-semibold">Facility Info :</h4>
          {isEditMode ? (
            <textarea
              name="facilityInfo"
              value={profileData.facilityInfo}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <p className="text-md dark:text-gray-400 text-gray-800 font-medium">
              {profileData.facilityInfo}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {profileData.currentMonthlySales.map((sale, index) => (
              <div
                key={index}
                className="border dark:border-[#C3EC6C] border-[#248E38] rounded-xl py-4 px-2 sm:px-4"
              >
                <h4 className="text-md font-semibold">Current Monthly Sales</h4>
                {isEditMode ? (
                  <input
                    type="text"
                    value={sale}
                    onChange={(e) =>
                      handleArrayChange(e, index, "currentMonthlySales")
                    }
                    className=" bg-transparent border text-gray-400 rounded-xl p-2 border-gray-400"
                  />
                ) : (
                  <p className="text-md dark:text-gray-400 text-gray-800 font-medium">
                    {sale}
                  </p>
                )}
              </div>
            ))}
          </div>
          <h4 className="text-md font-semibold">Assets Info:</h4>
          {isEditMode ? (
            <textarea
              name="assetsInfo"
              value={profileData.assetsInfo}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <p className="text-md dark:text-gray-400 text-gray-800 font-medium">
              {profileData.assetsInfo}
            </p>
          )}
          <h4 className="text-md font-semibold">
            Preferred Type of Investor :
          </h4>
          {isEditMode ? (
            <input
              type="text"
              name="typeOfInvestor"
              value={profileData.typeOfInvestor}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
              {profileData.typeOfInvestor}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessUserProfile;
