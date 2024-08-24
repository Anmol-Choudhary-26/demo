import Pagination from "@/components/Common/Pagination";
import React, { useState, useEffect } from "react";
import { ManageBusinessCard } from "./ManageBusinessCard";
import { getAllInvestors } from "@/hooks/useInvestor";

const ManageBusinesses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesData, setBusinessesData] = useState([]);
  const itemsPerPage = 12;

useEffect(() => {
  const fn = async () =>{
    const business = await getAllInvestors()
    setBusinessesData(business)
  }
  fn()
})

  const totalCardsCount = businessesData.length;
  const pageCount = Math.ceil(totalCardsCount / itemsPerPage);
  const indexOfLastBusiness = currentPage * itemsPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - itemsPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentBusinesses = businessesData.slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );

  return (
    <div>
      <p className="mb-4">ManageBusinesses</p>
      <div className="mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentBusinesses.map((business, index) => (
          <ManageBusinessCard key={index} business={business} />
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

export default ManageBusinesses;
