import React, { useState } from "react";
import ReportedUserCard from "./ReportedUserCard";

const users = [
  {
    id: "1",
    name: "Mithun Gupta",
    profileImage: "/avatar.svg",
    reason:
      "Good and profitable venture from Healthcare and medicine sector. Serial entrepreneur with a good foothold in Healthcare sector businesses",
    reportedFor: "Nobo Gupta",
    userType: "busniess",
  },
  {
    id: "2",
    name: "John Doe",
    profileImage: "/avatar.svg",
    reason: "Involved in fraudulent activities.",
    reportedFor: "Jane Smith",
    userType: "busniess",
  },
  {
    id: "3",
    name: "Alice Johnson",
    profileImage: "/avatar.svg",
    reason: "Spreading misinformation on the platform.",
    reportedFor: "Clark Kent",
    userType: "busniess",
  },
  {
    id: "4",
    name: "Bob Brown",
    profileImage: "/avatar.svg",
    reason: "Violating community guidelines.",
    reportedFor: "Lois Lane",
    userType: "busniess",
  },
  {
    id: "5",
    name: "Charlie White",
    profileImage: "/avatar.svg",
    reason: "Using offensive language.",
    reportedFor: "Bruce Wayne",
    userType: "busniess",
  },
  {
    id: "6",
    name: "David Green",
    profileImage: "/avatar.svg",
    reason: "Impersonation of another user.",
    reportedFor: "Oliver Queen",
    userType: "busniess",
  },
  {
    id: "7",
    name: "Eva Black",
    profileImage: "/avatar.svg",
    reason: "Scamming users.",
    reportedFor: "Barry Allen",
    userType: "busniess",
  },
  {
    id: "8",
    name: "Frank Gray",
    profileImage: "/avatar.svg",
    reason: "Harassment and bullying.",
    reportedFor: "Hal Jordan",
    userType: "busniess",
  },
  {
    id: "9",
    name: "Grace Blue",
    profileImage: "/avatar.svg",
    reason: "Spreading false news.",
    reportedFor: "Kara Danvers",
    userType: "busniess",
  },
  {
    id: "10",
    name: "Hank Brown",
    profileImage: "/avatar.svg",
    reason: "Inappropriate content.",
    reportedFor: "Carter Hall",
    userType: "busniess",
  },
  {
    id: "11",
    name: "Ivy Green",
    profileImage: "/avatar.svg",
    reason: "Spam activities.",
    reportedFor: "Diana Prince",
    userType: "busniess",
  },
  {
    id: "12",
    name: "Jack White",
    profileImage: "/avatar.svg",
    reason: "Fake profile.",
    reportedFor: "Arthur Curry",
    userType: "busniess",
  },
  {
    id: "13",
    name: "Karen Black",
    profileImage: "/avatar.svg",
    reason: "Multiple account usage.",
    reportedFor: "Victor Stone",
    userType: "busniess",
  },
  {
    id: "14",
    name: "Larry Gray",
    profileImage: "/avatar.svg",
    reason: "Hate speech.",
    reportedFor: "Bruce Banner",
    userType: "busniess",
  },
  {
    id: "15",
    name: "Mona White",
    profileImage: "/avatar.svg",
    reason: "Sharing explicit content.",
    reportedFor: "Natasha Romanoff",
    userType: "busniess",
  },
];

const itemsPerPage = 12;

const ManageBusinessesReport = () => {
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

export default ManageBusinessesReport;
