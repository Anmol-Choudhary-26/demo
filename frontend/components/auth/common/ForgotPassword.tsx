import { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from the context

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Forgot password logic here
    console.log(email);
    // Optionally navigate to a different page, such as a password reset confirmation page
    router.push("/auth/reset-password");
  };

  const handleResend = () => {
    // Resend password logic here
    console.log("Resend password logic triggered");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Forgot Password ?</h1>
      <p className="mb-8 text-center text-gray-400">
        Don&apos;t worry! It happens. Please enter the email associated with
        your account.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-md border outline-none text-[16px] mt-2 ${
              theme === "dark"
                ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                : "bg-white text-black border-gray-300 placeholder-gray-500"
            }`}
            required
          />
        </div>
        <div className="flex mt-6">
          <PrimaryButton
            type="submit"
            title="Reset Password"
            backgroundStyle={`w-full capitalize text-[15px] mb-2 ${
              theme === "dark"
                ? "bg-[#A4E320] text-[#00171A]"
                : "bg-[#248E38] text-white"
            }`}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          If you don&apos;t receive a code !!
          <button
            type="button"
            onClick={handleResend}
            className="text-[#248E38] dark:text-[#A4E320] hover:underline ml-2"
          >
            Resend
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
