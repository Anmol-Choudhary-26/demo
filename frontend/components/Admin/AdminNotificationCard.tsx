import React from "react";
import Image from "next/image";
import { Notification } from "@/types";

interface NotificationItemProps {
  notification: Notification;
}

const AdminNotificationCard: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src={notification.profileImage}
          alt={notification.authorName}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-4">
          <p className="font-semibold">{notification.authorName}</p>
          <p>{notification.message}</p>
        </div>
      </div>
      <div className="text-right">
        <p>{notification.date}</p>
        <p>{notification.time}</p>
      </div>
    </div>
  );
};

export default AdminNotificationCard;
