import React, { useEffect, useState } from "react";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";
import DeleteAdmin from "./DeleteAdmin";
import AllAdmins from "./AllAdmins";

type ActiveComponent = "all" | "add" | "edit" | "delete";

const ManageAdmins: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(
    () => {
      // Retrieve the active component from localStorage or default to "all"
      const savedComponent = localStorage.getItem("activeComponent");
      return (savedComponent as ActiveComponent) || "all";
    }
  );

  useEffect(() => {
    // Save the active component to localStorage whenever it changes
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "all":
        return <AllAdmins />;
      case "add":
        return <AddAdmin />;
      case "edit":
        return <EditAdmin mode="edit" />;
      case "delete":
        return <DeleteAdmin mode="delete" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#00171A] text-white p-4">
      <h1 className="text-xl font-bold mb-4">Manage Admins</h1>
      <div className="grid grid-cols-2 gap-4 md:flex p-2 justify-between">
        <button
          onClick={() => setActiveComponent("all")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-md hover:text-[#001F22] ${
            activeComponent === "all"
              ? "border-2 border-[#A4E320] text-white"
              : "role_button border-2 border-gray-400"
          }`}
        >
          All Admins
        </button>
        <button
          onClick={() => setActiveComponent("add")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-md hover:text-[#001F22] ${
            activeComponent === "add"
              ? "border-2 border-[#A4E320] text-white"
              : "role_button border-2 border-gray-400"
          }`}
        >
          Add an Admins
        </button>
        <button
          onClick={() => setActiveComponent("edit")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-md hover:text-[#001F22] ${
            activeComponent === "edit"
              ? "border-2 border-[#A4E320] text-white"
              : "role_button border-2 border-gray-400"
          }`}
        >
          Edit an Admins
        </button>
        <button
          onClick={() => setActiveComponent("delete")}
          className={`font-medium py-2 px-4 hover:bg-[#A4E320] rounded-md hover:text-[#001F22] ${
            activeComponent === "delete"
              ? "border-2 border-[#A4E320] text-white"
              : "role_button border-2 border-gray-400"
          }`}
        >
          Delete an Admins
        </button>
      </div>
      <div className="w-full p-4">{renderComponent()}</div>
    </div>
  );
};

export default ManageAdmins;
