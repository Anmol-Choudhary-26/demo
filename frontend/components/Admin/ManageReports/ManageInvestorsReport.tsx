import React, { useState } from "react";
import ReportedUserCard from "./ReportedUserCard";

const users = [
  {
    id: "1",
    name: "Anand Sharma",
    profileImage: "/avatar.svg",
    reason:
      "Violated terms of service by misusing the platform for personal gains. Known for aggressive marketing tactics.",
    reportedFor: "Rahul Kumar",
    userType: "Investor", // Added userType
  },
  {
    id: "2",
    name: "Deepa Mehta",
    profileImage: "/avatar.svg",
    reason: "Involved in unethical business practices.",
    reportedFor: "Sneha Verma",
    userType: "Investor", // Added userType
  },
  {
    id: "3",
    name: "Nisha Singh",
    profileImage: "/avatar.svg",
    reason: "Sharing false and misleading information.",
    reportedFor: "Arjun Kapoor",
    userType: "Investor", // Added userType
  },
  {
    id: "4",
    name: "Ravi Patel",
    profileImage: "/avatar.svg",
    reason: "Repeatedly violating community guidelines.",
    reportedFor: "Neha Gupta",
    userType: "Investor", // Added userType
  },
  {
    id: "5",
    name: "Priya Desai",
    profileImage: "/avatar.svg",
    reason: "Using offensive and inappropriate language.",
    reportedFor: "Manish Jain",
    userType: "Investor", // Added userType
  },
  {
    id: "6",
    name: "Karan Malhotra",
    profileImage: "/avatar.svg",
    reason: "Creating fake profiles and misleading users.",
    reportedFor: "Sana Khan",
    userType: "Investor", // Added userType
  },
  {
    id: "7",
    name: "Meera Sethi",
    profileImage: "/avatar.svg",
    reason: "Engaging in fraudulent activities and scams.",
    reportedFor: "Rohit Sharma",
    userType: "Investor", // Added userType
  },
  {
    id: "8",
    name: "Aman Kapoor",
    profileImage: "/avatar.svg",
    reason: "Harassing other users and causing discomfort.",
    reportedFor: "Vikas Yadav",
    userType: "Investor", // Added userType
  },
  {
    id: "9",
    name: "Rajesh Thakur",
    profileImage: "/avatar.svg",
    reason: "Disseminating false news and information.",
    reportedFor: "Nandini Reddy",
    userType: "Investor", // Added userType
  },
  {
    id: "10",
    name: "Sunita Rao",
    profileImage: "/avatar.svg",
    reason: "Posting inappropriate and explicit content.",
    reportedFor: "Aditya Sharma",
    userType: "Investor", // Added userType
  },
  {
    id: "11",
    name: "Vijay Singh",
    profileImage: "/avatar.svg",
    reason: "Engaging in spamming activities.",
    reportedFor: "Simran Kaur",
    userType: "Investor", // Added userType
  },
  {
    id: "12",
    name: "Rohit Verma",
    profileImage: "/avatar.svg",
    reason: "Creating fake accounts to deceive users.",
    reportedFor: "Alok Reddy",
    userType: "Investor", // Added userType
  },
  {
    id: "13",
    name: "Kavita Sharma",
    profileImage: "/avatar.svg",
    reason: "Operating multiple accounts to manipulate the platform.",
    reportedFor: "Anjali Patel",
    userType: "Investor", // Added userType
  },
  {
    id: "14",
    name: "Sandeep Singh",
    profileImage: "/avatar.svg",
    reason: "Using hate speech and promoting violence.",
    reportedFor: "Prerna Arora",
    userType: "Investor", // Added userType
  },
  {
    id: "15",
    name: "Lalita Gupta",
    profileImage: "/avatar.svg",
    reason: "Sharing explicit and offensive content.",
    reportedFor: "Amit Rao",
    userType: "Investor", // Added userType
  },
];

const itemsPerPage = 12;

const ManageInvestorsReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    [user.name, user.reason, user.reportedFor].some((field) =>
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

export default ManageInvestorsReport;
