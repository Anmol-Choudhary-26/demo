import { useTheme } from "@/context/ThemeContext";
import React, { useState, ChangeEvent } from "react";

type ProfileData = {
  email: string;
  phone: string;
  bio: string;
  industryInterests: string[];
  locationInterests: string[];
  investmentRange: string;
  recentActivity: { text: string; details: string }[];
};

const industries = [
  "Advertising",
  "Media & Marketing",
  "Health tech",
  "Education",
  "Web Infotech",
];

const locations = ["Bangalore", "Chennai", "Cochin", "Goa"];

const InvestorsUserProfile: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "Available only after Connect",
    phone: "Available Only after connect",
    bio: "With [number] years of experience navigating the dynamic landscape of media and advertising, I boast a proven track record of identifying disruptive trends, nurturing innovative ventures, and driving exceptional returns for investors. My passion for storytelling and keen understanding of consumer behavior have fueled successful investments in a diverse portfolio of top companies across the media spectrum.",
    industryInterests: industries,
    locationInterests: locations,
    investmentRange: "10L to 5 Cr",
    recentActivity: [
      { text: "Connected with Two Businesses", details: "" },
      {
        text: "Received 10 Proposals",
        details: "From Two startup - in Healthtech and Edtech",
      },
      {
        text: "Earlier than 7 days",
        details:
          "Received 8 proposals from - Edtech, health tech, manufacture, Hotel Chain, Medical",
      },
      {
        text: "Earlier than 14 days",
        details:
          "Received 3 proposals from - Edtech, health tech, manufacture.",
      },
    ],
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
    arrayName: "industryInterests" | "locationInterests" | "recentActivity"
  ) => {
    const { value } = e.target;
    setProfileData((prevData) => {
      if (arrayName === "recentActivity") {
        const updatedActivity = [...prevData[arrayName]];
        const [field, activityIndex] = e.target.name.split("-");
        if (field === "text") {
          updatedActivity[parseInt(activityIndex)].text = value;
        } else {
          updatedActivity[parseInt(activityIndex)].details = value;
        }
        return { ...prevData, recentActivity: updatedActivity };
      } else {
        const updatedArray = [...prevData[arrayName]];
        updatedArray[index] = value;
        return { ...prevData, [arrayName]: updatedArray };
      }
    });
  };

  const { theme } = useTheme();

  return (
    <section className="sm:flex">
      <div
        className={`${
          theme === "dark"
            ? "bg-[#003034] text-white border-[#EAD514]"
            : "bg-[#f6f4f4] text-[#00171A] border-gray-200"
        } border border-white rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-2 col-span-2 sm:w-full`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className=" dark:bg-[#C3EC6C] bg-[#248E38] px-4 py-2 text-white rounded-full"
          >
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>
        <div className="flex flex-col space-y-2 ">
          <p className=" font-bold text-[24px]">
            Investor at Media Production , Digital <br /> Marketing based on
            Kolkata, West Bengal
          </p>
          <h4 className="text-md font-semibold">
            Email:
            {isEditMode ? (
              <input
                type="text"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
              />
            ) : (
              <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
                {profileData.email}
              </span>
            )}
          </h4>
          <h4 className="text-md font-semibold">
            Phone No:
            {isEditMode ? (
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
              />
            ) : (
              <span className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2">
                {profileData.phone}
              </span>
            )}
          </h4>
          <h4 className="text-md font-semibold">Professional Bio:</h4>
          {isEditMode ? (
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <p className="text-md dark:text-gray-400 text-gray-800 font-medium">
              {profileData.bio}
            </p>
          )}
          <h4 className="text-md font-semibold">Industry Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {profileData.industryInterests.map((industry, index) => (
              <div key={index}>
                {isEditMode ? (
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) =>
                      handleArrayChange(e, index, "industryInterests")
                    }
                    className="dark:bg-[#C3EC6C] bg-[#248E38] dark:text-black text-white px-4 py-2 rounded-full text-center"
                  />
                ) : (
                  <p className="dark:bg-[#C3EC6C] bg-[#248E38] dark:text-black text-white px-4 py-2 rounded-full text-center">
                    {industry}
                  </p>
                )}
              </div>
            ))}
          </div>
          <h4 className="text-md font-semibold">Location Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {profileData.locationInterests.map((place, index) => (
              <div key={index}>
                {isEditMode ? (
                  <input
                    type="text"
                    value={place}
                    onChange={(e) =>
                      handleArrayChange(e, index, "locationInterests")
                    }
                    className="dark:bg-[#C3EC6C] bg-[#248E38] dark:text-black text-white px-4 py-2 rounded-full text-center"
                  />
                ) : (
                  <p className="dark:bg-[#C3EC6C] bg-[#248E38] dark:text-black text-white px-4 py-2 rounded-full text-center">
                    {place}
                  </p>
                )}
              </div>
            ))}
          </div>
          <h4 className="text-md font-semibold">Investment Range:</h4>
          {isEditMode ? (
            <input
              type="text"
              name="investmentRange"
              value={profileData.investmentRange}
              onChange={handleInputChange}
              className="text-md dark:text-gray-400 text-gray-800 font-medium ml-2 bg-transparent border rounded-xl p-2 border-gray-400"
            />
          ) : (
            <p className="text-md text-[24px] ml-2">
              {profileData.investmentRange}
            </p>
          )}
          <h4 className="text-md font-semibold">Recent Activity</h4>
          <div className="flex flex-col space-y-4">
            {profileData.recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-start items-center">
                <div className="w-10 h-10 dark:bg-[#C3EC6C] bg-[#248E38] rounded-full text-white mr-4" />
                <div>
                  {isEditMode ? (
                    <>
                      <input
                        type="text"
                        name={`text-${index}`}
                        value={activity.text}
                        onChange={(e) =>
                          handleArrayChange(e, index, "recentActivity")
                        }
                        className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400"
                      />
                      <input
                        type="text"
                        name={`details-${index}`}
                        value={activity.details}
                        onChange={(e) =>
                          handleArrayChange(e, index, "recentActivity")
                        }
                        className="text-md dark:text-gray-400 text-gray-800 font-medium bg-transparent border rounded-xl p-2 border-gray-400 mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <p>{activity.text}</p>
                      <p className="sm:block hidden text-md dark:text-gray-400 text-gray-800 font-medium">
                        {activity.details}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorsUserProfile;
