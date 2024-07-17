import { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function ContactUs() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Process form submission here
    console.log(formData);
  };

  return (
    <section
      className={`w-full pt-4 font-manrope ${
        theme === "dark" ? "text-white" : "text-[#00171A]"
      }`}
    >
      <div className="pb-10">
        <p
          className={`flex justify-center text-center pt-10 ${
            theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
          }`}
        >
          About Biwi
        </p>
        <div className="flex flex-col justify-center text-center gap-[24px]">
          <p className="text-6xl font-bold">We would like to hear from You</p>
          <p
            className={`text-[13px] sm:text-[15px] font-light px-2 ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            We&apos;re always excited to hear from people interested in what we
            do. Whether you have a <br className="hidden sm:block" /> burning
            question, a brilliant idea, or just want to say hi, we&apos;re here
            to listen.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12">
        <div
          className={`p-8 rounded-lg w-full lg:w-2/3 ${
            theme === "dark" ? "bg-[#001F22] bg-opacity-40" : "bg-[#f0f0f0]"
          }`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              Your Name
              <input
                type="text"
                name="name"
                placeholder="Add Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded border focus:ring-2 focus:ring-[#A4E320] focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-gray-800"
                    : "bg-white text-[#00171A] border-gray-300"
                }`}
              />
            </label>
            <label className="flex flex-col gap-2">
              Your Phone No
              <div className="flex">
                <span
                  className={`inline-flex items-center px-3 rounded-l border border-r-0 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-gray-800"
                      : "bg-white text-[#00171A] border-gray-300"
                  }`}
                >
                  +91 |
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`p-3 rounded-r border focus:ring-2 focus:ring-[#A4E320] focus:outline-none flex-1 ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-gray-800"
                      : "bg-white text-[#00171A] border-gray-300"
                  }`}
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              Your Email
              <input
                type="email"
                name="email"
                placeholder="Add Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded border focus:ring-2 focus:ring-[#A4E320] focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-gray-800"
                    : "bg-white text-[#00171A] border-gray-300"
                }`}
              />
            </label>

            <label className="flex flex-col gap-2">
              Your Company Name ( Optional )
              <input
                type="text"
                name="position"
                placeholder="Enter your name here"
                value={formData.position}
                onChange={handleChange}
                className={`p-3 rounded border focus:ring-2 focus:ring-[#A4E320] focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#00171A] text-white border-gray-800"
                    : "bg-white text-[#00171A] border-gray-300"
                }`}
              />
            </label>
            {/* Submit Button */}
            <div className="flex flex-row gap-4 justify-end">
              <button
                type="button"
                className={`focus:outline-none ${
                  theme === "dark" ? "text-white" : "text-[#00171A]"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-6 bg-[#248E38] dark:bg-[#A4E320] text-[#ffffff] dark:text-[#00171A] rounded-full focus:outline-none transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div
          className={`flex flex-col flex-wrap justify-center gap-8 w-full lg:w-1/3 py-14 px-10 rounded-lg ${
            theme === "dark"
              ? "bg-[#001F22] text-white"
              : "bg-[#f0f0f0] text-[#00171A]"
          }`}
        >
          <div className="">
            <p className="text-2xl font-semibold">Chat to Us</p>
            <p
              className={`text-[14px] sm:text-[16px] pb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Our friendly team is here to help you
            </p>
            <a
              href=""
              className="text-[#00171A] dark:text-[#A4E320] text-[14px] sm:text-[16px]"
            >
              bill.sanders@example.com
            </a>
          </div>
          <div className="">
            <p className="text-2xl font-semibold">Call to us</p>
            <p
              className={`text-[14px] sm:text-[16px] pb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Our friendly team is here to help you
            </p>
            <a
              href=""
              className="text-[#00171A] dark:text-[#A4E320] text-[14px] sm:text-[16px]"
            >
              +91 23456 78906
            </a>
          </div>
          <div className="">
            <p className="text-2xl font-semibold">Visit Our Office</p>
            <p
              className={`text-[14px] sm:text-[16px] pb-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Come Say Hello to our office
            </p>
            <a
              href=""
              className="text-[#00171A] dark:text-[#A4E320] text-[14px] sm:text-[16px]"
            >
              Eleven street 12, Chennai - Tamilnadu
            </a>
          </div>

          <div className="flex">
            <Image
              alt="facebook_icon"
              src={"/facebook.svg"}
              width={50}
              height={50}
              className="m-1"
            />
            <Image
              alt="facebook_icon"
              src={"/instagram.svg"}
              width={50}
              height={50}
              className="m-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
