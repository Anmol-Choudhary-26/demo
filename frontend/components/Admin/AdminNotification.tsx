import React, { useState } from "react";
import AdminNotificationCard from "./AdminNotificationCard"; // Adjust the import path accordingly
import { Notification } from "@/types";

const notifications: Notification[] = [
  {
    id: "1",
    authorName: "Shirly Franklin",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 4140 Parker Rd. Allentown, New Mexico 31134, To Hanry Porter",
    date: "15 May 2020",
    time: "9:00 am",
  },
  {
    id: "2",
    authorName: "John Doe",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 1234 Elm St. Springfield, IL 62704, To Jane Smith",
    date: "14 May 2020",
    time: "10:00 am",
  },
  {
    id: "3",
    authorName: "Alice Johnson",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 5678 Oak St. Metropolis, IL 62960, To Clark Kent",
    date: "13 May 2020",
    time: "11:00 am",
  },
  {
    id: "4",
    authorName: "Bob Brown",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 910 Pine St. Smallville, KS 67524, To Lois Lane",
    date: "12 May 2020",
    time: "12:00 pm",
  },
  {
    id: "5",
    authorName: "Charlie White",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 1122 Maple St. Gotham, NY 10001, To Bruce Wayne",
    date: "11 May 2020",
    time: "1:00 pm",
  },
  {
    id: "6",
    authorName: "David Green",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 2233 Birch St. Star City, WA 98101, To Oliver Queen",
    date: "10 May 2020",
    time: "2:00 pm",
  },
  {
    id: "7",
    authorName: "Eva Black",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 3344 Cedar St. Central City, MO 63020, To Barry Allen",
    date: "9 May 2020",
    time: "3:00 pm",
  },
  {
    id: "8",
    authorName: "Frank Gray",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 4455 Willow St. Coast City, CA 90210, To Hal Jordan",
    date: "8 May 2020",
    time: "4:00 pm",
  },
  {
    id: "9",
    authorName: "Grace Blue",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 5566 Aspen St. National City, NJ 07306, To Kara Danvers",
    date: "7 May 2020",
    time: "5:00 pm",
  },
  {
    id: "10",
    authorName: "Hank Brown",
    profileImage: "/avatar.svg",
    message:
      "Requesting Transfer of the Property: 6677 Redwood St. Midway City, IL 60456, To Carter Hall",
    date: "6 May 2020",
    time: "6:00 pm",
  },
];

const itemsPerPage = 5;

const NotificationList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.authorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search a Notification"
          className="bg-transparent border text-white px-4 py-2 rounded-full w-3/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-lime-500 text-[#103B3E] px-4 py-2 rounded-full">
          Search
        </button>
      </div>
      {currentNotifications.map((notification) => (
        <AdminNotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-lime-500 text-black px-4 py-2 rounded-full"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-lime-500 text-black px-4 py-2 rounded-full"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
