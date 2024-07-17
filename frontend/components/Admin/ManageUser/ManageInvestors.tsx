import Pagination from "@/components/Common/Pagination";
import React, { useState } from "react";
import { investorsData } from "@/constants";
import { ManageInvestorsCard } from "./ManageInvestorsCard";

const ManageInvestors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentInvestors.map((investor) => (
          <ManageInvestorsCard key={investor.id} investors={investor} />
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
