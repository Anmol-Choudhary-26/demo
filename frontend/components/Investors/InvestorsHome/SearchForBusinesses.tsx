import React, { useEffect, useState } from "react";
import { FilterSearchForBusiness } from "./FilterSearchForBusiness";
import { Business, FiltersProps, YearRange } from "@/types";
import Image from "next/image";
import { BusinessCard } from "@/components/Common/BusinessCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/Common/Pagination";
import { useTheme } from "@/context/ThemeContext";
import { SidebarFilterSearchForBusiness } from "./SidebarFilterSearchForBusiness";

const businessesData: Business[] = [

  
    {
      id: "1",
      name: "Sole Investor",
      industry: "Technology",
      State: "Kerala",
      InvestmentRangeEnd: 150000,
      type: "",
      district:"kerela"
     
    },
    
  
];

const SearchForBusinesses = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<FiltersProps>({
    location: "",
    sector: "",
    searchTerms: [],
    businessLookingFor: [],
    legalEntity: [],
    minInvestment: 0,
    maxInvestment: Number.MAX_SAFE_INTEGER,
    yearRange: { startYear: null, endYear: null },
  });
  const [sortOption, setSortOption] = useState("New");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOption(event.target.value);
  };

  const sortedBusinesses = [...businessesData].sort((a, b) => {

    if (sortOption === "New") {
      return a.type === "New" ? -1 : 1;
    }
    if (sortOption === "Old") {
      return a.type === "Old" ? -1 : 1;
    }
    if (sortOption === "Investment Lowest") {
      return a.InvestmentRangeEnd - b.InvestmentRangeEnd;
    }
    if (sortOption === "Investment Highest") {
      return b.InvestmentRangeEnd - a.InvestmentRangeEnd;
    }
    return 0;
  });

  const filteredBusinesses = sortedBusinesses.filter((business) => {
    const matchesLocation =
      !filters.location || business.State.includes(filters.location);
    const matchesSector =
      !filters.sector || business.industry.includes(filters.sector);
    const matchesSearchTerms = filters.searchTerms.every((term) =>
      business.name.toLowerCase().includes(term.toLowerCase())
    );

    const matchesBusinessLookingFor =
      !filters.businessLookingFor?.length ||
      (business.type && filters.businessLookingFor.includes(business.type));
    const matchesLegalEntity =
      !filters.legalEntity?.length ||
      (business.legalEntity &&
        filters.legalEntity.includes(business.legalEntity));

    const matchesMinInvestment =
      filters.minInvestment === undefined ||
      business.InvestmentRangeEnd >= filters.minInvestment;
    const matchesMaxInvestment =
      filters.maxInvestment === undefined ||
      business.InvestmentRangeEnd<= filters.maxInvestment;

    return (
      matchesLocation &&
      matchesSector &&
      matchesSearchTerms &&
      matchesBusinessLookingFor &&
      matchesLegalEntity &&
      matchesMinInvestment &&
      matchesMaxInvestment
    );
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  const addSearchTerm = (term: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerms: [...prevFilters.searchTerms, term],
    }));
  };

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim()) {
      addSearchTerm(searchInput.trim());
      setSearchInput(""); // Clear the input after search
    }
  };

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      addSearchTerm(searchInput.trim());
      setSearchInput(""); // Clear the input after search
    }
  };

  const applyFilters = (newFilters: FiltersProps) => {
    setFilters(newFilters);
    paginate(1); // Reset to page 1 when filters change
  };

  const { theme } = useTheme(); // Use the theme context

  return (
    <div
      className={`ml-2 flex ${
        isFilterVisible ? "ml-80" : ""
      } transition-all duration-300`}
    >
      {isFilterVisible && (
        <FilterSearchForBusiness
          isFilterVisible={isFilterVisible}
          setIsFilterVisible={setIsFilterVisible}
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />
      )}

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
                <SidebarFilterSearchForBusiness
                  isFilterVisible={isFilterVisible}
                  setIsFilterVisible={setIsFilterVisible}
                  filters={filters}
                  setFilters={setFilters}
                  applyFilters={applyFilters}
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
            <div className="flex ml-4 mt-2 ">
              <div>
                <p
                  className={`font-light tracking-wide ${
                    theme === "dark" ? "text-white" : "text-[#00171A]"
                  }`}
                >
                  looking for Investment
                </p>
              </div>

              <div className="flex items-center ml-8">
                <p className="text-gray-400">Sort by</p>
                <select
                  value={sortOption}
                  onChange={handleSortOptionChange}
                  className={`ml-2 px-2 py-1 border rounded ${
                    theme === "dark"
                      ? "bg-[#18363a] border-none outline-[#B8FF22] rounded-full text-white"
                      : "bg-white border outline-[#248E38] rounded-full text-[#00171A]"
                  }`}
                >
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                  <option value="Investment Lowest">Investment Lowest</option>
                  <option value="Investment Highest">Investment Highest</option>
                </select>
              </div>
            </div>
          </div>

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

export default SearchForBusinesses;
