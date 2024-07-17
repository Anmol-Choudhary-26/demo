import PrimaryButton from "./Common/PrimaryButton";
import Image from "next/image";
import TeamCard from "./Common/TeamCard";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AboutUs() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle the form submission here
    console.log(formData);
  };

  return (
    <section className="w-full pt-4 font-manrope">
      <div className="pb-10">
        <p
          className={`flex justify-center text-center pt-10 ${
            theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
          }`}
        >
          About Biwi
        </p>
        <div className="flex flex-col justify-center text-center gap-[24px]">
          <p
            className={`text-6xl font-bold ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Welcome to Biwi - Where Investor <br /> & Businesses can Connect
          </p>
          <p
            className={`text-[13px] sm:text-[15px] font-light px-2 ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Unlock endless possibilities for your business or investment
            journey. Join a <br className="hidden sm:block" />
            thriving community where opportunities meet expertise.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 py-10 mx-4">
        <Image src="/cardImage.svg" alt="AboutUs" width={250} height={100} />
        <Image src="/cardImage.svg" alt="AboutUs" width={250} height={100} />
        <Image src="/cardImage.svg" alt="AboutUs" width={250} height={100} />
        <Image src="/cardImage.svg" alt="AboutUs" width={250} height={100} />
        <Image src="/cardImage.svg" alt="AboutUs" width={250} height={100} />
      </div>

      <div className="pt-10 mx-4 sm:mx-10 text-center">
        <p
          className={`text-5xl font-bold ${
            theme === "dark" ? "text-white" : "text-[#00171A]"
          }`}
        >
          <span
            className={`${
              theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
            }`}
          >
            Our Story:
          </span>{" "}
          Bridging the Gap <br className="hidden sm:block" />
          Between Investor and Businesses...
        </p>
        <div
          className={`text-[13px] sm:text-[15px] font-light px-2 py-10 tracking-wider ${
            theme === "dark" ? "text-white" : "text-[#00171A]"
          }`}
        >
          <p>
            The year was 2020. The world was facing unprecedented challenges,
            but <br className="hidden sm:block" /> innovation refused to be
            stifled. In that climate of disruption, we saw a spark.
          </p>
          <p className="py-8">
            We witnessed brilliant businesses brimming with potential, ready to
            change <br className="hidden sm:block" /> the world. Yet, finding
            the right investors, securing the resources they needed,{" "}
            <br className="hidden sm:block" /> felt like deciphering a complex
            labyrinth. On the other side, investors yearned{" "}
            <br className="hidden sm:block" /> for access to disruptive ideas,
            game-changing companies that could redefine{" "}
            <br className="hidden sm:block" /> industries. But navigating the
            vast startup landscape proved equally daunting.
          </p>
          <p>
            Driven by the belief that every promising dream deserves a stage,
            and every <br className="hidden sm:block" /> game-changer deserves
            the right backing, we founded (Your Startup Name).{" "}
            <br className="hidden sm:block" /> Our mission: to be the missing
            bridge, the connector between ambitious{" "}
            <br className="hidden sm:block" /> businesses and visionary
            investors.
          </p>
          <p className="py-8">
            The past few years have been a whirlwind of growth and milestones.
            We&apos;ve <br className="hidden sm:block" /> facilitated millions
            in funding, seen countless businesses flourish under the{" "}
            <br className="hidden sm:block" /> right guidance, and witnessed
            moments of innovation that leave us awestruck.{" "}
            <br className="hidden sm:block" /> Every success story, every
            partnership forged, fuels our passion. It&apos;s a{" "}
            <br className="hidden sm:block" /> testament to the power of
            connection, the magic that happens when potential{" "}
            <br className="hidden sm:block" /> meets opportunity.
          </p>
        </div>
      </div>
      <div className="py-10 mx-4 sm:mx-10 text-center">
        <p
          className={`text-5xl font-bold py-10 ${
            theme === "dark" ? "text-white" : "text-[#00171A]"
          }`}
        >
          Our Team
        </p>
        <div className="">
          <TeamCard />
        </div>
      </div>
      <div
        className={`${
          theme === "dark" ? "text-white" : "text-[#00171A]"
        } my-10`}
      >
        <p className="text-5xl font-semibold mx-4 sm:mx-10">Join Our Team</p>
        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12 ">
          <div
            className={`p-8 rounded-lg w-full lg:w-1/2 ${
              theme === "dark"
                ? "bg-[#000808] bg-opacity-40"
                : "bg-[#e0e0e0] bg-opacity-40"
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
                      : "bg-white text-black border-gray-300"
                  }`}
                />
              </label>

              <label className="flex flex-col gap-2">
                Enter email
                <input
                  type="email"
                  name="email"
                  placeholder="Add Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`p-3 rounded border focus:ring-2 focus:ring-[#A4E320] focus:outline-none ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-gray-800"
                      : "bg-white text-black border-gray-300"
                  }`}
                />
              </label>

              <label className="flex flex-col gap-2">
                Phone Number of Business
                <div className="flex">
                  <span
                    className={`inline-flex items-center px-3 rounded-l border border-r-0 ${
                      theme === "dark"
                        ? "bg-[#00171A] text-white border-gray-800"
                        : "bg-white text-black border-gray-300"
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
                        : "bg-white text-black border-gray-300"
                    }`}
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                Position You looking For ?
                <input
                  type="text"
                  name="position"
                  placeholder="Position You Looking For?"
                  value={formData.position}
                  onChange={handleChange}
                  className={`p-3 rounded border focus:ring-2 focus:ring-[#A4E320] focus:outline-none ${
                    theme === "dark"
                      ? "bg-[#00171A] text-white border-gray-800"
                      : "bg-white text-black border-gray-300"
                  }`}
                />
              </label>
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#248E38] dark:bg-[#A4E320] text-[#ffffff] dark:text-[#103B3E] rounded-full focus:outline-none transition-colors"
                >
                  Submit Now
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full lg:w-1/2">
            <Image
              src="/AboutUsjoin.svg"
              alt="Team Member"
              width={400}
              height={200}
              className="rounded-lg transform hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
