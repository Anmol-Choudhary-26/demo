import React from "react";
import { useTheme } from "@/context/ThemeContext"; // Import the theme context

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { theme } = useTheme(); // Use the theme context

  // Function to create page numbers
  const createPageRange = () => {
    let range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 4)
      ) {
        range.push(i);
      }
    }
    return range;
  };

  // Page range array with ellipses
  const pageRange = createPageRange().reduce(
    (acc: Array<number | string>, pageNum, idx, arr) => {
      if (idx > 0 && pageNum - arr[idx - 1] === 2) {
        acc.push(pageNum - 1); // Directly add the number before ellipsis
        acc.push("..." + idx); // Unique key for ellipsis
      } else if (idx > 0 && pageNum - arr[idx - 1] !== 1) {
        acc.push("..." + idx); // Unique key for ellipsis
      }
      acc.push(pageNum);
      return acc;
    },
    []
  );

  return (
    <div className="flex justify-center items-center space-x-6 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 rounded-full disabled:bg-[#47474748] disabled:text-[#47474748] font-extrabold text-[20px] border ${
          theme === "dark" ? "text-white" : "text-black"
        } disabled:border-[#47474748]`}
      >
        {"<"}
      </button>

      {pageRange.map((item, idx) => {
        const isEllipsis = typeof item === "string" && item.startsWith("...");
        return isEllipsis ? (
          <span
            key={item}
            className={theme === "dark" ? "text-[#003034]" : "text-gray-600"}
          >
            {item}
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(Number(item))}
            disabled={currentPage === item}
            className={`px-4 py-2 rounded-full ${
              currentPage === item
                ? "bg-[#003034] text-[#B8FF22]"
                : theme === "dark"
                ? "hover:bg-[#003034] text-white"
                : "hover:bg-gray-300 text-black"
            }`}
          >
            {item}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 rounded-full disabled:bg-[#47474748] disabled:text-[#47474748] font-extrabold text-[20px] border ${
          theme === "dark" ? "text-white" : "text-black"
        } disabled:border-[#47474748]`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
