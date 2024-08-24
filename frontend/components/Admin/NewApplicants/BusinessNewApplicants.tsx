import Pagination from "@/components/Common/Pagination";
import React, { useState, useEffect } from "react";
import { NewBusinessCard } from "@/components/Admin/NewApplicants/NewBusinessCard";
import {verifiedBusiness} from '../../../hooks/useBusiness'

const BusinessNewApplicants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [businessesData, setBusinessesData] = useState([]);

  useEffect( () => {
    const fn = async () =>{
      const business = await verifiedBusiness()
      setBusinessesData(business)
    }
    fn()
  }, [])

  console.log(businessesData)
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
      <p className="mb-4">InvestorsNewApplicants</p>
      <div className="mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentBusinesses.map((business:any, index:any) => (
          <NewBusinessCard key={index} business={business} />
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

export default BusinessNewApplicants;
