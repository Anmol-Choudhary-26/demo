import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function KeyPoints() {
  const { theme } = useTheme();

  return (
    <section className="flex flex-row flex-wrap sm:justify-between px-4 gap-4 sm:px-10 py-10 sm:py-20">
      <div className="">
        <div className="flex items-center">
          <Image src={"/Targeted.svg"} alt="icon" width={40} height={40} />
          <h1
            className={`pl-2 text-lg font-semibold tracking-wider ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Targeted Connections
          </h1>
        </div>
        <p
          className={`pl-10 pt-2 text-[13px] sm:text-[15px] ${
            theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Find investors aligned with your <br className="hidden sm:block" />{" "}
          industry, stage, and vision.
        </p>
      </div>
      <div className="">
        <div className="flex items-center">
          <Image src={"/Streamlined.svg"} alt="icon" width={40} height={40} />
          <h1
            className={`pl-2 text-lg font-semibold tracking-wider ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Streamlined Fundraising
          </h1>
        </div>
        <p
          className={`pl-10 pt-2 text-[13px] sm:text-[15px] ${
            theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Build decks, get expert guidance, and{" "}
          <br className="hidden sm:block" /> track progress effortlessly.
        </p>
      </div>
      <div className="">
        <div className="flex items-center">
          <Image src={"/Empowered.svg"} alt="icon" width={40} height={40} />
          <h1
            className={`pl-2 text-lg font-semibold tracking-wider ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Empowered Community
          </h1>
        </div>
        <p
          className={`pl-10 pt-2 text-[13px] sm:text-[15px] ${
            theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
          }`}
        >
          Share experiences and learn from <br className="hidden sm:block" />{" "}
          fellow entrepreneurs.
        </p>
      </div>
    </section>
  );
}
