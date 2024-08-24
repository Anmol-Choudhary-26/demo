import Pagination from "@/components/Common/Pagination";
import React, { useState, useEffect } from "react";
import { NewInvestorsCard } from "./NewInvestorsCard";
import {verifiedinvestor} from "../../../hooks/useInvestor"
const InvestorsNewApplicants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [investorData, setInvestorData] = useState([]);

  useEffect( () => {
    const fn = async () =>{
      const business = await verifiedinvestor()
      setInvestorData(business)
    }
    fn()
  }, [])

  const totalCardsCount = investorData.length;
  const pageCount = Math.ceil(totalCardsCount / itemsPerPage);
  const indexOfLastInvestor = currentPage * itemsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - itemsPerPage;

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentInvestors = investorData.slice(
    indexOfFirstInvestor,
    indexOfLastInvestor
  );

  return (
    <div>
      <p className="mb-4">InvestorsNewApplicants</p>
      <div className="mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentInvestors.map((investor, index) => (
          <NewInvestorsCard key={index} investors={investor} />
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

export default InvestorsNewApplicants;
