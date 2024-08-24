import React, { useState } from "react";
import PrimaryButton from "@/components/Common/PrimaryButton";
import { useRouter } from "next/router";
import { useTheme } from "@/context/ThemeContext";

// Define the FormData type here or import it if defined elsewhere
interface FormData {
  bio: string;
  address: string;
  idCard: File | null;
}

export default function PersonalDetailsForm() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    bio: "",
    address: "",
    idCard: null,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({
      ...prevState,
      idCard: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Process form submission here
    console.log(formData);
    // await updateUser(formData);
    localStorage.setItem("personalDetails", JSON.stringify(formData))
    router.push("/auth/select-role");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 text-white md:flex-row md:p-8 ${
        theme === "dark" ? "bg-[#00171A] text-white" : "bg-white text-black"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-xl p-6 rounded-lg shadow-md md:p-8 ${
          theme === "dark"
            ? "bg-[#001F22] text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Add Your Personal Details
        </h2>
        <p className="mb-6 text-sm tracking-wider">
          Create an account to connect, network and raise funds for your startup
        </p>

        <label className="block mb-4">
          Short Bio
          <textarea
            name="bio"
            required
            placeholder="Add a brief note here"
            value={formData.bio}
            onChange={handleChange}
            className={`w-full mt-2 p-3 rounded border ${
              theme === "dark"
                ? "bg-[#00171A] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          />
        </label>

        <label className="block mb-4">
          Enter your Address
          <input
            type="text"
            name="address"
            required
            placeholder="Enter your address here"
            value={formData.address}
            onChange={handleChange}
            className={`w-full mt-2 p-3 rounded border ${
              theme === "dark"
                ? "bg-[#00171A] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          />
        </label>

        <label className="block mb-4">
          Add your ID Card
          <input
            type="file"
            name="idCard"
            required
            onChange={handleFileChange}
            className={`w-full mt-2 p-3 rounded border-dashed border file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold ${
              theme === "dark"
                ? "bg-[#00171A] border-gray-700 file:bg-[#A4E320] file:text-[#00171A]"
                : "bg-white border-gray-300"
            }`}
          />
        </label>

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
