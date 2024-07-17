import React, { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme(); // Use the theme from the context

  const handlePasswordReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your password reset logic here
    if (password === confirmPassword) {
      // Proceed with the password update
      console.log("Password reset successfully");
      // Navigate to the login or other appropriate page
      router.push("/auth/signin");
    } else {
      // Handle error, passwords do not match
      alert("Check the password again, password does not match");
      console.error("Passwords do not match");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
      <p className="mb-6 text-gray-400">
        Please Type something you will remember
      </p>
      <form onSubmit={handlePasswordReset} className="w-full max-w-md">
        <div className="mb-4">
          New Password
          <input
            type="password"
            placeholder="Must Be 8 Characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-md border outline-none text-[16px] mt-2 ${
              theme === "dark"
                ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                : "bg-white text-black border-gray-300 placeholder-gray-600"
            }`}
            required
            minLength={8}
          />
        </div>
        <div className="mb-6">
          Confirm Password
          <input
            type="password"
            placeholder="Must Be 8 Characters"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-3 rounded-md border outline-none text-[16px] mt-2 ${
              theme === "dark"
                ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                : "bg-white text-black border-gray-300 placeholder-gray-600"
            }`}
            required
            minLength={8}
          />
        </div>
        <div className="flex mt-6">
          <PrimaryButton
            type="submit"
            title="Sign In Again"
            backgroundStyle={`w-full capitalize text-[15px] mb-2 ${
              theme === "dark"
                ? "bg-[#A4E320] text-[#00171A]"
                : "bg-[#248E38] text-white"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
