import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { setDataToLocalStorage } from "@/utils/functions";
import { useTheme } from "@/context/ThemeContext";

interface BusinessFinanceFormData {
  currentLoans: string;
  shareholders: string;
  monthlySales: string;
  reportedSales: number;
  profitMargin: number;
  assets: string;
  physicalAssets: number;
  investorPreference: string;
}

export default function BusinessFinanceForm() {
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from context
  const [formData, setFormData] = useState<BusinessFinanceFormData>({
    currentLoans: "",
    shareholders: "",
    monthlySales: "",
    reportedSales: 0,
    profitMargin: 0,
    assets: "",
    physicalAssets: 0,
    investorPreference: "single",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeInt = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value) || 0, // Convert to integer, fallback to 0 if conversion fails
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, such as sending data to an API
    console.log(formData);
    setDataToLocalStorage("businessDetails3", JSON.stringify(formData));
    router.push("/auth/business/documents"); // Navigate to the next page after submission
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg p-6 rounded-lg shadow ${
          theme === "dark" ? "" : "bg-gray-100"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center mb-2">
          Your Business Finance Details
        </h2>
        <p className="my-2 text-sm text-gray-400 text-center">
          Create an account to connect, network and raise funds for your startup
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 text-[14px] sm:text-[16px]">
            <label htmlFor="currentLoans">
              Current Loans/Debts
              <input
                type="number"
                required
                name="currentLoans"
                placeholder="Write in INR"
                value={formData.currentLoans}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 mb-2 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                    : "bg-white text-black border-gray-300 placeholder-gray-400"
                }`}
              />
            </label>
            <label htmlFor="shareholders">
              Total Number of Shareholders ( With Percentage they Own)
              <textarea
                name="shareholders"
                required
                placeholder="Write a brief about your product or Services"
                value={formData.shareholders}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                    : "bg-white text-black border-gray-300 placeholder-gray-400"
                }`}
              />
            </label>
            <label htmlFor="monthlySales">
              Current Monthly Sales
              <input
                type="text"
                required
                name="monthlySales"
                placeholder="Write it in INR"
                value={formData.monthlySales}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                    : "bg-white text-black border-gray-300 placeholder-gray-400"
                }`}
              />
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label htmlFor="reportedSales" className="flex flex-col">
                Latest Reported Sales
                <input
                  type="number"
                  name="reportedSales"
                  required
                  placeholder="Write in INR"
                  value={formData.reportedSales}
                  onChange={handleChangeInt}
                  className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                      : "bg-white text-black border-gray-300 placeholder-gray-400"
                  }`}
                />
              </label>
              <label htmlFor="profitMargin" className="flex flex-col mb-2">
                Operating Profit Margin
                <input
                  type="number"
                  name="profitMargin"
                  required
                  placeholder="Percentage"
                  value={formData.profitMargin}
                  onChange={handleChangeInt}
                  className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                      : "bg-white text-black border-gray-300 placeholder-gray-400"
                  }`}
                />
              </label>
            </div>
            <label htmlFor="assets">
              Tangible and Intangible Asset
              <textarea
                name="assets"
                placeholder="Write a brief about your product or Services"
                required
                value={formData.assets}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                    : "bg-white text-black border-gray-300 placeholder-gray-400"
                }`}
              />
            </label>
            <label htmlFor="physicalAssets">
              Value of Physical Asset
              <input
                type="number"
                required
                name="physicalAssets"
                placeholder="Write it in INR"
                value={formData.physicalAssets}
                onChange={handleChangeInt}
                className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B] placeholder-gray-800"
                    : "bg-white text-black border-gray-300 placeholder-gray-400"
                }`}
              />
            </label>
            <div className="flex items-center gap-4">
              Investor Preference
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  required
                  name="investorPreference"
                  value="single"
                  checked={formData.investorPreference === "single"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-green-600"
                />
                <span className="ml-2">Single</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  required
                  name="investorPreference"
                  value="multiple"
                  checked={formData.investorPreference === "multiple"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">Multiple</span>
              </label>
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
