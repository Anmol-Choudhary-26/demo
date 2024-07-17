import { businessesData } from "@/constants";
import { BusinessCard } from "../Common/BusinessCard";
import SecondaryButton from "../Common/SecondaryButton";
import Link from "next/link";

export default function FranchiseCardList() {
  const selectedBusinesses = businessesData.slice(0, 3);

  return (
    <section className="mt-10 py-10 ">
      <div className="flex justify-between items-center text-white px-4 sm:px-10">
        <p>400 Result found</p>
        <p className="text-[#C7C7C7]">
          Short by: <span className="text-[#ffffff]"> New Listing</span>
        </p>
      </div>
      <div className="px-6 sm:px-8 pt-10 card-layout">
        {selectedBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
      <div className="px-6 sm:px-8 pt-2 card-layout relative card-shadow select-none">
        <div className="mt-8 absolute inset-0 flex flex-col justify-center items-center z-[1000]">
          <div className="text-white text-xl font-medium text-center">
            Get access to All Investors, Startups, <br /> Businesses and
            Franchises listing Database
          </div>
          <Link href="/auth/signup">
            <SecondaryButton
              title="Register and unlock"
              backgroundStyle="mt-8 border border-[#A4E320] rounded-lg text-[#A4E320] capitalize font-thin text-[14px]"
            />
          </Link>
        </div>
        {selectedBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </section>
  );
}
