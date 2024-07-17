// components/ChatWindow.tsx
import React, { useRef, useState } from "react";
import { Chat, User } from "@/types";
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
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  selectedUser,
  onBack,
  isMobile,
}) => {
  const { theme } = useTheme(); // Use theme from context
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
      console.log("Sending message:", message);
      if (attachedFile) {
        console.log("Document attached:", attachedFile.name);
      }
      // Reset input after sending
      setMessage("");
      setAttachedFile(null);
    }
    // Here you'd typically handle the message sending logic
    setMessage("");
    setAttachedFile(null);
  };

  return (
    <div
      className={`flex flex-col h-full m-2 rounded-md ${
        theme === "dark" ? "bg-[#001F22]" : "bg-gray-200"
      }`}
    >
      <div
        className={`flex items-center p-4 rounded-t rounded-md ${
          theme === "dark" ? "bg-[#06383E]" : "bg-gray-300"
        }`}
      >
        {/* Header: Display the selected user's name */}
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
          <h1 className="text-xl font-bold text-[#248E38] dark:text-white">
            {selectedUser.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedUser.profession}
          </p>
        </div>
      </div>

      <div
        className={`flex-grow flex flex-col ${isMobile ? "w-full" : "w-3/4"} ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {/* Messages will be displayed here */}
        {chat.messages.map((msg, index) => (
          <div key={index} className="p-2">
            {/* Display message content */}
            <p
              key={index}
              className={`rounded p-2 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>

      <div
        className={`p-4 flex ${
          theme === "dark" ? "bg-[#06383E]" : "bg-gray-300"
        }`}
      >
        {/* Footer: TextInput to type a message */}
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
          className={`w-3/4 mr-2 sm:mr-4 sm:py-4 px-4 rounded-full ${
            theme === "dark"
              ? "text-white placeholder:text-white bg-[#0f2e31]"
              : "text-black placeholder:text-black bg-white"
          } focus:outline-none`}
        />
        <button
          onClick={handleAttachDocument}
          className={`py-2 px-2 sm:py-2 sm:px-4 mr-2 sm:mr-4 rounded-full ${
            theme === "dark"
              ? "bg-[#A4E320] text-black"
              : "bg-[#4CAF50] text-white"
          }`}
        >
          <LuPaperclip size={25} color={theme === "dark" ? "black" : "white"} />
        </button>
        <button
          onClick={handleSendMessage}
          className={`py-2 px-2 sm:py-2 sm:px-4 rounded-full ${
            theme === "dark"
              ? "bg-[#A4E320] text-black"
              : "bg-[#4CAF50] text-white"
          }`}
        >
          <FiSend size={25} color={theme === "dark" ? "black" : "white"} />
        </button>
      </div>
    </div>
  );
};
