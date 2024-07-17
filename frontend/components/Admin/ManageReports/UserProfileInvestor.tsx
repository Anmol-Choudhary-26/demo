import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/Admin/Model";

export type Investor = {
  id: string;
  industry: string;
  location: string;
  experience: number;
  investmentRange: string;
  recentActivity: {
    description: string;
    details?: string;
  }[];
};

const industries = [
  "Advertising",
  "Media & Marketing",
  "Health tech",
  "Education",
  "Web Infotech",
];

const locations = ["Bangalore", "Chennai", "Cochin", "Goa"];

const investorsData: Investor[] = [
  {
    id: "1",
    industry: "Media Production, Digital Marketing",
    location: "Kolkata, West Bengal",
    experience: 10,
    investmentRange: "10L to 5 Cr",
    recentActivity: [
      { description: "Connected with Two Businesses" },
      {
        description: "Received 10 Proposals",
        details: "From Two startups - in Healthtech and Edtech",
      },
      {
        description: "Earlier than 7 days",
        details:
          "Received 8 proposals from - Edtech, health tech, manufacture, Hotel Chain, Medical",
      },
      {
        description: "Earlier than 14 days",
        details:
          "Received 3 proposals from - Edtech, health tech, manufacture.",
      },
    ],
  },
  // Add more investors as needed
];

const UserProfileInvestor = () => {
  const router = useRouter();
  const { id } = router.query;
  const [investor, setInvestor] = useState<Investor | null>(null);

  useEffect(() => {
    if (id) {
      const selectedInvestor = investorsData.find((b) => b.id === id);
      setInvestor(selectedInvestor || null);
    }
  }, [id]);

  if (!investor) {
    return <div>Loading investor profile...</div>;
  }

  return (
    <section className="sm:flex">
      <div className="bg-[#003034] border border-white rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-4">
        <div className="flex flex-col space-y-2 text-white">
          <p className="text-white font-bold text-[24px]">
            Investor at {investor.industry}, based in {investor.location}
          </p>
          <h4 className="text-md font-semibold">
            Email:
            <span className="text-md text-gray-400 font-thin ml-2">
              Available only after connect
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Phone No:
            <span className="text-md text-gray-400 font-thin ml-2">
              Available only after connect
            </span>
          </h4>
          <h4 className="text-md font-semibold">Professional Bio:</h4>
          <p className="text-md text-gray-400 font-thin">
            With {investor.experience} years of experience navigating the
            dynamic landscape of media and advertising, I boast a proven track
            record of identifying disruptive trends, nurturing innovative
            ventures, and driving exceptional returns for investors. My passion
            for storytelling and keen understanding of consumer behavior have
            fueled successful investments in a diverse portfolio of top
            companies across the media spectrum.
          </p>
          <h4 className="text-md font-semibold">Industry Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {industries.map((industry) => (
              <p
                key={industry}
                className="bg-[#C3EC6C] text-black px-4 py-2 rounded-full text-center"
              >
                {industry}
              </p>
            ))}
          </div>
          <h4 className="text-md font-semibold">Location Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {locations.map((place) => (
              <p
                key={place}
                className="bg-[#C3EC6C] text-black px-4 py-2 rounded-full text-center"
              >
                {place}
              </p>
            ))}
          </div>
          <h4 className="text-md font-semibold">Investment Range:</h4>
          <p className="text-md text-[24px] ml-2">{investor.investmentRange}</p>
          <h4 className="text-md font-semibold">Recent Activity</h4>
          <div className="flex flex-col space-y-4">
            {investor.recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-start items-center">
                <div className="w-10 h-10 bg-[#C3EC6C] rounded-full mr-4" />
                <div>
                  <p>{activity.description}</p>
                  {activity.details && (
                    <p className="sm:block hidden text-md text-gray-400 font-thin">
                      {activity.details}
                    </p>
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

export default UserProfileInvestor;
