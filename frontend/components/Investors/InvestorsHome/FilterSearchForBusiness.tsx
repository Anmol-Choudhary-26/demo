import React, { useEffect, useState } from "react";
import { FiltersProps, YearRange } from "@/types"; // assuming you have a file for type definitions
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";
import { useTheme } from "@/context/ThemeContext"; // import the useTheme hook

const locations = [
  { name: "Kerala", subLocations: ["Trivandrum", "Thrissur", "Kozhikode"] },
  { name: "Karnataka", subLocations: [] },
  { name: "TamilNado", subLocations: [] },
  { name: "Goa", subLocations: [] },
];

const sectors = [
  {
    name: "Media & Marketing",
    subSectors: ["Facebook Marketing", "SMMA", "Digital Marketing"],
  },
  { name: "Healthcare", subSectors: [] },
  { name: "Business Services", subSectors: [] },
  { name: "Foods and Beverages", subSectors: [] },
];

const BusinessLookingFor = [
  "Sole investor",
  "Partner",
  "Stakeholders",
  "Ideas",
];

const LegalEntity = [
  "Sole Partnership",
  "Partnership",
  "Limited Liability Partnership",
  "Limited Liability Company",
  "Private Limited Company",
  "S Corporation",
  "C Corporation",
  "Other",
];

interface FilterProps {
  isFilterVisible: boolean;
  setIsFilterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
  applyFilters: (newFilters: FiltersProps) => void;
}

