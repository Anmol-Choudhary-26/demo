import Image from "next/image";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const teamMembers = [
  {
    name: "Vipin Rai",
    position: "Founder, CEO",
    image: "/Founder.jpeg",
    linkedin: "https://linkedin.com/in/vipinrai",
    twitter: "https://twitter.com/vipinrai",
  },
  {
    name: "John Doe",
    position: "Founder, CEO",
    image: "/Founder1.jpeg",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
];

export default function TeamCard() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap justify-center">
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className={`py-4 px-2 sm:px-6 m-4 border flex flex-col justify-center text-center items-center rounded-xl tracking-wide ${
            theme === "dark"
              ? "border-gray-800 text-white"
              : "border-gray-300 text-[#00171A]"
          }`}
        >
          <Image
            src={member.image}
            alt={member.name}
            width={150}
            height={150}
          />
          <p className="text-2xl sm:text-3xl font-medium py-4">{member.name}</p>
          <p className="text-[15px] sm:text-[17px] font-thin pb-2">
            {member.position}
          </p>
          <div className="pb-4 grid grid-cols-2 gap-4">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} />
            </a>
            <a href={member.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
