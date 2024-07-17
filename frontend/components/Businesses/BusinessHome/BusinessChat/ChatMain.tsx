// pages/index.tsx
import React, { useEffect, useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { User, Chat, Message } from "@/types";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

// Dummy data for users
const users: User[] = [
  {
    id: "1",
    name: "Jonas Archalie",
    profession: "Product Designer",
    status: "online",
    avatar: "/avatar.svg",
  },
  {
    id: "2",
    name: "Samson Kirike",
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
  const { theme } = useTheme();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chat, setChat] = useState<Chat>({ users: [], messages: [] });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSendMessage = (newMessage: Message) => {
    const updatedChat = { ...chat, messages: [...chat.messages, newMessage] };
    setChat(updatedChat); // Update the chat state
    console.log("Chat after sending message:", updatedChat); // Debugging log
    simulateReply(newMessage); // Trigger a reply
  };

  const simulateReply = (sentMessage: Message) => {
    setTimeout(() => {
      const replyContent =
        sentMessage.content.toLowerCase() === "hello"
          ? "Hello there!"
          : "Random reply to: " + sentMessage.content;
      const reply: Message = {
        content: replyContent,
        fromUser: "other",
        timestamp: new Date(),
        id: Math.random().toString(),
        senderId: selectedUser?.id || "other",
        text: replyContent,
      };
      const updatedChat = { ...chat, messages: [...chat.messages, reply] };
      setChat(updatedChat); // Update the chat state
      console.log("Chat after receiving reply:", updatedChat); // Debugging log
    }, 1000);
  };

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
    console.log("Chat data fetched for user:", chatData);
  };

  return (
    <div
      className={`flex h-screen mb-2 ${
        theme === "dark" ? "bg-[#00171A]" : "bg-[#f0f0f0]"
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
            chat={chat}
            selectedUser={selectedUser}
            onBack={handleBackToUsers}
            isMobile={isMobile}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div
            className={`hidden sm:block h-full text-center ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Select a user to start a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