export function FilterSearchForBusiness({
  isFilterVisible,
  setIsFilterVisible,
  filters,
  setFilters,
  applyFilters,
}: FilterProps) {
  const { theme } = useTheme(); // use the theme hook
  // const [businessLookingFor, setBusinessLookingFor] = useState<string[]>([]);
  // const [legalEntity, setLegalEntity] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<YearRange>({
    startYear: null,
    endYear: null,
  });
  const [selectedBusinessLookingFor, setSelectedBusinessLookingFor] = useState<
    string[]
  >([]);
  const [selectedLegalEntity, setSelectedLegalEntity] = useState<string[]>([]);

  const [style, setStyle] = useState({}); // For dynamic styling based on scroll

  const [minInvestment, setMinInvestment] = useState<number>(0);
  const [maxInvestment, setMaxInvestment] = useState<number>(200000);

  const [locationSearchQuery, setLocationSearchQuery] = useState<string>("");
  const [sectorSearchQuery, setSectorSearchQuery] = useState<string>("");

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinInvestment(value);
  };

  const handleCheckboxChange = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxInvestment(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;

      const updatedStyle = {
        marginTop: position < 100 ? `${position + 80}px` : "20px", // Adjust '100px' based on your needs
      };
      setStyle(updatedStyle);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible); // Corrected usage

  const currentYear = new Date().getFullYear();
  const startYearOptions = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  );

  const handleYearChange = (
    value: number | null,
    type: "startYear" | "endYear"
  ) => {
    setYearRange((prev) => ({ ...prev, [type]: value }));
  };

  const handleBusinessLookingChange = (option: string) => {
    setSelectedBusinessLookingFor((prev) => {
      const isAlreadySelected = prev.includes(option);
      if (isAlreadySelected) {
        return prev.filter((item) => item !== option); // Remove the item
      } else {
        return [...prev, option]; // Add the item
      }
    });
  };

  const handleLegalEntityChange = (entity: string) => {
    setSelectedLegalEntity((prev) => {
      const isAlreadySelected = prev.includes(entity);
      if (isAlreadySelected) {
        return prev.filter((item) => item !== entity); // Remove the item if it's already selected
      } else {
        return [...prev, entity]; // Add the item if it's not already selected
      }
    });
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

  const handleApplyFilters = () => {
    // Create a FiltersProps object with current selections
    const newFilters = {
      location: selectedLocations.join(", "), // Assuming multiple locations can be selected and should be combined into a single string
      sector: selectedSectors.join(", "), // Same assumption as with locations
      searchTerms: filters.searchTerms, // Directly using existing search terms from state
      businessLookingFor: selectedBusinessLookingFor,
      legalEntity: selectedLegalEntity,
      minInvestment: minInvestment,
      maxInvestment: maxInvestment,
      yearRange: yearRange, // Using the existing year range from state
    };

    // Call the applyFilters function provided in props with the new filters
    applyFilters(newFilters);
  };

  // Add a function to apply all filters
  const handleClearFilters = () => {
    // Defined a new FiltersProps object with default values
    const resetFilters = {
      location: "",
      sector: "",
      searchTerms: [],
      businessLookingFor: [],
      legalEntity: [],
      minInvestment: 0, // Assuming 0 is the minimum for your context
      maxInvestment: Number.MAX_SAFE_INTEGER, // Assuming this is the max in your context
      yearRange: { startYear: null, endYear: null }, // Resetting year range
    };

    // Apply the reset filters
    applyFilters(resetFilters);

    // Clear local state selections
    setSelectedBusinessLookingFor([]);
    setSelectedLegalEntity([]);
    setSelectedLocations([]);
    setSelectedSectors([]);
    setMinInvestment(0);
    setMaxInvestment(200000);
    setYearRange({ startYear: null, endYear: null });
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  const filteredSectors = sectors.filter((sector) =>
    sector.name.toLowerCase().includes(sectorSearchQuery.toLowerCase())
  );

  return (
    <>
      {isFilterVisible && (
        <aside
          className={`fixed ml-2 mt-20 mb-2 rounded-xl w-[300px] inset-y-0 left-0 ${
            theme === "dark" ? "bg-[#003034]" : "bg-[#f0f0f0]"
          } p-4 z-50 overflow-auto transition-all duration-300 ${
            isFilterVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <Typography
              placeholder={undefined}
              className={`text-[16px] font-manrope font-light tracking-wider capitalize ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
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
              className="rounded-full text-[#248E38] dark:text-[#B8FF22] p-1"
            >
              <XMarkIcon className="h-8 w-8 stroke-2 rounded-full" />
            </button>
          </div>
          <div className="flex items-center justify-between my-4">
            <Typography
              className={` ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }font-semibold font-manrope`}
              placeholder={undefined}
            >
              Applied Filters
            </Typography>
            <button
              onClick={handleClearFilters}
              className="text-gray-400 font-manrope"
            >
              Clear All
            </button>
          </div>
          <div className="searchUnits">
            {filters.searchTerms.map((term, index) => (
              <div
                key={index}
                className="bg-[#248E38] dark:bg-[#B8FF22] text-[#ffffff] dark:text-[#003034] font-medium p-2 my-2 rounded-full flex justify-between items-center"
              >
                {term}
                <button onClick={() => handleRemoveSearchTerm(index)}>
                  <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <hr className="bg-gray-400" />

          {/* Businesses looking for section */}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Businesses looking for
            </Typography>
            {BusinessLookingFor.map((option) => (
              <label key={option} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedBusinessLookingFor.includes(option)}
                  onChange={() => handleBusinessLookingChange(option)}
                  className="checkbox_design"
                />
                <span
                  className={
                    theme === "dark" ? "text-green-200" : "text-gray-700"
                  }
                >
                  {option}
                </span>
              </label>
            ))}
          </div>

          <hr className="bg-gray-400" />

          {/* Legal Entity section */}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Legal Entity
            </Typography>
            {LegalEntity.map((entity) => (
              <label key={entity} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedLegalEntity.includes(entity)}
                  onChange={() => handleLegalEntityChange(entity)}
                  className="checkbox_design"
                />
                <span
                  className={
                    theme === "dark" ? "text-green-200" : "text-gray-700"
                  }
                >
                  {entity}
                </span>
              </label>
            ))}
          </div>

          <hr className="bg-gray-400" />

          {/* Location section */}
          <div className="mt-4">
            <Typography
              placeholder={undefined}
              as="h3" // Use appropriate element for Typography
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Location
            </Typography>
            <input
              type="search"
              placeholder="Search for a Location"
              value={locationSearchQuery}
              onChange={(e) => setLocationSearchQuery(e.target.value)}
              className={`w-full p-2 rounded-lg bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-green-500 mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
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
                    className={`${
                      theme === "dark" ? "text-green-200" : "text-gray-700"
                    } ${location.subLocations.length ? "font-bold" : ""}`}
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
                      <span
                        className={
                          theme === "dark" ? "text-green-200" : "text-gray-700"
                        }
                      >
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
              as="h3"
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
            >
              Sector
            </Typography>
            <input
              type="search"
              placeholder="Search for a Sector"
              value={sectorSearchQuery}
              onChange={(e) => setSectorSearchQuery(e.target.value)}
              className={`w-full p-2 rounded-lg bg-white/20 placeholder-white/70 focus:ring-2 focus:ring-green-500 mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
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
                    className={`${
                      theme === "dark" ? "text-green-200" : "text-gray-700"
                    } ${sector.subSectors.length ? "font-bold" : ""}`}
                  >
                    {sector.name}
                  </span>
                  {/* {sector.subSectors.length > 0 && (
                    <span className="text-green-500">➤</span>
                  )} */}
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
                      <span
                        className={
                          theme === "dark" ? "text-green-200" : "text-gray-700"
                        }
                      >
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
              as="h3"
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  style={{
                    background: `linear-gradient(to right, #a4e320 ${
                      minInvestment / 1000
                    }%, #2c3e50 0)`,
                  }}
                />
                <div
                  className={`rounded-lg p-2 mt-2 ${
                    theme === "dark"
                      ? "text-white bg-[#103B3E]"
                      : "text-[#00171A] bg-[#cfcfcf]"
                  }`}
                >
                  <label className="text-gray-400 mb-2 text-sm">
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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  style={{
                    background: `linear-gradient(to right, #a4e320 ${
                      maxInvestment / 100000
                    }%, #2c3e50 0)`,
                  }}
                />
                <div
                  className={`rounded-lg p-2 mt-2 ${
                    theme === "dark"
                      ? "text-white bg-[#103B3E]"
                      : "text-[#00171A] bg-[#cfcfcf]"
                  }`}
                >
                  <label className="mb-2 text-sm text-gray-400">
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
              as="h3"
              className={`font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#00171A]"
              }`}
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
                className="w-full p-2 rounded-lg border bg-[#003034] text-white text-[14px] outline-none"
              >
                <option className="bg-[#003034]" value="">
                  Select start year
                </option>

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
                className="w-full p-2 rounded-lg border bg-[#003034] text-white text-[14px] outline-none"
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
              onClick={handleApplyFilters}
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
