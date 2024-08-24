import { useState } from "react";
import { searchindustry, updateindustry, deleteindustry } from "@/hooks/useIndustry";
type ViewType = "add" | "delete" | "edit" | "";

export default function ManageIndustry() {
  const [view, setView] = useState<ViewType>("");
  const [searchQueryDelete, setSearchQueryDelete] = useState<string>("");
  const [searchQueryEdit, setSearchQueryEdit] = useState<string>("");
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [industriesForDelete, setIndustriesForDelete] = useState<string[]>([]);
  const [industriesForEdit, setIndustriesForEdit] = useState<string[]>([]);

  const getButtonClass = (buttonView: ViewType) => {
    return view === buttonView
      ? "role_button border-[#A4E320] text-[#A4E320]"
      : "role_button";
  };

  // const handleSearchDelete = () => {
  //   if (searchQueryDelete.trim() !== "") {
  //     setIndustriesForDelete([...industriesForDelete, searchQueryDelete]);
  //     setSearchQueryDelete("");
  //   }
  // };

  // const handleSearchEdit = () => {
  //   if (searchQueryEdit.trim() !== "") {
  //     setIndustriesForEdit([...industriesForEdit, searchQueryEdit]);
  //     setEditMode({ ...editMode, [searchQueryEdit]: false });
  //     setSearchQueryEdit("");
  //   }
  // };

  // const handleDelete = (industry: string) => {
  //   // Logic to delete the industry
  //   console.log(Deleting ${industry});
  //   // Remove the industry from the list after deletion
  //   setIndustriesForDelete(
  //     industriesForDelete.filter((item) => item !== industry)
  //   );
  // };
  
  const handleSearchDelete = async () => {
    // Set the current industry to searchQueryDelete to simulate finding that industry

    try {
      const response = await searchindustry(searchQueryDelete);
      console.log(response);
      setIndustriesForDelete(response)
      
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setSearchQueryDelete("");
  };

  const handleSearchEdit = async () => {
    // Set the current industry to searchQueryEdit to simulate finding that industry
    try {
      const response = await searchindustry(searchQueryDelete);
      console.log(response);
      setIndustriesForEdit(response);
      
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setSearchQueryEdit("");
  };

  const handleDelete = (industry: string) => {
    // Logic to delete the industry
    console.log(`Deleting ${industry}`);
    // Remove the industry from the list after deletion
    setIndustriesForDelete(
      industriesForDelete.filter((item) => item !== industry)
    );
  };

  const handleEdit = (index: number) => {
    // Enable edit mode for the industry
    const newEditMode = { ...editMode };
    newEditMode[index] = true;
    setEditMode(newEditMode);
  };

  const handleSaveEdit = (index: number, newIndustry: string) => {
    // Logic to save the edited industry
    const newIndustriesForEdit = [...industriesForEdit];
    newIndustriesForEdit[index] = newIndustry;
    setIndustriesForEdit(newIndustriesForEdit);
    setEditMode({ ...editMode, [index]: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00171A] text-white">
      <h1 className="text-xl font-bold mb-4">Manage an Industry</h1>
      <div className="md:space-x-2 flex flex-col md:flex-row gap-2 mb-4">
        <button
          onClick={() => setView("add")}
          className={getButtonClass("add")}
        >
          Add an Industry
        </button>
        <button
          onClick={() => {
            setView("delete");
            setIndustriesForDelete([]);
          }}
          className={getButtonClass("delete")}
        >
          Delete an Industry
        </button>
        <button
          onClick={() => {
            setView("edit");
            setIndustriesForEdit([]);
            setEditMode({});
          }}
          className={getButtonClass("edit")}
        >
          Edit an Industry
        </button>
      </div>
      {view === "add" && (
        <div className="">
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add Industry Here"
                className="p-3 sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none w-3/4"
              />
              <button className="bg-[#A4E320] text-[#103B3E] px-4 py-3 ml-2 rounded-full">
                AddNow
              </button>
            </div>
          </div>
        </div>
      )}
      {view === "delete" && (
        <div className="">
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Digital Marketing"
                className="p-3 sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none w-3/4"
                value={searchQueryDelete}
                onChange={(e) => setSearchQueryDelete(e.target.value)}
              />
              <button
                onClick={handleSearchDelete}
                className="bg-[#A4E320] text-[#103B3E] px-4 py-3 ml-2 rounded-full"
              >
                Search
              </button>
            </div>
          </div>
          <div>
            {industriesForDelete.map((industry) => (
              <div
                key={industry}
                className="bg-[#001F22] p-4 rounded flex justify-between items-center mt-2"
              >
                <label className="block">{industry}</label>
                <button
                  onClick={() => handleDelete(industry)}
                  className="bg-[#EC183E] px-4 py-2 rounded-full"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "edit" && (
        <div>
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Digital Marketing"
                className="p-3 sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none w-3/4"
                value={searchQueryEdit}
                onChange={(e) => setSearchQueryEdit(e.target.value)}
              />
              <button
                onClick={handleSearchEdit}
                className="bg-[#A4E320] text-[#103B3E] px-4 py-3 ml-2 rounded-full"
              >
                Search
              </button>
            </div>
          </div>
          {industriesForEdit.map((industry, index) => (
            <div
              key={index}
              className="bg-[#001F22] p-4 rounded flex justify-between items-center mt-2"
            >
              {editMode[index] ? (
                <>
                  <input
                    type="text"
                    className="text-black p-2 rounded"
                    value={industry}
                    onChange={(e) => {
                      const newIndustries = [...industriesForEdit];
                      newIndustries[index] = e.target.value;
                      setIndustriesForEdit(newIndustries);
                    }}
                  />
                  <button
                    onClick={() =>
                      handleSaveEdit(index, industriesForEdit[index])
                    }
                    className="bg-[#A4E320] px-4 py-2 rounded-full"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <label className="block">{industry}</label>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-[#A4E320] px-4 py-2 rounded-full"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}