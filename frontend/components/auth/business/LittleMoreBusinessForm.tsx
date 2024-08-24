import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { setDataToLocalStorage } from "@/utils/functions";
import { useTheme } from "@/context/ThemeContext"; // Import ThemeContext

export default function LittleMoreBusinessForm() {
  const router = useRouter();
  const { theme } = useTheme(); // Use the theme from context
  const [formData, setFormData] = useState({
    productInfo: "",
    businessInfo: "",
    facilityInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setDataToLocalStorage("businessDetails2", JSON.stringify(formData));
    router.push("/auth/business/finance"); // Replace '/nextPage' with the actual route you wish to navigate to
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`max-w-2xl w-full space-y-8 ${
          theme === "dark" ? "bg-[#00171A]" : "bg-white"
        } rounded-lg p-8 shadow-lg`}
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">
            A little more About your Business
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create an account to connect, network and raise funds for your
            startup
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-lg">
            <div className="my-3">
              <label htmlFor="productInfo" className="text-[16px]">
                Your Product & Services Info
                <textarea
                  id="productInfo"
                  required
                  name="productInfo"
                  rows={4}
                  className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 placeholder-gray-800 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B]"
                      : "bg-white text-black border-gray-300"
                  }`}
                  placeholder="Write a brief about your product or Services"
                  onChange={handleChange}
                  value={formData.productInfo}
                />
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="businessInfo" className="text-[16px]">
                Write Briefly About Your Businesses
                <textarea
                  id="businessInfo"
                  required
                  name="businessInfo"
                  rows={4}
                  className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 placeholder-gray-800 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B]"
                      : "bg-white text-black border-gray-300"
                  }`}
                  placeholder="Write Briefly About Your Businesses"
                  onChange={handleChange}
                  value={formData.businessInfo}
                />
              </label>
            </div>
            <div className="my-3">
              <label htmlFor="facilityInfo" className="text-[16px]">
                Write About Your Facility Info
                <textarea
                  id="facilityInfo"
                  required
                  name="facilityInfo"
                  rows={4}
                  className={`w-full p-3 rounded-md border outline-none text-[14px] mt-2 placeholder-gray-800 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-[#3B3B3B]"
                      : "bg-white text-black border-gray-300"
                  }`}
                  placeholder="Write About Your Facility Info"
                  onChange={handleChange}
                  value={formData.facilityInfo}
                />
              </label>
            </div>
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
    </div>
  );
}
