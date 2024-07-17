import React, { ChangeEvent, useState } from "react";
import AdminCard from "./AdminCard";

const initialAdminData = [
  {
    id: 1,
    name: "Mithun Gupta",
    about:
      "Good and profitable venture from Healthcare and medicine sector. Serial entrepreneur with a good foothold in Healthcare sector businesses",
    phoneNo: "6000909854",
    email: "Mithunnew24@gmail.com",
  },
  {
    id: 2,
    name: "Amit Kumar",
    about:
      "Experienced IT professional with a strong background in software development.",
    phoneNo: "6000909855",
    email: "amit.kumar@example.com",
  },
  {
    id: 3,
    name: "Ravi Singh",
    about: "Seasoned marketer with a knack for innovative strategies.",
    phoneNo: "6000909856",
    email: "ravi.singh@example.com",
  },
  {
    id: 4,
    name: "Sanjay Patel",
    about: "Expert in logistics and supply chain management.",
    phoneNo: "6000909857",
    email: "sanjay.patel@example.com",
  },
  {
    id: 5,
    name: "Neha Verma",
    about: "HR specialist with extensive experience in talent acquisition.",
    phoneNo: "6000909858",
    email: "neha.verma@example.com",
  },
  {
    id: 6,
    name: "Pooja Sharma",
    about:
      "Finance professional with a focus on corporate finance and investment.",
    phoneNo: "6000909859",
    email: "pooja.sharma@example.com",
  },
  {
    id: 7,
    name: "Rahul Mehta",
    about: "Entrepreneur with successful ventures in e-commerce and retail.",
    phoneNo: "6000909860",
    email: "rahul.mehta@example.com",
  },
  {
    id: 8,
    name: "Anjali Nair",
    about: "Legal advisor with a deep understanding of corporate law.",
    phoneNo: "6000909861",
    email: "anjali.nair@example.com",
  },
  {
    id: 9,
    name: "Vikram Reddy",
    about:
      "Operations manager with a focus on efficiency and process improvement.",
    phoneNo: "6000909862",
    email: "vikram.reddy@example.com",
  },
  {
    id: 10,
    name: "Suresh Bhatia",
    about: "Consultant with expertise in business strategy and growth.",
    phoneNo: "6000909863",
    email: "suresh.bhatia@example.com",
  },
  {
    id: 11,
    name: "Divya Kapoor",
    about: "Marketing guru with a focus on digital marketing strategies.",
    phoneNo: "6000909864",
    email: "divya.kapoor@example.com",
  },
  {
    id: 12,
    name: "Karan Johar",
    about: "Product manager with a knack for innovative product development.",
    phoneNo: "6000909865",
    email: "karan.johar@example.com",
  },
  {
    id: 13,
    name: "Priya Menon",
    about:
      "Customer service expert with a passion for enhancing user experience.",
    phoneNo: "6000909866",
    email: "priya.menon@example.com",
  },
  {
    id: 14,
    name: "Arjun Das",
    about: "Tech enthusiast with a background in software engineering.",
    phoneNo: "6000909867",
    email: "arjun.das@example.com",
  },
  {
    id: 15,
    name: "Swati Agarwal",
    about: "Sales leader with a track record of exceeding targets.",
    phoneNo: "6000909868",
    email: "swati.agarwal@example.com",
  },
];

const itemsPerPage = 12;

interface EditAdminProps {
  mode: "edit" | "delete" | "none";
}

const EditAdmin: React.FC<EditAdminProps> = ({ mode }) => {
  const [adminData, setAdminData] = useState(initialAdminData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = adminData.filter((user) =>
    [user.name, user.about, user.phoneNo, user.email].some((field) =>
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSave = (
    id: number,
    name: string,
    about: string,
    phoneNo: string,
    email: string
  ) => {
    const updatedData = adminData.map((user) =>
      user.id === id ? { ...user, name, about, phoneNo, email } : user
    );
    setAdminData(updatedData);
  };

  return (
    <div className="min-h-screen">
      <div className="py-4 flex justify-between items-center">
        <input
          type="search"
          placeholder="Search by name, about, phone, or email"
          className="bg-transparent border text-white px-4 py-2 rounded-full w-3/4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="bg-[#A4E320] text-[#103B3E] px-4 py-2 ml-2 rounded-full">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUsers.map((user) => (
          <AdminCard key={user.id} {...user} mode={mode} onSave={handleSave} />
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

export default EditAdmin;
