import React, { useState } from "react";
import ReportedUserCard from "./ReportedUserCard";

const users = [
 {
  id: "123",
  businessName: "anmol",
  profileImage: "images",
  reason: "reason",
  reporterName: "Kartik"
 }
];

const itemsPerPage = 12;

const ManageFranchiseReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    [user.businessName, user.reason, user.reporterName].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="py-4 flex justify-between items-center">
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
        <button className="bg-[#A4E320] text-[#103B3E] px-4 py-2 ml-2 rounded-full">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUsers.map((user) => (
          <ReportedUserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-[#A4E320] text-black px-4 py-2 rounded-full"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-[#A4E320] text-black px-4 py-2 rounded-full"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageFranchiseReport;
