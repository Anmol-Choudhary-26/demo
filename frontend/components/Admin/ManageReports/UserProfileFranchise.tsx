import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Progress } from "@material-tailwind/react";

interface Franchises {
  id: string;
  name: string;
  profileImage: string;
  reason: string;
  reportedFor: string;
  userType: string;
  location: string;
  investmentRequired: number;
  establishmentYear: number;
  industry: string;
  type: string;
  productAndServices: string;
  shortBio: string;
  facilityInfo: string;
  salesInfo: { label: string; value: number }[];
  assetsInfo: string;
  investorType: string;
  amountRaised: number; // Add this property
}

const franchisesData: Franchises[] = [
  {
    id: "1",
    name: "franchise One",
    profileImage: "/avatar.svg",
    reason: "Violation of terms",
    reportedFor: "Inappropriate behavior",
    userType: "franchise",
    location: "Location One",
    investmentRequired: 10000000,
    establishmentYear: 2015,
    industry: "Tech",
    type: "Startup",
    productAndServices: "Software development and IT services",
    shortBio: "A leading tech startup...",
    facilityInfo: "Office space, equipment, etc.",
    salesInfo: [
      { label: "Current Monthly Sales", value: 31179272 },
      { label: "Current Monthly Sales", value: 31179272 },
      { label: "Current Monthly Sales", value: 31179272 },
      // Add more sales info if needed
    ],
    assetsInfo: "Office space, equipment, etc.",
    investorType: "Multiple",
    amountRaised: 3000000, // Add this property
  },
  {
    id: "2",
    name: "franchise One",
    profileImage: "/avatar.svg",
    reason: "Violation of terms",
    reportedFor: "Inappropriate behavior",
    userType: "franchise",
    location: "Location One",
    investmentRequired: 10000000,
    establishmentYear: 2015,
    industry: "Tech",
    type: "Startup",
    productAndServices: "Software development and IT services",
    shortBio: "A leading tech startup...",
    facilityInfo: "Office space, equipment, etc.",
    salesInfo: [
      { label: "Current Monthly Sales", value: 31179272 },
      { label: "Current Monthly Sales", value: 31179272 },
      { label: "Current Monthly Sales", value: 31179272 },
      // Add more sales info if needed
    ],
    assetsInfo: "Office space, equipment, etc.",
    investorType: "Multiple",
    amountRaised: 3000000, // Add this property
  },
  // Add more franchise entries as needed
];

const UserProfileFranchise = () => {
  const router = useRouter();
  const { id } = router.query;
  const [franchise, setFranchise] = useState<Franchises | null>(null);

  useEffect(() => {
    if (id) {
      const selectedFranchise = franchisesData.find(
        (b: { id: string | string[] }) => b.id === id
      );
      setFranchise(selectedFranchise || null);
    }
  }, [id]);

  if (!franchise) {
    return <div>Loading...</div>;
  }

  const progressValue =
    (franchise.amountRaised / franchise.investmentRequired) * 100;

  return (
    <section className="sm:flex ">
      <div className="bg-[#003034] border border-white rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-4">
        <div className="flex flex-col space-y-2 text-white">
          <p className="text-white font-bold text-[24px]">
            {franchise.name} in {franchise.location}{" "}
            <br className="sm:block hidden" /> looking for Investment at{" "}
            {franchise.location}
          </p>
          <div className="border border-gray-400 rounded-xl py-4 px-4 space-y-2">
            <div className="flex justify-between">
              <h1 className="text-md">Investment Range</h1>
              <p className="text-white">
                Required amount :{" "}
                <span className="text-[#EAD514]">
                  ₹{franchise.investmentRequired}
                </span>
              </p>
            </div>
            <div>
              <Progress
                className="border-none bg-[#A4E320]"
                value={progressValue}
                size="lg"
                color="green"
                placeholder={undefined}
              />
            </div>
            <p className="text-[#A4E320]">
              ₹{franchise.amountRaised} ( {progressValue.toFixed(2)}% )
              <span className="text-white"> raised</span>
            </p>
          </div>
          <h4 className="text-md font-semibold">
            Established Year:
            <span className="text-md text-gray-400 font-thin ml-2">
              {franchise.establishmentYear}
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Industry :
            <span className="text-md text-gray-400 font-thin ml-2">
              {franchise.industry}
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            District:
            <span className="text-md text-gray-400 font-thin ml-2">
              {franchise.location}
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Type of franchise :
            <span className="text-md text-gray-400 font-thin ml-2">
              {franchise.type}
            </span>
          </h4>
          <h4 className="text-md font-semibold">Product and Services:</h4>
          <p className="text-md text-gray-400 font-thin">
            {franchise.productAndServices}
          </p>
          <h4 className="text-md font-semibold">franchise Short Bio :</h4>
          <p className="text-md text-gray-400 font-thin">
            {franchise.shortBio}
          </p>
          <h4 className="text-md font-semibold">Facility Info :</h4>
          <p className="text-md text-gray-400 font-thin">
            {franchise.facilityInfo}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {franchise.salesInfo.map((sale, index) => (
              <div
                key={index}
                className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4"
              >
                <h1>{sale.label} :</h1>
                <p className="text-[#A4E320]">
                  ₹ {sale.value.toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
          <h4 className="text-md font-semibold">Assets Info:</h4>
          <p className="text-md text-gray-400 font-thin">
            {franchise.assetsInfo}
          </p>
          <div className="flex items-center space-x-2">
            <h4 className="text-md font-semibold">Type of Investor:</h4>
            <p className="p-2 rounded-full bg-[#001719] justify-start">
              {franchise.investorType}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfileFranchise;
