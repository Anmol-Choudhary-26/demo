import React, { createContext, useState, useContext, ReactNode } from "react";
import { Business } from "@/types"; // Import the Business type

interface BookmarkContextProps {
  bookmarkedBusinesses: Business[];
  addBookmark: (business: Business) => void;
  removeBookmark: (business: Business) => void;
}

const BookmarkContext = createContext<BookmarkContextProps>({
  bookmarkedBusinesses: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedBusinesses, setBookmarkedBusinesses] = useState<Business[]>(
    []
  );

  const addBookmark = (business: Business) => {
    setBookmarkedBusinesses([...bookmarkedBusinesses, business]);
  };

  const removeBookmark = (business: Business) => {
    setBookmarkedBusinesses(
      bookmarkedBusinesses.filter((b) => b.name !== business.name)
    );
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedBusinesses, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  return useContext(BookmarkContext);
};
