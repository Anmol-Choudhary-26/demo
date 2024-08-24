import MultiRangeSlider from "@/components/Common/MultiRangeSlider";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { updateinvestor } from "@/hooks/useInvestor";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

const industriesList = [
  "Technology",
  "Healthcare",
  "Finance",
  "Real Estate",
  "Energy",
  "Consumer Goods",
  "Industrial",
  "Telecommunications",
  "Utilities",
  "Materials",
  "Transportation",
];

const locationsList = [
  { city: "New York", pincode: "10001" },
  { city: "Los Angeles", pincode: "90001" },
  { city: "Chicago", pincode: "60601" },
  { city: "Houston", pincode: "77001" },
  { city: "Phoenix", pincode: "85001" },
  { city: "Philadelphia", pincode: "19019" },
  { city: "San Antonio", pincode: "78201" },
  { city: "San Diego", pincode: "92101" },
  { city: "Dallas", pincode: "75201" },
  { city: "San Jose", pincode: "95101" },
];
export default function InvestorInterestForm() {
  const { theme } = useTheme(); // Use the theme from the context
  const router = useRouter();
  // State for form fields (assuming strings for simplicity, update as needed)
  const [industry, setIndustry] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);

  const industryDropdownRef = useRef<HTMLDivElement | null>(null);
  const locationDropdownRef = useRef<HTMLDivElement | null>(null);

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<
    { city: string; pincode: string }[]
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [locationDropdownOpen, setLocationDropdownOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        industryDropdownRef.current &&
        !industryDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setLocationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLocationDropdownToggle = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };


  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinInvestment(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxInvestment(value);
  };

  const [minInvestment, setMinInvestment] = useState<number>(0);
  const [maxInvestment, setMaxInvestment] = useState<number>(200000);


  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prevSelected) =>
      prevSelected.includes(industry)
        ? prevSelected.filter((item) => item !== industry)
        : [...prevSelected, industry]
    );
  };

  
  const handleLocationChange = (location: {
    city: string;
    pincode: string;
  }) => {
    setSelectedLocations((prevSelected) => {
      const isSelected = prevSelected.some(
        (item) =>
          item.city === location.city && item.pincode === location.pincode
      );

      const updatedSelections = isSelected
        ? prevSelected.filter(
            (item) =>
              item.city !== location.city || item.pincode !== location.pincode
          )
        : [...prevSelected, location];

      console.log("Selected Locations:", updatedSelections); // Console log the updated selections

      return updatedSelections;
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form submission logic here
    // Redirect to investor's homepage after submission
    const formData = {
      interest: { industry, location },
      investmentRange: { minInvestment, maxInvestment },
    }
    const data = await updateinvestor(formData)

    router.push("/Investors/homepage");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-lg shadow-xl ${
          theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">
          Interest of Investor
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Documents help us verify and approve your profile faster
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 tracking-wider">
          <div className="mb-4">
            <label htmlFor="investors-interest">
              <p className="text-[16px] font-thin">
                Select Industries that You have Interest
              </p>
              <div
                ref={industryDropdownRef}
                className={`relative inline-block w-full mt-4 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B]"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <input
                  type="text"
                  readOnly
                  onClick={handleDropdownToggle}
                  value={selectedIndustries.join(", ")}
                  placeholder="Select Your Industries"
                  className={`w-full p-3 rounded-md border cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B]"
                      : "bg-white text-black border-gray-300"
                  } flex justify-between items-center`}
                />
                <span
                  onClick={handleDropdownToggle}
                  className={`absolute right-3 top-3 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  ▼
                </span>
                {dropdownOpen && (
                  <ul
                    className={`absolute z-10 mt-2 max-h-60 w-full overflow-auto border rounded-md ${
                      theme === "dark"
                        ? "bg-[#00171A] text-white border-[#3B3B3B]"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {industriesList.map((industry) => (
                      <li key={industry} className="p-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectedIndustries.includes(industry)}
                            onChange={() => handleIndustryChange(industry)}
                          />
                          <span className="ml-2">{industry}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="locations-interest">
              <p className="text-[16px] font-thin">
                Enter Locations you are interested
              </p>
              <div
                ref={locationDropdownRef}
                className={`relative inline-block w-full mt-4 ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-[#3B3B3B]"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <input
                  type="text"
                  readOnly
                  onClick={handleLocationDropdownToggle}
                  value={selectedLocations.map((loc) => loc.city).join(", ")}
                  placeholder="Select Your Locations"
                  className={`w-full p-3 rounded-md border cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B]"
                      : "bg-white text-black border-gray-300"
                  } flex justify-between items-center`}
                />
                <span
                  onClick={handleLocationDropdownToggle}
                  className={`absolute right-3 top-3 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  ▼
                </span>
                {locationDropdownOpen && (
                  <ul
                    className={`absolute z-10 mt-2 max-h-60 w-full overflow-auto border rounded-md ${
                      theme === "dark"
                        ? "bg-[#00171A] text-white border-[#3B3B3B]"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {locationsList.map((location) => (
                      <li key={location.city} className="p-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={selectedLocations.some(
                              (item) =>
                                item.city === location.city &&
                                item.pincode === location.pincode
                            )}
                            onChange={() => handleLocationChange(location)}
                          />
                          <span className="ml-2">
                            {location.city} ({location.pincode})
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </label>
          </div>
          <h2 className="text-[16px] font-thin mb-4">Your Investment Range</h2>
          <div className="sm:grid grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Min. Investment:
              </label>
              <input
                required
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
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Max. Investment:
              </label>
              <input
                required
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
