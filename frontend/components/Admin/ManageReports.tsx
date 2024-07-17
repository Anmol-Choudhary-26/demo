import React, { useState } from "react";
import ManageInvestorsReport from "./ManageReports/ManageInvestorsReport";
import ManageBusinessesReport from "./ManageReports/ManageBusinessesReport";
import ManageFranchiseReport from "./ManageReports/ManageFranchiseReport";
import ManageIdeasReport from "./ManageReports/ManageIdeasReport";

const ManageReports = () => {
  const [activeComponent, setActiveComponent] = useState("Component1");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Component1":
        return <ManageInvestorsReport />;
      case "Component2":
        return <ManageBusinessesReport />;
      case "Component3":
        return <ManageFranchiseReport />;
      case "Component4":
        return <ManageIdeasReport />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#00171A] text-white p-4">
      <h1 className="text-xl font-bold mb-4">Manage Your Reports</h1>
      <div className="grid grid-cols-2 md:flex gap-2 md:border-2 p-2 md:border-[#ffffff] rounded-full md:w-[700px] justify-between mb-4">
        <button
          onClick={() => setActiveComponent("Component1")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component1"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Investors
        </button>
        <button
          onClick={() => setActiveComponent("Component2")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component2"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Businesses
        </button>
        <button
          onClick={() => setActiveComponent("Component3")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component3"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Franchises
        </button>
        <button
          onClick={() => setActiveComponent("Component4")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component4"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Ideas
        </button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default ManageReports;
