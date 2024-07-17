import React from "react";
import { useBookmarks } from "@/context/BookmarkContext";
import { BusinessCard } from "@/components/Common/BusinessCard";

const BusinessBookmark = () => {
  const { bookmarkedBusinesses } = useBookmarks();

  if (bookmarkedBusinesses.length === 0) {
    return <p>No businesses bookmarked yet.</p>;
  }

  return (
    <div>
      {bookmarkedBusinesses.map((business, index) => (
        <BusinessCard key={index} business={business} />
      ))}
    </div>
  );
};

export default BusinessBookmark;
