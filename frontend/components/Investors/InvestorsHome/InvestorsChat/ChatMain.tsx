import React, { useEffect, useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { User, Chat } from "@/types";
import { useTheme } from "@/context/ThemeContext";

// Dummy data for users
const users: User[] = [
  {
    id: "1",
    name: "Arlene McCoy",
    profession: "Product Designer",
    status: "online",
    avatar: "/avatar.svg",
  },
  {
    id: "2",
    name: "Floyd Miles",
    profession: "Product Manager",
    status: "offline",
    avatar: "/avatar.svg",
  },
  {
    id: "3",
    name: "Lara Croft",
    profession: "Archaeologist",
    status: "online",
    avatar: "/avatar.svg",
  },
  {
    id: "4",
    name: "John Doe",
    profession: "Software Engineer",
    status: "offline",
    avatar: "/avatar.svg",
  },
  {
    id: "5",
    name: "Jane Smith",
    profession: "Data Scientist",
    status: "online",
    avatar: "/avatar.svg",
  },
];

// Mock function to simulate fetching chat data for a user
const fetchChatDataForUser = (user: User): Chat => {
  return {
    users: [user],
    messages: [],
  };
};

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chat, setChat] = useState<Chat>({ users: [], messages: [] });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBackToUsers = () => {
    setSelectedUser(null);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    const chatData = fetchChatDataForUser(user);
    setChat(chatData);
    setSelectedUser(user);
  };

  return (
    <div
      className={`flex h-screen mb-2 ${
        theme === "dark" ? "bg-[#00171A]" : "bg-white"
      }`}
    >
      {!selectedUser || !isMobile ? (
        <ChatSidebar
          users={users}
          onSelectUser={handleSelectUser}
          selectedUserId={selectedUser?.id || null}
        />
      ) : null}
      <div className="flex-grow">
        {selectedUser ? (
          <ChatWindow
            chat={{ users: [selectedUser], messages: [] }}
            selectedUser={selectedUser}
            onBack={handleBackToUsers}
            isMobile={isMobile}
          />
        ) : (
          <div className="hidden sm:block h-full text-center">
            <p className={theme === "dark" ? "text-white" : "text-black"}>
              Select a user to start a chat
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
