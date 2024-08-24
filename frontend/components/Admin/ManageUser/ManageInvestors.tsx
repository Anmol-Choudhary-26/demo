import Pagination from "@/components/Common/Pagination";
import React, { useState, useEffect } from "react";
import { getAllInvestors } from "@/hooks/useInvestor";
import { ManageInvestorsCard } from "./ManageInvestorsCard";

const ManageInvestors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [investorsData, setInvestorData] = useState([])
  const itemsPerPage = 12;

  useEffect(() =>{
    const fn = async () =>{
      const business = await getAllInvestors()
      setInvestorData(business)
    }
    fn()
  }, [])

  const totalCardsCount = investorsData.length;
  const pageCount = Math.ceil(totalCardsCount / itemsPerPage);
  const indexOfLastInvestor = currentPage * itemsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - itemsPerPage;

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentInvestors = investorsData.slice(
    indexOfFirstInvestor,
    indexOfLastInvestor
  );

  return (
    <div>
      <p className="mb-4">Manage Investors</p>
      <div className="mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentInvestors.map((investor, index) => (
          <ManageInvestorsCard key={index} investors={investor} />
        ))}
      </div>
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default ManageInvestors;
