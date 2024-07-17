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
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`md:w-1/5 h-screen overflow-y-auto m-2 rounded-md ${
        theme === "dark" ? "bg-[#001F22]" : "bg-[#ffffff]"
      }`}
    >
      <div className="my-4 mx-4 flex justify-center py-1 border rounded-full bg-[#cccccc] dark:bg-[#003034] hover:border-[#B8FF22]">
        <div className="px-2 relative m-auto flex w-full">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-white text-sm w-full bg-[#f6f5f5] dark:bg-[#003034] h-10 rounded-full outline-none"
          />
        </div>
      </div>
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className={`m-2 rounded-md flex items-center p-4 cursor-pointer hover:bg-[#E8E5E5] ${
            selectedUserId === user.id
              ? "bg-[#C1FFCD]"
              : theme === "dark"
              ? "bg-[#182e31]"
              : "bg-[#f6f5f5]"
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
              className={`font-medium ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
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
