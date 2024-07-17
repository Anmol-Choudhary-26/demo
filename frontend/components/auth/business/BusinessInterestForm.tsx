import MultiRangeSlider from "@/components/Common/MultiRangeSlider";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { createBusiness } from "../../../hooks/useBusiness";
import { useTheme } from "@/context/ThemeContext"; // Import ThemeContext
import { getDataFromLocalStorage } from "@/utils/functions";

export default function BusinessInterestForm() {
  const { theme } = useTheme(); // Use the theme from context
  const [industry, setIndustry] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  const [minInvestment, setMinInvestment] = useState<number>(0);
  const [maxInvestment, setMaxInvestment] = useState<number>(200000);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinInvestment(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxInvestment(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form submission logic here
    // Redirect to investor's homepage after submission

    router.push("/Business/homepage");

    const values = {
      industry,
      location,
      minInvestment,
      maxInvestment,
    };
    const busi = await createBusiness(values);
    console.log(busi);
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-lg shadow-xl ${
          theme === "dark" ? "" : "bg-gray-100"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">
          Business Interest
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Documents helps us verify and approve your profile faster
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 tracking-wider">
          <div className="mb-4">
            <label htmlFor="investors-interest">
              <p className="text-[16px] font-thin">
                Select Industries that You have Interest
              </p>

              <select
                value={industry}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setIndustry(e.target.value)
                }
                className={`w-full p-3 rounded-md border outline-none mt-4 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B]"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <option value="">Select Your Industries</option>
                {/* Map your options here */}
              </select>
            </label>
          </div>

          <label htmlFor="location">
            <p className="text-[16px] font-light">
              Enter Locations you are interested
            </p>

            <select
              value={location}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setLocation(e.target.value)
              }
              className={`w-full p-3 rounded-md border outline-none mt-4 ${
                theme === "dark"
                  ? "bg-[#00171A] text-white border-[#3B3B3B]"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="">Enter Locations you are interested</option>
              {/* Map your options here */}
            </select>
          </label>
          <h2 className="text-[16px] font-thin mb-4">Your Investment Range</h2>

          <div className="sm:grid grid-cols-2 gap-2">
            {/* Slider for Min Investment */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Min. Investment:
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                value={minInvestment}
                step="10000"
                onChange={handleMinChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #a4e320 ${
                    minInvestment / 1000
                  }%, #2c3e50 0)`,
                }}
              />
              <div className="mt-1">{`₹ ${minInvestment.toLocaleString()} L`}</div>
            </div>

            {/* Slider for Max Investment */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Max. Investment:
              </label>
              <input
                type="range"
                min="200000"
                max="10000000"
                value={maxInvestment}
                step="10000"
                onChange={handleMaxChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #a4e320 ${
                    maxInvestment / 100000
                  }%, #2c3e50 0)`,
                }}
              />
              <div className="mt-1">{`₹ ${maxInvestment.toLocaleString()} L`}</div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <PrimaryButton
              type="submit"
              title="Submit"
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
