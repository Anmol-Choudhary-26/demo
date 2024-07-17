import React from "react";
import { useRouter } from "next/router";
import { updateuser2 } from "@/hooks/useUserlogin";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

export default function SelectRoleForm() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // Use the theme from the context

  const navigateToForm = async (role: string) => {
    const data = await updateuser2(role.toUpperCase());
    console.log(data);
    if (role === "investor") {
      router.push(`/auth/${role}/documents`);
    } else if (role === "business") {
      router.push(`/auth/${role}/about`);
    } else if (role === "franchise") {
      router.push(`/auth/${role}/about`);
    } else {
      router.push(`/auth/${role}/more-details`);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 text-center ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Select your Role for Further Steps
      </h1>
      <p className="text-[16px] mb-4 tracking-wider text-center text-gray-400">
        Create an account to connect, network and raise funds for your startup
      </p>
      <p className="py-4">[ You are a ]</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md md:max-w-lg text-[#C4C4C4]">
        <button
          onClick={() => navigateToForm("investor")}
          className={`role_button ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } text-${theme === "dark" ? "white" : "black"} hover:bg-${
            theme === "dark" ? "gray-700" : "gray-300"
          }`}
        >
          Investor
        </button>
        <button
          onClick={() => navigateToForm("business")}
          className={`role_button ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } text-${theme === "dark" ? "white" : "black"} hover:bg-${
            theme === "dark" ? "gray-700" : "gray-300"
          }`}
        >
          Businesses
        </button>
        <button
          onClick={() => navigateToForm("franchise")}
          className={`role_button ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } text-${theme === "dark" ? "white" : "black"} hover:bg-${
            theme === "dark" ? "gray-700" : "gray-300"
          }`}
        >
          Franchises
        </button>
        <button
          onClick={() => navigateToForm("ideation")}
          className={`role_button ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } text-${theme === "dark" ? "white" : "black"} hover:bg-${
            theme === "dark" ? "gray-700" : "gray-300"
          }`}
        >
          Ideation
        </button>
      </div>
    </div>
  );
}
