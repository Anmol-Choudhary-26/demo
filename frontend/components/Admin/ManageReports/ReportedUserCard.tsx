import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface ReportedUserCardProps {
  user: {
    id: string;
    name: string;
    profileImage: string;
    reason: string;
    reportedFor: string;
    userType: string; // Added userType to distinguish between investors and businesses
  };
}

const ReportedUserCard: React.FC<ReportedUserCardProps> = ({ user }) => {
  const router = useRouter();

  const handleVisitProfile = () => {
    const pathname =
      user.userType === "investor"
        ? "/Admin/manage-report/investors-user-profile"
        : "/Admin/manage-report/businesses-user-profile";

    router.push({
      pathname,
      query: { id: user.id },
    });
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
        <Image
          src={user.profileImage}
          alt={user.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="text-[16px] font-semibold tracking-wide text-white">
          {user.name}
        </p>
      </CardHeader>
      <CardBody className="mb-6 p-0" placeholder={undefined}>
        <p className="font-thin text-[14px] text-[#cccccc]">
          <strong>Reason:</strong> {user.reason}
        </p>
        <div className="bg-[#103B3E] p-2 rounded-md border border-[#B8FF22] mt-2">
          <p className="text-[#cccccc]">
            Reported for: <strong>{user.reportedFor}</strong>
          </p>
          <button
            onClick={handleVisitProfile}
            className="text-[#A4E320] underline"
          >
            Visit Profile
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReportedUserCard;
