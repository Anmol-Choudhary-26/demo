import React, { useState } from "react";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { createInvestor } from "@/hooks/useInvestor";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext

export default function InvestorDocumentForm() {
  const [corporateFile, setCorporateFile] = useState<File | null>(null);
  const [bankStatementFile, setBankStatementFile] = useState<File | null>(null);
  const { theme } = useTheme(); // Use the theme from the context
  const router = useRouter();

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setter(event.target.files[0]);
      }
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Files ready to be uploaded:", {
      corporateFile,
      bankStatementFile,
    });

    // Here you would typically handle the form submission, e.g., uploading files to the server
    const data = await createInvestor(corporateFile, bankStatementFile);
    console.log("this is an investor", data);
    router.push("/auth/investor/interests");
  };

  return (
    <section
      className={`flex justify-center items-center min-h-screen p-4 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-lg shadow-lg space-y-6 ${
            theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
            Investor Document
          </h1>
          <p className="text-[16px] text-gray-400 text-center mb-6">
            Documents helps us verify and Approve your profile faster
          </p>

          <div className="flex justify-center text-center flex-col mb-4">
            <label htmlFor="corporate-profile" className="mb-2">
              Upload your Corporate Profile & Terms of Engagement
            </label>
            <input
              id="corporate-profile"
              type="file"
              onChange={handleFileChange(setCorporateFile)}
              className={`cursor-pointer text-sm border-dashed border py-8 px-4 ${
                theme === "dark"
                  ? "border-gray-500 text-gray-300 bg-[#003034]"
                  : "border-gray-300 text-gray-500"
              } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
                theme === "dark"
                  ? "file:bg-[#A4E320] file:text-[#00171A]"
                  : "file:bg-gray-400"
              }`}
            />
          </div>

          <div className="flex flex-col text-center mb-6">
            <label htmlFor="bank-statement" className="mb-2">
              Upload Your Proof of Bank Statement
            </label>
            <input
              id="bank-statement"
              type="file"
              onChange={handleFileChange(setBankStatementFile)}
              className={`cursor-pointer text-sm border-dashed border py-8 px-4 ${
                theme === "dark"
                  ? "border-gray-500 text-gray-300 bg-[#003034]"
                  : "border-gray-300 text-gray-500"
              } file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
                theme === "dark"
                  ? "file:bg-[#A4E320] file:text-[#00171A]"
                  : "file:bg-gray-400"
              }`}
            />
          </div>

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
    </section>
  );
}
