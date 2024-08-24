import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import { useRouter } from "next/router";
import { delBusiness } from "@/hooks/useBusiness";
import {  deletereportbusiness } from "../../../hooks/useReports";

interface ReportedUserCardProps {
  user: {
    id: string;
    businessName: string;
    profileImage: string;
    reason: string;
    reporterName: string;
  };
}

const ReportedUserCard: React.FC<ReportedUserCardProps> = ({ user }) => {
  const router = useRouter();

  const handleVisitProfile = () => {
    router.push({
      pathname: "/user-profile",
      query: { id: user.id },
    });
  };

  const handleDeleteReport = async () => {
    // Implement delete report functionality
    await  deletereportbusiness(user.id);
  };

  const handleTextUser = () => {
    // Implement text user functionality
    console.log("Text user:", user.id);
  };

  const handleBlockUser = async () => {
    // Implement block user functionality
    await delBusiness(user.id);
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="w-full bg-[#003034] rounded-lg px-4 text-white"
      placeholder={undefined}
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex justify-between items-center gap-4 pt-0 pb-8 border-none rounded-none"
        placeholder={undefined}
      >
        <img
          src={'/avatar.svg'}
          alt={user.businessName}
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="text-[16px] font-semibold tracking-wide text-white">
          {user.businessName}
        </p>
      </CardHeader>
      <CardBody className="mb-6 p-0" placeholder={undefined}>
        <p className="font-thin text-[14px] text-[#cccccc]">
          <strong>Reason:</strong> {user.reason}
        </p>
        <div className="bg-[#103B3E] p-2 rounded-md border border-[#B8FF22] mt-2">
          <p className="text-[#cccccc]">
            Reported for: <strong>{user.reporterName}</strong>
          </p>
          <button
            onClick={handleVisitProfile}
            className="text-[#A4E320] underline"
          >
            Visit Profile
          </button>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <button
            onClick={handleDeleteReport}
            className="bg-[#001F22] text-[#A4E320] px-4 py-2 rounded-full"
          >
            Delete Report
          </button>
          <button
            onClick={handleTextUser}
            className="bg-[#103B3E] text-[#A4E320] px-4 py-2 rounded-full"
          >
            Text User
          </button>
          <button
            onClick={handleBlockUser}
            className="bg-[#FFDCE5] text-[#EC183E] px-4 py-2 rounded-full"
          >
            Block User
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReportedUserCard;
