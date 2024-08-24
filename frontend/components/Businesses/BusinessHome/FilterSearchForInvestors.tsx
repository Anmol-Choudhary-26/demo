import React, { useEffect, useState } from "react";
import { FiltersProps } from "@/types";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

const locations = [
  { name: "Kerala", subLocations: ["Trivandrum", "Thrissur", "Kozhikode"] },
  { name: "Karnataka", subLocations: [] },
  { name: "TamilNadu", subLocations: [] },
  { name: "Goa", subLocations: [] },
];

const sectors = [
  { name: "Media & Marketing", subSectors: ["Facebook Marketing", "SMMA"] },
  { name: "Digital Marketing", subSectors: [] },
  { name: "Healthcare", subSectors: [] },
  { name: "Business Services", subSectors: [] },
  { name: "Foods and Beverages", subSectors: [] },
];

  
  
const InvestorsType = ["SOLEINVESTOR", "PARTNER", "STAKEHOLDER"];

interface FilterProps {
  isFilterVisible: boolean;
  setIsFilterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
}

interface YearRange {
  startYear: number | null;
  endYear: number | null;
}

export function FilterSearchForInvestors({
  isFilterVisible,
  setIsFilterVisible,
  filters,
  setFilters,
}: FilterProps) {
  const { theme } = useTheme(); // Use theme from context

  const [investorsType, setInvestorsType] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<YearRange>({
    startYear: null,
    endYear: null,
  });
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>("");
  const [sectorSearchQuery, setSectorSearchQuery] = useState<string>("");

  const applyFilters = () => {
    setFilters({
      ...filters,
      location: selectedLocations.join(","),
      sector: selectedSectors.join(","),
      searchTerms: filters.searchTerms,
      minInvestment,
      maxInvestment,
      yearRange,
    });
  };
  
  const [style, setStyle] = useState({});
  
  const [minInvestment, setMinInvestment] = useState<number>(0);
  const [maxInvestment, setMaxInvestment] = useState<number>(200000);
  
  console.log(investorsType, selectedLocations, selectedSectors, yearRange, minInvestment, maxInvestment)
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinInvestment(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxInvestment(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;

      const updatedStyle = {
        marginTop: position < 100 ? `${position + 80}px` : "20px",
      };
      setStyle(updatedStyle);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  const currentYear = new Date().getFullYear();
  const startYearOptions = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i + 2
  );

  const handleYearChange = (
    value: number | null,
    type: "startYear" | "endYear"
  ) => {
    setYearRange((prev) => ({ ...prev, [type]: value }));
  };

  const handleInvestorsTypeChange = (option: string) => {
    setInvestorsType((prevInvestor) =>
      prevInvestor.includes(option)
        ? prevInvestor.filter((op) => op !== option)
        : [...prevInvestor, option]
    );
  };

  const handleLocationChange = (locationName: string) => {
    setSelectedLocations((prevLocations) =>
      prevLocations.includes(locationName)
        ? prevLocations.filter((loc) => loc !== locationName)
        : [...prevLocations, locationName]
    );
  };

  const handleSectorChange = (sector: string) => {
    setSelectedSectors((prevSectors) =>
      prevSectors.includes(sector)
        ? prevSectors.filter((s) => s !== sector)
        : [...prevSectors, sector]
    );
  };

  const handleRemoveSearchTerm = (index: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerms: prevFilters.searchTerms.filter((_, i) => i !== index),
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      sector: "",
      searchTerms: [],
      legalEntity: [],
      minInvestment: 0,
      maxInvestment: Infinity,
      yearRange: { startYear: null, endYear: null },
    });
    
    setInvestorsType([]);
    setSelectedLocations([]);
    setSelectedSectors([]);

    // Reset the year range to null
    setYearRange({
      startYear: null,
      endYear: null,
    });
  };

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
      location.subLocations.some((subLocation) =>
        subLocation.toLowerCase().includes(locationSearchQuery.toLowerCase())
      )
  );

  const filteredSectors = sectors.filter(
    (sector) =>
      sector.name.toLowerCase().includes(sectorSearchQuery.toLowerCase()) ||
      sector.subSectors.some((subSector) =>
        subSector.toLowerCase().includes(sectorSearchQuery.toLowerCase())
      )
  );
  console.log('filters')
  return (
    <>
      {isFilterVisible && (
        <aside
          className={`fixed ml-2 mt-20 mb-2 rounded-xl w-[300px] inset-y-0 left-0 p-4 z-50 overflow-auto transition-all duration-300 ${
            theme === "dark" ? "bg-[#003034]" : "bg-white"
          } ${isFilterVisible ? "translate-x-0" : "-translate-x-full"}`}
          style={style}
        >
          <div className="flex justify-between items-center">
            <Typography
              className={`text-[16px] font-manrope font-light tracking-wider capitalize ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              placeholder={undefined}
            >
              <Image
                src="/filter.svg"
                alt="filter"
                width={34}
                height={28}
                className="inline pr-2"
              />
              Filter
            </Typography>
            <button
              onClick={toggleFilter}
              className={`rounded-full p-1 ${
                theme === "dark" ? "text-[#B8FF22]" : "text-black"
              }`}
            >
              <XMarkIcon className="h-8 w-8 stroke-2 rounded-full" />
            </button>
          </div>
          <div className="flex items-center justify-between my-4">
            <Typography
              className={`font-semibold font-manrope ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              placeholder={undefined}
            >
              Applied Filters
            </Typography>
            <button
              onClick={clearFilters}
              className={`font-manrope ${
                theme === "dark" ? "text-gray-400" : "text-black"
              }`}
            >
              Clear All
            </button>
          </div>
          <div className="searchUnits">
            {filters.searchTerms.map((term, index) => (
              <div
                key={index}
                className="bg-[#B8FF22] text-[#003034] font-medium p-2 my-2 rounded-full flex justify-between items-center"
              >
                {term}
                <button onClick={() => handleRemoveSearchTerm(index)}>
                  <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <hr className="bg-gray-400" />
          {/* Investor Type */}
          <div className="mt-4">
            <Typography
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold mb-2`}
              placeholder={undefined}
            >
              Investor Type
            </Typography>
            {InvestorsType.map((option) => (
              <label key={option} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={investorsType.includes(option)}
                  onChange={() => handleInvestorsTypeChange(option)}
                  className="checkbox_design"
                />
                <span className="dark:text-[#ffffff] text-[#00171A]">
                  {option}
                </span>
              </label>
            ))}
          </div>
          <hr className="bg-gray-400" />

          {/* Location section */}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold mb-2`}
              as="h3" // Use appropriate element for Typography
            >
              Location
            </Typography>
            <input
              type="search"
              placeholder="Search for a Location"
              value={locationSearchQuery}
              onChange={(e) => setLocationSearchQuery(e.target.value)}
              className={`w-full p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-white/20 text-white placeholder-white/70"
                  : "bg-gray-200 text-black placeholder-gray-500"
              } focus:ring-2 focus:ring-green-500 mb-2`}
            />
            {filteredLocations.map((location) => (
              <div key={location.name} className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location.name)}
                    onChange={() => handleLocationChange(location.name)}
                    className="form-checkbox rounded text-green-500 checkbox_design"
                  />
                  <span
                    className={`dark:text-[#ffffff] text-[#00171A] ${
                      location.subLocations.length ? "font-bold" : ""
                    }`}
                  >
                    {location.name}
                  </span>
                </label>
                {location.subLocations.length > 0 &&
                  location.subLocations.map((subLocation) => (
                    <label
                      key={subLocation}
                      className="flex items-center space-x-2 pl-4"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(subLocation)}
                        onChange={() => handleLocationChange(subLocation)}
                        className="form-checkbox rounded checkbox_design"
                      />
                      <span className="dark:text-[#ffffff] text-[#00171A]">
                        {subLocation}
                      </span>
                    </label>
                  ))}
              </div>
            ))}
          </div>
          <hr className="bg-gray-400" />
          {/* Sector filter section */}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold mb-2`}
              as="h3"
            >
              Sector
            </Typography>
            <input
              type="search"
              placeholder="Search for a Sector"
              value={sectorSearchQuery}
              onChange={(e) => setSectorSearchQuery(e.target.value)}
              className={`w-full p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-white/20 text-white placeholder-white/70"
                  : "bg-gray-200 text-black placeholder-gray-500"
              } focus:ring-2 focus:ring-green-500 mb-2`}
            />
            {filteredSectors.map((sector) => (
              <div key={sector.name} className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector.name)}
                    onChange={() => handleSectorChange(sector.name)}
                    className="form-checkbox rounded text-green-500 checkbox_design"
                  />
                  <span
                    className={`dark:text-[#ffffff] text-[#00171A] ${
                      sector.subSectors.length ? "font-bold" : ""
                    }`}
                  >
                    {sector.name}
                  </span>
                </label>
                {sector.subSectors.length > 0 &&
                  sector.subSectors.map((subSector) => (
                    <label
                      key={subSector}
                      className="flex items-center space-x-2 pl-4"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSectors.includes(subSector)}
                        onChange={() => handleSectorChange(subSector)}
                        className="form-checkbox rounded text-green-500 checkbox_design"
                      />
                      <span className="dark:text-[#ffffff] text-[#00171A]">
                        {subSector}
                      </span>
                    </label>
                  ))}
              </div>
            ))}
          </div>
          <hr className="bg-gray-400" />
          {/* Investment Range Section*/}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold mb-2`}
              as="h3"
            >
              Investment Range
            </Typography>

            {/* <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }: { min: number; max: number }) =>
                console.log(`min = ${min}, max = ${max}`)
              }
            /> */}

            <div className="sm:grid grid-cols-2 gap-2">
              {/* Slider for Min Investment */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={minInvestment}
                  step="10000"
                  onChange={handleMinChange}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  style={{
                    background: `linear-gradient(to right, #a4e320 ${
                      minInvestment / 1000
                    }%, #2c3e50 0)`,
                  }}
                />
                <div
                  className="rounded-lg p-2 mt-2"
                  style={{
                    background: theme === "dark" ? "#103B3E" : "#F0F0F0",
                  }}
                >
                  <label
                    className="mb-2 text-sm"
                    style={{ color: theme === "dark" ? "gray" : "black" }}
                  >
                    Min. Investment:
                  </label>
                  {`₹ ${minInvestment.toLocaleString()} L`}
                </div>
              </div>

              {/* Slider for Max Investment */}
              <div className="mb-4">
                <input
                  type="range"
                  min="200000"
                  max="10000000"
                  value={maxInvestment}
                  step="10000"
                  onChange={handleMaxChange}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                  style={{
                    background: `linear-gradient(to right, #a4e320 ${
                      maxInvestment / 100000
                    }%, #2c3e50 0)`,
                  }}
                />
                <div
                  className="rounded-lg p-2 mt-2"
                  style={{
                    background: theme === "dark" ? "#103B3E" : "#F0F0F0",
                  }}
                >
                  <label
                    className="mb-2 text-sm"
                    style={{ color: theme === "dark" ? "gray" : "black" }}
                  >
                    Max. Investment:
                  </label>
                  {`₹ ${maxInvestment.toLocaleString()} L`}
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-gray-400" />
          {/* Year Section */}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } font-semibold mb-2`}
              as="h3"
            >
              Year Of Establishment
            </Typography>
            <p className="text-gray-400 text-[14px]">Between</p>
            <div className="flex gap-4">
              <select
                value={yearRange.startYear ?? ""}
                onChange={(e) =>
                  handleYearChange(
                    e.target.value ? parseInt(e.target.value, 10) : null,
                    "startYear"
                  )
                }
                className={`w-full p-2 rounded-lg border ${
                  theme === "dark"
                    ? "border-[#E9F8CA] bg-[#003034] text-white"
                    : "border-gray-300 bg-white text-black"
                } text-[14px] outline-none`}
              >
                <option value="">Select start year</option>

                {startYearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={yearRange.endYear ?? ""}
                onChange={(e) =>
                  handleYearChange(
                    e.target.value ? parseInt(e.target.value, 10) : null,
                    "endYear"
                  )
                }
                className={`w-full p-2 rounded-lg border ${
                  theme === "dark"
                    ? "border-[#E9F8CA] bg-[#003034] text-white"
                    : "border-gray-300 bg-white text-black"
                } text-[14px] outline-none`}
              >
                <option value="">Select end year</option>
                {startYearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={applyFilters}
              className="w-full text-[#003034] bg-[#B8FF22] font-medium rounded-full text-sm px-5 py-2 text-center"
            >
              Apply Filters
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
