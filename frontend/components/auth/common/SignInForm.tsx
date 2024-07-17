import { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { SingIn } from "../../../hooks/useLogin";
import { setDataToLocalStorage } from "@/utils/functions";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext
import Link from "next/link";

export default function SignInForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const userRole = false;
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from the context

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Sign in logic here
    // console.log({ emailOrPhone, password, rememberMe });
    const data = await SingIn(emailOrPhone, password);

    console.log(data.data);
    setDataToLocalStorage("userID", data.data.DBuser.id);
    setDataToLocalStorage("access_token0", data.data.token);

    // Navigate to user's home page or dashboard after sign in

    if (userRole) {
      router.push("/auth/select-role");
    } else {
      router.push("/Investors/homepage");
    }

    router.push("/auth/personal-details");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <p
        className={`mb-8 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Create an account to connect, network and raise funds for your startup
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          Your Email or Phone No
          <input
            type="text"
            placeholder="Enter your name here"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className={`w-full p-3 rounded-md border outline-none text-[16px] mt-2 placeholder-gray-800 ${
              theme === "dark"
                ? "bg-[#00171A] text-white border-[#3B3B3B]"
                : "bg-gray-200 text-black border-gray-400"
            }`}
          />
        </div>
        <div className="mb-4">
          Enter Your Password
          <input
            type="password"
            placeholder="Enter Your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-md border outline-none text-[16px] mt-2 placeholder-gray-800 ${
              theme === "dark"
                ? "bg-[#00171A] text-white border-[#3B3B3B]"
                : "bg-gray-200 text-black border-gray-400"
            }`}
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span className="ml-2 text-sm">Remember me</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-[#248E38] dark:text-[#A4E320] hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="flex mt-6">
          <PrimaryButton
            type="submit"
            title="Sign In"
            backgroundStyle={`w-full capitalize text-[15px] ${
              theme === "dark"
                ? "bg-[#A4E320] text-[#00171A]"
                : "bg-[#248E38] text-white"
            }`}
          />
        </div>
      </form>
    </div>
  );
}
