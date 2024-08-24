import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useTheme } from "@/context/ThemeContext";

interface FileInputState {
  businessImage: File | null;
  businessDocuments: File | null;
  proofOfBusiness: File | null;
}

export default function BusinessDocumentForm() {
  const [fileInputState, setFileInputState] = useState<FileInputState>({
    businessImage: null,
    businessDocuments: null,
    proofOfBusiness: null,
  });
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from context

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: keyof FileInputState
  ) => {
    if (event.target.files?.length) {
      setFileInputState((prevState) => ({
        ...prevState,
        [type]: event.target.files?.[0],
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(fileInputState);
    // Process the form data here
    // Navigate to the littleMoreAboutBusiness.tsx

    router.push("/auth/business/interests");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-2">Documents & Proof</h1>
      <p className="text-sm text-gray-400 text-center">
        Create an account to connect, network and raise funds for your startup
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <FileUploadBox
          label="Upload Your Business Image"
          onFileChange={(e) => handleFileChange(e, "businessImage")}
        />
        <FileUploadBox
          label="Add your Business Documents"
          onFileChange={(e) => handleFileChange(e, "businessDocuments")}
        />
        <FileUploadBox
          label="Add Proof of Business"
          onFileChange={(e) => handleFileChange(e, "proofOfBusiness")}
        />
        <div className="flex justify-end mt-6">
          <PrimaryButton
            type="submit"
            title="Next"
            backgroundStyle={`capitalize text-[15px] ${
              theme === "dark"
                ? "bg-[#A4E320] text-[#00171A]"
                : "bg-[#248E38] text-white"
            }`}
          />
        </div>
      </form>
    </div>
  );
}

interface FileUploadBoxProps {
  label: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  label,
  onFileChange,
}) => {
  const { theme } = useTheme(); // Use the theme from context

  return (
    <label className="block mt-4">
      <span className="mb-2 block">{label}</span>
      <input
        type="file"
        required
        onChange={onFileChange}
        className={`w-full mt-2 p-3 ${
          theme === "dark"
            ? "bg-[#003034] text-white"
            : "bg-gray-100 text-black"
        } rounded border border-dashed ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
          theme === "dark" ? "file:bg-[#A4E320]" : "file:bg-gray-300"
        }`}
      />
    </label>
  );
};
