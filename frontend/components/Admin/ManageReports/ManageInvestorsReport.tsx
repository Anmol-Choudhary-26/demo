import React, { useState } from "react";
import ReportedUserCard from "./ReportedUserCard";
import { investorReports, searchinvestorReports } from "@/hooks/useReports";

const itemsPerPage = 12;

const ManageInvestorsReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [currentUsers, setCurrentUsers] = useState([])
  
  React.useEffect(() => {
    const fn = async () => {
      const data = await investorReports()
      setCurrentUsers(data);
    }
    fn();
  },[])
  const totalPages = Math.ceil(currentUsers.length / itemsPerPage);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleSearch = async() =>{
    const data = await searchinvestorReports(searchTerm)
    setCurrentUsers(data)
  }

  return (
    <div>
      <div className="p-4  flex justify-between items-center">
        <input
          type="search"
          placeholder="Search by name, reason, or reported for"
          className="bg-transparent border text-white px-4 py-2 rounded-full w-3/4"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
        <button className="bg-lime-500 text-[#103B3E] px-4 py-2 rounded-full" onClick = {() => handleSearch()}>
          Search
        </button>
      </div>
      <div className="p-4 mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUsers.map((user, index) => (
          <ReportedUserCard key={index} user={user} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-lime-500 text-black px-4 py-2 rounded-full"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-lime-500 text-black px-4 py-2 rounded-full"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageInvestorsReport;
