import PrimaryButton from "@/components/Common/PrimaryButton";
import { setDataToLocalStorage } from "@/utils/functions";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

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

export default function AboutBusinessForm() {
  const [formData, setFormData] = useState<BusinessFinanceFormData>({
    establishedDate: "",
    industry: "",
    address: "",
    name: "",
    numberOfEmployees: 0,
    businessType: "",
    phoneNumber: "",
    state: "",
    district: "",
    Pincode: 0,
  });

  const { theme } = useTheme(); // Use the theme from context
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
    setDataToLocalStorage("businessDetails", JSON.stringify(formData));
    router.push("/auth/business/more-details");
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-lg shadow p-6 ${
          theme === "dark" ? " text-white" : "bg-gray-100 text-black"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center">
            About Business Bio - 1
          </h1>
          <p className="mb-6 text-center text-gray-400">
            Create an account to connect, network and raise funds for your
            startup
          </p>
          <div className="mb-4">
            <label
              htmlFor="establishedDate"
              className="text-[16px] text-gray-800"
            >
              Enter Your Established Date
            </label>
            <input
              type="date"
              id="establishedDate"
              name="establishedDate"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="text-[16px] text-gray-800">
              Select Industries that You Serve
            </label>
            <select
              id="industry"
              name="industry"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            >
              <option>Himachal</option>
              <option>JK</option>
              <option>Himachal</option>
              <option>Himachal</option>
              <option>Himachal</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="text-[16px] text-gray-800">
              Enter your Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="text-[16px] text-gray-800">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="district" className="text-[16px] text-gray-800">
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Pincode" className="text-[16px] text-gray-800">
              Pincode
            </label>
            <input
              type="number"
              id="Pincode"
              name="Pincode"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChangeInt}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="text-[16px] text-gray-800">
              Business Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="numberOfEmployees"
              className="text-[16px] text-gray-800"
            >
              Number of Employees
            </label>
            <input
              type="number"
              id="numberOfEmployees"
              name="numberOfEmployees"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChangeInt}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="businessType" className="text-[16px] text-gray-800">
              Type of Business
            </label>
            <select
              id="businessType"
              name="businessType"
              className={`w-full p-3 ${
                theme === "dark"
                  ? "bg-transparent text-white"
                  : "bg-white text-black"
              } rounded-md border ${
                theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
              } outline-none mt-4 text-[14px] placeholder-gray-800`}
              onChange={handleChange}
            >
              {/* Populate with options */}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="text-[16px] text-gray-800">
              Phone Number of Business
            </label>
            <div className="flex mt-1">
              <span
                className={`inline-flex items-center px-3 rounded-l-md rounded-r-sm border border-r-0 ${
                  theme === "dark"
                    ? "border-[#3B3B3B] bg-transparent text-gray-400"
                    : "border-gray-300 bg-gray-100 text-gray-700"
                } text-[16px] outline-none mt-4`}
              >
                +91
              </span>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className={`w-full p-3 ${
                  theme === "dark"
                    ? "bg-transparent text-white"
                    : "bg-white text-black"
                } rounded-md border ${
                  theme === "dark" ? "border-[#3B3B3B]" : "border-gray-300"
                } outline-none mt-4 text-[14px] placeholder-gray-800`}
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
