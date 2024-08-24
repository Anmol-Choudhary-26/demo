import PrimaryButton from "@/components/Common/PrimaryButton";
import { useRouter } from "next/router";
import { useState } from "react";
import { SignUp } from "../../../hooks/useSignup";
import { createUser } from "../../../hooks/useUserlogin";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

export default function SignUpForm() {
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from the context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Store the phone number in the session storage and fetch that phoneNumber in OTPForm
    sessionStorage.setItem("phoneNumber", formData.phone);
    localStorage.setItem("email", formData.email)

    // Process form submission here
    const data = await SignUp(formData)
    console.log(data);
    router.push("/auth/signin");
  };

  return (
    <section
      className={`flex flex-wrap justify-center items-center w-full min-h-screen p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-lg ${
          theme === "dark" ? "bg-[#001F22] bg-opacity-40" : "bg-gray-100"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center">
          Create an Account
        </h2>
        <p
          className={`text-sm mt-3 text-center tracking-wider ${
            theme === "dark" ? "text-gray-200" : "text-gray-600"
          }`}
        >
          Create an account to connect, network and raise funds for your startup
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            Your Name
            <input
              type="text"
              name="name"
              required
              placeholder="Add Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`p-3 rounded border focus:ring-2 focus:outline-none ${
                theme === "dark"
                  ? "bg-[#00171A] text-white placeholder-gray-400 border-gray-800 focus:ring-[#A4E320]"
                  : "bg-gray-200 text-black placeholder-gray-600 border-gray-400 focus:ring-gray-800"
              }`}
            />
          </label>
          <label className="flex flex-col gap-2">
            Your Phone No
            <div className="flex">
              <span
                className={`inline-flex items-center px-3 rounded-l ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-gray-800"
                    : "bg-gray-200 text-black border-gray-400"
                }`}
              >
                +91 |
              </span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`p-3 rounded-r border focus:ring-2 focus:outline-none flex-1 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white placeholder-gray-400 border-gray-800 focus:ring-[#A4E320]"
                    : "bg-gray-200 text-black placeholder-gray-600 border-gray-400 focus:ring-gray-800"
                }`}
              />
            </div>
          </label>

          <label className="flex flex-col gap-2">
            Your Email
            <input
              type="email"
              name="email"
              required
              placeholder="Add Email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 rounded border focus:ring-2 focus:outline-none ${
                theme === "dark"
                  ? "bg-[#00171A] text-white placeholder-gray-400 border-gray-800 focus:ring-[#A4E320]"
                  : "bg-gray-200 text-black placeholder-gray-600 border-gray-400 focus:ring-gray-800"
              }`}
            />
          </label>

          <label htmlFor="password" className="flex flex-col gap-2">
            Create a Password
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`p-3 rounded border focus:ring-2 focus:outline-none ${
                theme === "dark"
                  ? "bg-[#00171A] text-white placeholder-gray-400 border-gray-800 focus:ring-[#A4E320]"
                  : "bg-gray-200 text-black placeholder-gray-600 border-gray-400 focus:ring-gray-800"
              }`}
            />
          </label>
          {/* Submit Button */}
          <div className="flex flex-row gap-4 justify-end">
            <PrimaryButton
              type="submit"
              title="Next"
              backgroundStyle={`capitalize text-[15px] ${
                theme === "dark"
                  ? "bg-[#A4E320] text-[#00171A]"
                  : "bg-[#248E38] text-white"
              }`}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
