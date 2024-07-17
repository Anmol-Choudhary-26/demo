import React, { useState } from "react";
import BusinessNewApplicants from "./NewApplicants/BusinessNewApplicants";
import InvestorsNewApplicants from "./NewApplicants/InvestorsNewApplicants";

const ManageApplicants = () => {
  const [activeComponent, setActiveComponent] = useState("Component1");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Component1":
        return <BusinessNewApplicants />;
      case "Component2":
        return <InvestorsNewApplicants />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-centers bg-[#00171A] text-white p-4">
      <h1 className="text-xl font-bold mb-4">View New Applicants</h1>
      <div className="flex p-2 border-2 border-[#ffffff] rounded-full justify-between">
        <button
          onClick={() => setActiveComponent("Component1")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component1"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Businesses
        </button>
        <button
          onClick={() => setActiveComponent("Component2")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component2"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Investors
        </button>
      </div>
      <div className="mt-4">{renderComponent()}</div>
    </div>
  );
};

export default ManageApplicants;
