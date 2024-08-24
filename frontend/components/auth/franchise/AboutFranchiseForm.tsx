import PrimaryButton from "@/components/Common/PrimaryButton";
import { setDataToLocalStorage } from "@/utils/functions";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext"; // Import ThemeContext

interface BusinessFinanceFormData {
  establishedDate: string;
  industry: string;
  address: string;
  name: string;
  numberOfEmployees: number;
  businessType: string;
  phoneNumber: string;
  state: string;
  district: string;
  Pincode: number;
}

export default function AboutFranchiseForm() {
  const { theme } = useTheme(); // Use the theme from context
  const [formData, setFormData] = useState<BusinessFinanceFormData>({
    establishedDate: "",
    industry: "",
    address: "",
    numberOfEmployees: 0,
    businessType: "",
    phoneNumber: "",
    state: "",
    district: "",
    Pincode: 0,
    name: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeInt = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value) || "", // Convert to integer, fallback to empty string if conversion fails
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement the submission logic
    console.log(formData);
    // Navigate to the next page
    setDataToLocalStorage("FranchiseDetails", JSON.stringify(formData));
    router.push("/auth/franchise/more-details");
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-lg shadow p-6 ${
          theme === "dark" ? "bg-[#00171A]" : "bg-white"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center">
            About Franchise Bio - 1
          </h1>
          <p className="mb-6 text-center text-gray-400">
            Create an account to connect , network and raise funds for your
            startup
          </p>
          <div className="mb-4">
            <label
              htmlFor="establishedDate"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Enter Your Established Date
            </label>
            <input
              type="date"
              required
              id="establishedDate"
              name="establishedDate"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="industry"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Select Industries that You Serve
            </label>
            <select
              id="industry"
              required
              name="industry"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            >
              {/* Populate with options */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Enter your Address
            </label>
            <input
              type="text"
              required
              id="address"
              name="address"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              State
            </label>
            <input
              type="text"
              required
              id="state"
              name="state"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="district"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              District
            </label>
            <input
              type="text"
              required
              id="district"
              name="district"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Pincode"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Pincode
            </label>
            <input
              type="number"
              required
              id="Pincode"
              name="Pincode"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChangeInt}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Franchise Name
            </label>
            <input
              type="text"
              required
              id="name"
              name="name"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="numberOfEmployees"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Number of Employees
            </label>
            <input
              type="number"
              required
              id="numberOfEmployees"
              name="numberOfEmployees"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChangeInt}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessType"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Type of Business
            </label>
            <select
              id="businessType"
              required
              name="businessType"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              } rounded-md border outline-none mt-4 text-[14px]`}
              onChange={handleChange}
            >
              {/* Populate with options */}
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className={`text-[16px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Phone Number of Franchise
            </label>
            <div className="flex mt-1">
              <span
                className={`inline-flex items-center px-3 rounded-l-md rounded-r-sm border border-r-0 ${
                  theme === "dark"
                    ? "border-[#3B3B3B] bg-[#00171A] text-gray-400 placeholder-gray-800"
                    : "border-gray-300 bg-white text-gray-500 placeholder-gray-500"
                } text-[16px] outline-none mt-4`}
              >
                +91
              </span>
              <input
                type="tel"
                required
                id="phoneNumber"
                name="phoneNumber"
                className={`w-full p-3 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                } rounded-md border outline-none mt-4 text-[14px]`}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
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
    </div>
  );
}
