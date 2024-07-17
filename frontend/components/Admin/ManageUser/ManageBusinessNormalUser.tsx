import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Progress } from "@material-tailwind/react";
import { Business } from "@/types";
import { businessesData } from "@/constants";
import Modal from "@/components/Admin/Model";

interface ModalState {
  show: boolean;
  title: string;
  content: string;
  isSuggestion?: boolean;
  isDocument?: boolean;
  isEditProfile?: boolean;
}

const ManageBusinessNormalUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [business, setBusiness] = useState<Business | null>(null);
  const [modal, setModal] = useState<ModalState>({
    show: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    if (id) {
      const selectedBusiness = businessesData.find(
        (b: { id: string | string[] }) => b.id === id
      );
      setBusiness(selectedBusiness || null);
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

  const handleWarnUser = () => {
    setModal({
      show: true,
      title: "Warn User",
      content: "The user has been warned.",
    });
  };

  const handleHideAccount = () => {
    setModal({
      show: true,
      title: "Hide Account",
      content: "The account has been hidden.",
    });
  };

  const handleBanAccount = () => {
    setModal({
      show: true,
      title: "Ban Account",
      content: "The account has been banned.",
    });
  };

  const handleViewDocument = () => {
    setModal({
      show: true,
      title: "View Document",
      content:
        "This is a dummy document content. Replace it with your actual document or PDF viewer.",
      isDocument: true,
    });
  };

  const handleProfileUpdate = (updatedBusiness: Business) => {
    setBusiness(updatedBusiness);
    closeModal();
  };

  const closeModal = () => {
    setModal({
      show: false,
      title: "",
      content: "",
      isEditProfile: false,
      isSuggestion: false,
      isDocument: false,
    });
  };

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <section className="sm:flex">
      <div className="bg-[#003034] border border-white rounded-xl py-4 sm:py-10 px-4 sm:px-10 m-4 col-span-2 sm:w-3/4">
        <div className="flex flex-col space-y-2 text-white">
          <p className="text-white font-bold text-[24px]">
            {business.name} in {business.location}{" "}
            <br className="sm:block hidden" /> looking for Investment at{" "}
            {business.location}
          </p>
          <div className="border border-gray-400 rounded-xl py-4 px-4 space-y-2">
            <div className="flex justify-between">
              <h1 className="text-md">Investment Range</h1>
              <p className="text-white">
                Required amount :{" "}
                <span className="text-[#EAD514]">
                  ₹{business.investmentRequired}
                </span>
              </p>
            </div>
            <div>
              <Progress
                className="border-none bg-[#A4E320]"
                value={25}
                size="lg"
                color="green"
                placeholder={undefined}
              />
            </div>
            <p className="text-[#A4E320]">
              ₹ 30 L ( 30%)
              <span className="text-white"> raised</span>
            </p>
          </div>
          <h4 className="text-md font-semibold">
            Established Year:
            <span className="text-md text-gray-400 font-thin ml-2">
              {business.establishmentYear}
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Industry :
            <span className="text-md text-gray-400 font-thin ml-2">
              {business.industry}
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            District:
            <span className="text-md text-gray-400 font-thin ml-2">
              {business.location}
            </span>
          </h4>
          <h4 className="text-md font-semibold">
            Type of Business :
            <span className="text-md text-gray-400 font-thin ml-2">
              {business.type}
            </span>
          </h4>
          <h4 className="text-md font-semibold">Product and Services:</h4>
          <p className="text-md text-gray-400 font-thin">
            With [number] years of experience navigating the dynamic landscape
            of media and advertising, I boast a proven track record of
            identifying disruptive trends, nurturing innovative ventures, and
            driving exceptional returns for investors. My passion for
            storytelling and keen understanding of consumer behavior have fueled
            successful investments in a diverse portfolio of top companies
            across the media spectrum.
          </p>
          <h4 className="text-md font-semibold">Business Short Bio :</h4>
          <p className="text-md text-gray-400 font-thin">
            With [number] years of experience navigating the dynamic landscape
            of media and advertising, I boast a proven track record of
            identifying disruptive trends, nurturing innovative ventures, and
            driving exceptional returns for investors. My passion for
            storytelling and keen understanding of consumer behavior have fueled
            successful investments in a diverse portfolio of top companies
            across the media spectrum.
          </p>
          <h4 className="text-md font-semibold">Facility Info :</h4>
          <p className="text-md text-gray-400 font-thin">
            With [number] years of experience navigating the dynamic landscape
            of media and advertising, I boast a proven track record of
            identifying disruptive trends, nurturing innovative ventures, and
            driving exceptional returns for investors. My passion for
            storytelling and keen understanding of consumer behavior have fueled
            successful investments in a diverse portfolio of top companies
            across the media spectrum.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4">
              <h1>Current Monthly Sales :</h1>
              <p className="text-[#A4E320]">₹ 3,11,79,272.00 Rs</p>
            </div>
            <div className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4">
              <h1>Current Monthly Sales :</h1>
              <p className="text-[#A4E320]">₹ 3,11,79,272.00 Rs</p>
            </div>
            <div className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4">
              <h1>Current Monthly Sales :</h1>
              <p className="text-[#A4E320]">₹ 3,11,79,272.00 Rs</p>
            </div>
            <div className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4">
              <h1>Current Monthly Sales :</h1>
              <p className="text-[#A4E320]">₹ 3,11,79,272.00 Rs</p>
            </div>
            <div className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4">
              <h1>Current Monthly Sales :</h1>
              <p className="text-[#A4E320]">₹ 3,11,79,272.00 Rs</p>
            </div>
            <div className="text-white text-md border border-[#A4E320] py-5 px-5 rounded-xl space-y-4">
              <h1>Current Monthly Sales :</h1>
              <p className="text-[#A4E320]">₹ 3,11,79,272.00 Rs</p>
            </div>
          </div>
          <h4 className="text-md font-semibold">Assets Info:</h4>
          <p className="text-md text-gray-400 font-thin">
            With [number] years of experience navigating the dynamic landscape
            of media and advertising, I boast a proven track record of
            identifying disruptive trends, nurturing innovative ventures, and
            driving exceptional returns for investors. My passion for
            storytelling and keen understanding of consumer behavior have fueled
            successful investments in a diverse portfolio of top companies
            across the media spectrum.
          </p>
          <div className="flex items-center space-x-2">
            <h4 className="text-md font-semibold">Type of Investor:</h4>
            <p className="p-2 rounded-full bg-[#001719] justify-start">
              Multiple
            </p>
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
        business={business}
        onSave={handleProfileUpdate}
      />
    </section>
  );
};

export default ManageBusinessNormalUser;
