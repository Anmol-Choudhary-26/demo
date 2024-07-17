// components/ChatWindow.tsx
import React, { useRef, useState } from "react";
import { Chat, User, Message } from "@/types";
import { PiArrowLeftThin } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { LuPaperclip } from "react-icons/lu";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext
import Image from "next/image";

interface ChatWindowProps {
  chat: Chat;
  selectedUser: User;
  onBack: () => void; // Function to handle going back to the user list
  isMobile: boolean; // To adjust layout based on screen size
  onSendMessage: (message: Message) => void; // Function to handle sending a message
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  selectedUser,
  onBack,
  isMobile,
  onSendMessage,
}) => {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleAttachDocument = () => {
    fileInputRef.current?.click(); // Trigger the file input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachedFile(event.target.files[0]); // Set the selected file
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || attachedFile) {
      const newMessage: Message = {
        content: message.trim(),
        fromUser: "current",
        timestamp: new Date(),
        id: Math.random().toString(),
        senderId: "current",
        text: message.trim(),
      };
      onSendMessage(newMessage);
      // Reset input after sending
      setMessage("");
      setAttachedFile(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full m-2 rounded-md ${
        theme === "dark" ? "bg-[#001F22]" : "bg-[#ffffff]"
      }`}
    >
      <div
        className={`flex items-center p-4 rounded-t rounded-md ${
          theme === "dark" ? "bg-[#06383E]" : "bg-[#e0e0e0]"
        }`}
      >
        {isMobile && (
          <button onClick={onBack} className="text-white">
            <PiArrowLeftThin className="mr-4" size={25} color="white" />
          </button>
        )}
        <Image
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="rounded-full h-10 w-10"
        />
        <div className="mx-4">
          <h1
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-[#248E38]"
            }`}
          >
            {selectedUser.name}
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {selectedUser.profession}
          </p>
        </div>
      </div>

      <div
        className={`flex-grow flex flex-col ${isMobile ? "w-full" : "w-3/4"}`}
      >
        {chat.messages.map((msg, index) => (
          <div key={index} className="p-2">
            <p
              className={`${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              } rounded p-2`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`p-4 flex ${
          theme === "dark" ? "bg-[#06383E]" : "bg-[#e0e0e0]"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message here..."
          className={`w-3/4 mr-2 sm:mr-4 sm:py-4 px-4 rounded-full text-[#00171A] dark:text-white placeholder:text-white ${
            theme === "dark"
              ? "bg-[#0f2e31] focus:outline-none"
              : "bg-[#f0f0f0] text-black placeholder:text-gray-600"
          }`}
        />
        <button
          onClick={handleAttachDocument}
          className={`py-2 px-2 sm:py-2 sm:px-4 mr-2 sm:mr-4 text-white rounded-full ${
            theme === "dark" ? "bg-[#A4E320]" : "bg-[#248E38]"
          }`}
        >
          <LuPaperclip size={25} color="black" />
        </button>
        <button
          onClick={handleSendMessage}
          className={`py-2 px-2 sm:py-2 sm:px-4 text-[#00171A] dark:text-white rounded-full ${
            theme === "dark" ? "bg-[#A4E320]" : "bg-[#248E38]"
          }`}
        >
          <FiSend size={25} color="black" />
        </button>
      </div>
    </div>
  );
};
