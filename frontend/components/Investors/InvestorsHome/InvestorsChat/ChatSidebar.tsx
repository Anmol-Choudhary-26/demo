// components/ChatSidebar.tsx
import React, { useState } from "react";
import { User } from "@/types";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext
import Image from "next/image";

interface ChatSidebarProps {
  users: User[];
  onSelectUser: (user: User) => void;
  selectedUserId: string | null;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  users,
  onSelectUser,
  selectedUserId,
}) => {
  console.log("ChatSidebar rendering with users:", users);

  const { theme } = useTheme(); // Use theme from context
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`md:w-1/5 h-screen overflow-y-auto m-2 rounded-md ${
        theme === "dark" ? "bg-[#001F22]" : "bg-gray-200"
      }`}
    >
      <div
        className={`my-4 mx-4 flex justify-center py-1 border rounded-full ${
          theme === "dark" ? "bg-[#003034] hover:border-[#B8FF22]" : "bg-white"
        }`}
      >
        <div className="px-2 relative m-auto flex w-full">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`p-2 text-sm w-full h-10 rounded-full outline-none ${
              theme === "dark"
                ? "text-white bg-[#003034]"
                : "text-black bg-gray-100"
            }`}
          />
        </div>
      </div>
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className={`m-2 rounded-md flex items-center p-4 cursor-pointer ${
            selectedUserId === user.id
              ? "bg-gray-400 dark:bg-[#06383E]"
              : theme === "dark"
              ? "bg-[#00171A] hover:bg-[#06383E]"
              : "bg-white hover:bg-gray-300"
          }`}
          onClick={() => onSelectUser(user)}
        >
          <div className="relative mr-3">
            <Image
              src={user.avatar}
              alt={user.name}
              className="rounded-full h-10 w-10"
            />
            <span
              className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${
                user.status === "online"
                  ? "bg-[#248E38] dark:bg-[#A4E320]"
                  : "bg-gray-400"
              }`}
            ></span>
          </div>
          <div>
            <div
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-medium`}
            >
              {user.name}
            </div>
            <div
              className={`text-sm ${
                user.status === "online"
                  ? "text-[#248E38] dark:text-[#A4E320]"
                  : "text-gray-400"
              }`}
            >
              {user.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
