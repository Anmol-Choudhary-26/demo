import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Investor } from "@/types";
import { investorsData } from "@/constants";
import Modal from "@/components/Admin/Model";

const industries = [
  "Advertising",
  "Media & Marketing",
  "Health tech",
  "Education",
  "Web Infotech",
];

const location = ["banglore", "Chennai", "Cochin", "Goa"];

interface ModalState {
  show: boolean;
  title: string;
  content: string;
  isSuggestion?: boolean;
  isDocument?: boolean;
  isEditProfile?: boolean;
}

const ManageInvestorsPremiumUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [modal, setModal] = useState<ModalState>({
    show: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      const selectedInvestor = investorsData.find(
        (b: { id: string | string[] }) => b.id === id
      );
      setInvestor(selectedInvestor || null);
    }
  }, [id]);

  const handleEditProfile = () => {
    setModal({
      show: true,
      title: "Edit Profile",
      content: "",
      isEditProfile: true,
    });
  };

  const handleRemovePremium = () => {
    //Implement hide account functionality here
  };

  const handleWarnUser = () => {
    setModal({
      show: true,
      title: "Warn User",
      content: "The User has been Warned.",
    });
  };
  const handleHideAccount = () => {
    // Implement hide account functionality here
  };

  const handleBanAccount = () => {
    setModal({
      show: true,
      title: "Ban Account",
      content: "The account has been banned.",
    });
  };

  const closeModal = () => {
    setModal({ show: false, title: "", content: "" });
  };

  const handleProfileUpdate = (updatedInvestor: Investor) => {
    setInvestor(updatedInvestor);
    closeModal();
  };

  if (!investor) {
    return <div>Loading...</div>;
  }

  return (
    <section className="sm:flex">
      <div className="bg-[#003034] border border-[#EAD514] rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-4 col-span-2 sm:w-3/4">
        <div className="flex flex-col space-y-2 text-white">
          <div className="flex justify-between">
            <p className="text-[#EAD514] font-bold text-[24px]">
              Investor at Media Production , Digital <br /> Marketing based on
              Kolkata, West Bengal
            </p>
            <p className="rounded-full p-2 m-auto font-bold tracking-wider bg-[#EAD514]">
              Premium
            </p>
          </div>
          <h4 className="text-md font-semibold">
            Email:
            <span className="text-md text-gray-400 font-thin ml-2">
              Available only after Connect
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Phone No:
            <span className="text-md text-gray-400 font-thin ml-2">
              Available Only after connect
            </span>
          </h4>
          <h4 className="text-md font-semibold">Professional Bio:</h4>
          <p className="text-md text-gray-400 font-thin">
            With [number] years of experience navigating the dynamic landscape
            of media and advertising, I boast a{" "}
            <br className="sm:block hidden" /> proven track record of
            identifying disruptive trends, nurturing innovative ventures, and
            driving exceptional <br className="sm:block hidden" /> returns for
            investors. My passion for storytelling and keen understanding of
            consumer behavior have fueled
            <br className="sm:block hidden" />
            successful investments in a diverse portfolio of top companies
            across the media spectrum.
          </p>
          <h4 className="text-md font-semibold">Industry Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {industries.map((industry) => (
              <p
                key={industry}
                className="bg-[#C3EC6C] text-black px-4 py-2 rounded-full text-center"
              >
                {industry}
              </p>
            ))}
          </div>
          <h4 className="text-md font-semibold">Location Interests:</h4>
          <div className="grid grid-cols-2 gap-2 sm:flex space-x-2">
            {location.map((place, index) => (
              <p
                key={index}
                className="bg-[#C3EC6C] text-black px-4 py-2 rounded-full text-center"
              >
                {place}
              </p>
            ))}
          </div>
          <h4 className="text-md font-semibold">Investment Range:</h4>
          <p className="text-md text-[24px] ml-2">10L to 5 Cr</p>
          <h4 className="text-md font-semibold">Recent Activity</h4>
          <div className="flex  flex-col space-y-4">
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#C3EC6C] rounded-full mr-4" />
              <p>Connected with Two Businesses</p>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#C3EC6C] rounded-full mr-4" />
              <div>
                <p>Received 10 Proposals</p>
                <p className="sm:block hidden text-md text-gray-400 font-thin">
                  From Two startup - in Healthtech and Edtech
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#C3EC6C] rounded-full mr-4" />
              <div>
                <p>Earlier than 7 days </p>
                <p className="sm:block hidden text-md text-gray-400 font-thin">
                  Received 8 proposals from - Edtech, health tech, manufacture,
                  Hotel Chain, Medical
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="w-10 h-10 bg-[#C3EC6C] rounded-full mr-4" />
              <div>
                <p>Earlier than 14 days </p>
                <p className="sm:block hidden text-md text-gray-400 font-thin">
                  Received 3 proposals from - Edtech, health tech, manufacture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#003034] text-center rounded-xl text-white p-4 m-4 sm:w-1/4 self-start">
        <div className="mb-2">
          <button
            onClick={handleEditProfile}
            className="bg-[#001F22] text-[#C3EC6C] w-full text-[14px] rounded-full py-3 px-8"
          >
            Edit Profile
          </button>
        </div>
        <div className="mb-2">
          <button
            onClick={handleBanAccount}
            className="bg-[#FFDCE5] text-[#EC183E] w-full text-[14px] rounded-full py-3 px-8"
          >
            Ban Account
          </button>
        </div>
        <div className="">
          <button
            onClick={handleRemovePremium}
            className="bg-[#001F22] text-[#EAD514] w-full text-[14px] rounded-full py-3 px-8"
          >
            Remove from Premium
          </button>
        </div>
        <div className="">
          <button
            onClick={handleWarnUser}
            className="text-[#EAD514] w-full text-[14px] rounded-full py-3 px-8"
          >
            Warn user
          </button>
        </div>
        <div className="">
          <button
            onClick={handleHideAccount}
            className="text-[#EAD514] border border-[#EAD514] w-full text-[14px] rounded-full py-3 px-8"
          >
            Hide Account
          </button>
        </div>
      </div>

      <Modal
        show={modal.show}
        title={modal.title}
        content={modal.content}
        onClose={closeModal}
        isEditProfile={modal.isEditProfile}
        investor={investor}
        onSave={handleProfileUpdate}
      />
    </section>
  );
};

export default ManageInvestorsPremiumUser;
