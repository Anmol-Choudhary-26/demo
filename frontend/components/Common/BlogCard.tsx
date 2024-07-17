import { BlogPost } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function BlogCard(values: any) {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl overflow-hidden ease-in-out ${
        theme === "dark" ? "bg-[#0a2426]" : "bg-[#f0f0f0] text-black"
      }`}
    >
      <div className="sm:flex sm:items-center px-2">
        <div className="h-48 sm:w-[420px] rounded-xl relative">
          <Image
            src="/BlogImage.svg" // Make sure the image path is correct
            alt="Blog Image"
            layout="fill" // This makes the image fill the container
            objectFit="cover"
            className="rounded-xl" // This makes the image cover the container without stretching
          />
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <p
              className={`text-sm font-semibold py-2 px-4 rounded-full ${
                theme === "dark"
                  ? "text-[#A4E320] bg-[#001F22] bg-opacity-[40]"
                  : "text-[#248E38] bg-[#e0e0e0]"
              }`}
            >
              Category
            </p>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              5 min read
            </p>
          </div>
          <div className="mb-2 mt-3">
            <p
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {values.values.title}
            </p>
          </div>
          <p
            className={`font-thin text-[14px] sm:text-[16px] ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {values.values.description}
          </p>
          <div className="px-6 pt-4 pb-2 flex justify-end items-center">
            <p
              className={`text-16px cursor-pointer transition duration-300 ease-in-out ${
                theme === "dark" ? "text-[#A4E320]" : "text-[#248E38]"
              }`}
            >
              Read more
              <span className="w-2 inline-block transform translate-y-1">
                &gt;
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
