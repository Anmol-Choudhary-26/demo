import React, { useEffect, useState } from "react";
import { FilterSearchForInvestors } from "./FilterSearchForInvestors";
import { Business, FiltersProps } from "@/types";
import Image from "next/image";
import { BusinessCard } from "@/components/Common/BusinessCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/Common/Pagination";
import { useTheme } from "@/context/ThemeContext";
import SidebarFilterSearchForInvestors from "./SidebarFilterSearchForInvestors";

const businessesData: Business[] = [
  {
    id: "1",
    name: "Sole investor",
    industry: "Technology",
    location: "Kerala",
    investmentRequired: 150000,
  },
  {
    id: "2",
    name: "Health Pioneers",
    industry: "Healthcare",
    location: "Karnataka",
    investmentRequired: 250000,
  },
  {
    id: "3",
    name: "Green Agriculture",
    industry: "Agriculture",
    location: "TamilNadu",
    investmentRequired: 100000,
  },
  {
    id: "4",
    name: "Robust Infrastructure",
    industry: "Construction",
    location: "Goa",
    investmentRequired: 500000,
  },
  {
    id: "5",
    name: "Media Masters",
    industry: "Media",
    location: "Kerala",
    investmentRequired: 75000,
  },
  {
    id: "6",
    name: "Fashion Forward",
    industry: "Retail",
    location: "Karnataka",
    investmentRequired: 200000,
  },
  {
    id: "7",
    name: "Foodie Fiesta",
    industry: "Food Services",
    location: "Goa",
    investmentRequired: 50000,
  },
  {
    id: "8",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
  {
    id: "9",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
  {
    id: "10",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
  {
    id: "11",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
  {
    id: "12",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
  {
    id: "13",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
  {
    id: "14",
    name: "Auto Innovators",
    industry: "Automotive",
    location: "TamilNadu",
    investmentRequired: 300000,
  },
];

const SearchForInvestors = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<FiltersProps>({
    location: "",
    sector: "",
    searchTerms: [],
    legalEntity: [], // Add default values for optional properties
    minInvestment: 0,
    maxInvestment: Infinity,
    yearRange: { startYear: null, endYear: null },
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredBusinesses = businessesData.filter((business) => {
    const matchesLocation =
      !filters.location || business.location.includes(filters.location);
    const matchesSector =
      !filters.sector || business.industry.includes(filters.sector);
    const matchesSearchTerms = filters.searchTerms.every((term) =>
      business.name.toLowerCase().includes(term.toLowerCase())
    );
    return matchesLocation && matchesSector && matchesSearchTerms;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalCardsCount = filteredBusinesses.length;
  const pageCount = Math.ceil(totalCardsCount / itemsPerPage);

  const indexOfLastBusiness = currentPage * itemsPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  // This function is called when the Enter key is pressed or the search icon is clicked
  const addSearchTerm = (term: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerms: [...prevFilters.searchTerms, term],
    }));
  };

  // Handle the search on Enter press
  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim()) {
      addSearchTerm(searchInput.trim());
      setSearchInput(""); // Clear the input after search
    }
  };

  // Handle the search on icon click
  const handleSearchClick = () => {
    if (searchInput.trim()) {
      addSearchTerm(searchInput.trim());
      setSearchInput(""); // Clear the input after search
    }
  };

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const { theme } = useTheme();

  return (
    <div
      className={`ml-2 flex ${
        isFilterVisible ? "ml-80" : ""
      } transition-all duration-300`}
    >
      {/* Sidebar */}
      {isFilterVisible && (
        <FilterSearchForInvestors
          isFilterVisible={isFilterVisible}
          setIsFilterVisible={setIsFilterVisible} // Pass the setter function for visibility
          filters={filters} // Pass the filters state to the Filter component
          setFilters={setFilters}
        />
      )}

      {/* Main Content */}
      <main className={`flex-grow ${isFilterVisible ? "" : ""}`}>
        <section className="mb-10">
          <div className="flex items-center flex-wrap mb-2">
            {!isFilterVisible &&
              (screenWidth > 768 ? (
                <div className="">
                  <Button
                    onClick={toggleFilter}
                    className="flex items-center bg-[#cccccc] dark:bg-[#003034] text-[#00171A] dark:text-[#ffffff] text-[15px] rounded-full font-manrope font-light tracking-wider justify-center capitalize px-2 mt-4"
                    placeholder={undefined}
                  >
                    <Image
                      src="/filter.svg"
                      alt="filter"
                      width={30}
                      height={30}
                      className=""
                    />
                  </Button>
                </div>
              ) : (
                <SidebarFilterSearchForInvestors
                  isFilterVisible={isFilterVisible}
                  setIsFilterVisible={setIsFilterVisible} // Pass the setter function for visibility
                  filters={filters} // Pass the filters state to the Filter component
                  setFilters={setFilters}
                />
              ))}
            <div className="flex py-1 border border-gray-400 rounded-full hover:border-[#248E38] dark:hover:border-[#B8FF22] ml-4 max-w-[20rem] sm:max-w-[24rem] mt-4 sm:px-2 pl-7 sm:pr-10 pr-14">
              <div className="relative flex w-full max-w-[20rem] ">
                <input
                  placeholder="Search for the business or Investor"
                  type="text"
                  name="text"
                  id="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyUp={handleSearchEnter}
                  className={`p-2 text-sm bg-transparent focus:bg-transparent w-[20rem] h-10 rounded-full outline-none ${
                    theme === "dark" ? "text-white" : "text-[#00171A]"
                  }`}
                />
              </div>
              <Button
                onClick={handleSearchClick}
                placeholder=""
                size="sm"
                className="rounded-full bg-[#248E38] dark:bg-[#B8FF22]"
              >
                <MagnifyingGlassIcon className="p-0 h-4 w-4" />
              </Button>
            </div>
            <div className="flex ml-4 mt-2">
              <div>
                <p
                  className={`font-light tracking-wide ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  looking for Investment
                </p>
              </div>

              <div className="flex items-center ml-8">
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Sort by
                </p>
                <p
                  className={`flex items-center pl-1 font-medium ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  New Listing
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-4 w-4 transition-transform`}
                  />
                </p>
              </div>
            </div>
          </div>
          {/* Card list */}
          {/* Business Cards */}
          <div className="mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={pageCount}
            onPageChange={paginate}
          />
        </section>
      </main>
    </div>
  );
};

export default SearchForInvestors;
