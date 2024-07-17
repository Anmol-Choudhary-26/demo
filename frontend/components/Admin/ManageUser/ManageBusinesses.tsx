import Pagination from "@/components/Common/Pagination";
import React, { useState } from "react";
import { businessesData } from "@/constants";
import { ManageBusinessCard } from "./ManageBusinessCard";

const ManageBusinesses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentBusinesses.map((business) => (
          <ManageBusinessCard key={business.id} business={business} />
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
