import { Drawer, IconButton } from "@material-tailwind/react";
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

interface SidebarFilterSearchForFranchiseProps {
  isFilterVisible: boolean;
  setIsFilterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
  applyFilters: (filters: FiltersProps) => void;
}

export const SidebarFilterSearchForFranchise: React.FC<
  SidebarFilterSearchForFranchiseProps
> = ({
  isFilterVisible,
  setIsFilterVisible,
  filters,
  setFilters,
  applyFilters,
}) => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { theme } = useTheme(); // use the theme hook
  const [businessLookingFor, setBusinessLookingFor] = useState<string[]>([]);
  const [legalEntity, setLegalEntity] = useState<string[]>([]);
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
    <React.Fragment>
      <button
        className="dark:bg-[#B8FF22] dark:text-[#00171A] bg-[#248E38] text-[#ffffff] p-2 rounded-full mt-2"
        onClick={openDrawer}
      >
        Filter
      </button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className={`p-4 sm:w-96 w-full ${
          theme === "dark"
            ? "bg-[#003034] text-[#d7d4d4]"
            : "bg-[#f0f0f0] text-[#00171A]"
        }`}
        overlayProps={{ className: "fixed inset-0 bg-black bg-opacity-50" }}
        style={{ overflow: "auto", height: "100vh" }}
        placeholder={undefined}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="font-semibold text-[22px] dark:text-[#B8FF22] text-[#248E38]">
            Filter Options
          </p>
          <IconButton
            variant="text"
            color="blue-gray"
            size="sm"
            ripple={false}
            onClick={closeDrawer}
            className="ml-auto"
            placeholder={undefined}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>
        <div
          className="p-4 border border-gray-300 rounded-md"
          style={{ overflowY: "auto", height: "calc(100vh - 80px)" }} // Added height and overflow
        >
          {/* Business Looking For Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2">Business Looking For</label>
            {BusinessLookingFor.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBusinessLookingFor.includes(option)}
                  onChange={() => handleBusinessLookingChange(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Legal Entity Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2">Legal Entity</label>
            {LegalEntity.map((entity) => (
              <label key={entity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedLegalEntity.includes(entity)}
                  onChange={() => handleLegalEntityChange(entity)}
                  className="mr-2"
                />
                {entity}
              </label>
            ))}
          </div>

          {/* Location Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2">Location</label>
            <input
              type="text"
              value={locationSearchQuery}
              onChange={(e) => setLocationSearchQuery(e.target.value)}
              placeholder="Search Locations"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            {filteredLocations.map((location) => (
              <div key={location.name}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location.name)}
                    onChange={() => handleLocationChange(location.name)}
                    className="mr-2"
                  />
                  {location.name}
                </label>
                {location.subLocations.length > 0 && (
                  <div className="ml-4">
                    {location.subLocations.map((subLocation) => (
                      <label key={subLocation} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedLocations.includes(subLocation)}
                          onChange={() => handleLocationChange(subLocation)}
                          className="mr-2"
                        />
                        {subLocation}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sector Filter */}
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-2">Sector</label>
            <input
              type="text"
              value={sectorSearchQuery}
              onChange={(e) => setSectorSearchQuery(e.target.value)}
              placeholder="Search Sectors"
              className="mb-2 p-2 border border-gray-300 rounded-md"
            />
            {filteredSectors.map((sector) => (
              <div key={sector.name}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector.name)}
                    onChange={() => handleSectorChange(sector.name)}
                    className="mr-2"
                  />
                  {sector.name}
                </label>
                {sector.subSectors.length > 0 && (
                  <div className="ml-4">
                    {sector.subSectors.map((subSector) => (
                      <label key={subSector} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedSectors.includes(subSector)}
                          onChange={() => handleSectorChange(subSector)}
                          className="mr-2"
                        />
                        {subSector}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Year Section */}
          <div className="">
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
                className="w-full p-2 rounded-lg border bg-[#003034] text-[14px] outline-none"
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
                  <label className="text-[#00171A] dark:text-gray-400 mb-2 text-sm">
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
                  <label className="mb-2 text-sm text-[#00171A] dark:text-gray-400">
                    Max. Investment:
                  </label>
                  {`₹ ${maxInvestment.toLocaleString()} L`}
                </div>
              </div>
            </div>
          </div>

          {/* Apply and Clear Filters */}
          <div className="flex justify-between gap-2">
            <button
              onClick={handleApplyFilters}
              className="text-[#003034] bg-[#B8FF22] font-medium rounded-full text-sm px-5 py-2 text-center"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="text-[#003034] bg-[#B8FF22] font-medium rounded-full text-sm px-5 py-2 text-center"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default SidebarFilterSearchForFranchise;
