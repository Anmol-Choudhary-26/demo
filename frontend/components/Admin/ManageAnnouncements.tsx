import React, { useState } from "react";
import AllAnnouncements from "./Announcements/AllAnnouncements";
import InvestorAnnouncements from "./Announcements/InvestorAnnouncements";
import BusinessesAnnouncements from "./Announcements/BusinessesAnnouncements";
import FranchiseAnnouncements from "./Announcements/FranchiseAnnouncements";
import IdeasAnnouncements from "./Announcements/IdeasAnnouncements";

const ManageAnnouncements = () => {
  const [activeComponent, setActiveComponent] = useState("Component1");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Component1":
        return <AllAnnouncements />;
      case "Component2":
        return <InvestorAnnouncements />;
      case "Component3":
        return <BusinessesAnnouncements />;
      case "Component4":
        return <FranchiseAnnouncements />;
      case "Component5":
        return <IdeasAnnouncements />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#00171A] text-white p-4">
      <h1 className="text-xl font-bold mb-4">Manage Announcements</h1>
      <div className="grid grid-cols-3 justify-self-center md:flex gap-2 md:border-2 p-2 md:border-[#ffffff] rounded-full md:w-[700px] justify-between mb-4">
        <button
          onClick={() => setActiveComponent("Component1")}
          className={`font-medium py-2 border md:border-none px-4 hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component1"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveComponent("Component2")}
          className={`font-medium py-2 px-4 border md:border-none hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component2"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Investors
        </button>
        <button
          onClick={() => setActiveComponent("Component3")}
          className={`font-medium py-2 px-2 border md:border-none hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component3"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Businesses
        </button>
        <button
          onClick={() => setActiveComponent("Component4")}
          className={`font-medium py-2 px-2 border md:border-none hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component4"
              ? "bg-[#A4E320] text-[#001F22]"
              : "bg-transparent"
          }`}
        >
          Franchises
        </button>
        <button
          onClick={() => setActiveComponent("Component5")}
          className={`font-medium py-2 px-4 border md:border-none hover:bg-[#A4E320] rounded-full hover:text-[#001F22] ${
            activeComponent === "Component5"
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

export default ManageAnnouncements;
