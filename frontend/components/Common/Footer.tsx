import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import { Manrope } from "next/font/google";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import router from "next/router";
import Link from "next/link";

const manrope = Manrope({
  weight: "400",
  subsets: ["latin"],
});

const LINKS = [
  {
    title: "Services",
    items: [
      { name: "Businesses", path: "/business" },
      { name: "Investors", path: "/investor" },
      { name: "Franchise", path: "/franchise" },
    ],
  },
  {
    title: "Info",
    items: [
      { name: "About us", path: "/about-us" },
      { name: "Blogs", path: "/blog" },
      { name: "Contacts", path: "/contact-us" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  const handlePrivacyAndPolicy = () => {
    if (router.pathname.startsWith("/Admin")) {
      router.push("/Admin/privacy-policy");
    } else if (router.pathname.startsWith("/Businesses")) {
      router.push("/Businesses/privacy-policy");
    } else if (router.pathname.startsWith("/Investors")) {
      router.push("/Investors/privacy-policy");
    } else {
      router.push("/privacy-policy");
    }
  };

  return (
    <footer className="relative w-full bg-[#00171A] border-t border-[#103B3E] pt-4">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid md:grid-cols-2 md:justify-between gap-4">
          <div className="">
            <Image
              src={"/PehlaStakeLight.svg"}
              alt="PehlaStake Logo"
              width={150}
              height={100}
            />
            <Typography
              placeholder=""
              variant="small"
              className={`pt-8 text-[13px] font-manrope sm:text-[15px] text-[#A4E320] ${manrope.className}`}
            >
              23/1243, Chulliparambil, Papli Road, Veegaland{" "}
              <br className="hidden sm:block" /> Greenclouds Apartments,
              Padamughal, Kochi, Ernakulam, <br className="hidden sm:block" />{" "}
              Kerela, 682042
            </Typography>
            <div className="flex">
              <a
                className="border rounded-full p-1 m-1"
                href="https://www.linkedin.com/company/pehlastake/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={25} className="m-1 text-white" />
              </a>
              <a
                className="border rounded-full p-1 m-1"
                href="https://x.com/PehlaStake?t=DEjjYm9b8ofgtD9IPgvFCA&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={25} className="m-1 text-white" />
              </a>
              <a
                className="border rounded-full p-1 m-1"
                href="https://youtube.com/@pehlastake?si=45RTZcvZCqvTKrl4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={25} className="m-1 text-white" />
              </a>
              <a
                className="border rounded-full p-1 m-1"
                href="https://www.instagram.com/pehla_stake?igsh=am05Ymk2bmFlYmpx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={25} className="m-1 text-white" />
              </a>
              <a
                className="border rounded-full p-1 m-1"
                href="https://www.threads.net/@pehla_stake"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiThreads size={25} className="m-1 text-white" />
              </a>
            </div>

            <div className="font-manrope flex text-[#cccccc] text-[13px] sm:text-[15px]">
              <p className="pt-2 pr-8 sm:pt-8">+1 891 989-11-91</p>
              <p className="pt-2 pl-8 sm:pt-8">info@logoipsum.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  placeholder=""
                  variant="small"
                  color="blue-gray"
                  className={`mb-4 font-medium font-manrope text-[#8e8e8e] ${manrope.className}`}
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link.name}>
                    <Link href={link.path}>
                      <Typography
                        placeholder=""
                        as="span"
                        color="white"
                        className={`py-1.5 font-manrope font-normal text-[13px] sm:text-[15px] transition-colors hover:text-[#cccccc] ${manrope.className}`}
                      >
                        {link.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-center py-4 md:flex-row md:justify-between">
          <div className="mt-8 text-gray-600 flex gap-2 mb-8">
            <p>Developed by</p>
            <span>
              <a target="_blank" href="https://www.pentadots.com">
                <Image
                  src="/PentadotsIcon.svg"
                  alt="Pentadots"
                  width={100}
                  height={50}
                />
              </a>
            </span>
          </div>
          <button
            onClick={handlePrivacyAndPolicy}
            className="text-white underline text-[14px]"
          >
            Privacy and Policy
          </button>
          <Typography
            placeholder=""
            variant="small"
            className={`text-center font-manrope font-normal mb-4 md:mb-0 text-[13px] sm:text-[15px] text-[#A4E320] ${manrope.className}`}
          >
            © {currentYear} — Copyright
          </Typography>
        </div>
      </div>
    </footer>
  );
}
