import React, { useEffect, useState } from "react";
import Image from "next/image";
import PehlaStakeDark from "@/public/PehlaStakeDark.svg";
import PehlaStakeLight from "@/public/PehlaStakeLight.svg";
import { Manrope } from "next/font/google";
import {
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  Drawer,
  Card,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";
import { FiMoon, FiSun } from "react-icons/fi";

const manrope = Manrope({
  weight: "400",
  subsets: ["latin"],
});

const navListMenuItems = [
  {
    title: "About Us",
    path: "/about-us",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const navbarList = [
  {
    id: 1,
    title: "Businesses",
    path: "business",
  },
  {
    id: 2,
    title: "Franchises",
    path: "franchise",
  },
  {
    id: 3,
    title: "Investors",
    path: "investor",
  },
  {
    id: 4,
    title: "How it works",
    path: "HowItWorks",
  },
  {
    id: 5,
    title: "Company",
    path: "company",
  },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { isAuthenticating } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isDrawerOpen]);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    closeDrawer();
  };

  const navRenderedItems = navListMenuItems.map((item, index) => (
    <ListItem
      key={index}
      placeholder=""
      className={`hover:bg-${
        theme === "dark" ? "[#103B3E]" : "[#D3D3D3]"
      } hover:text-${theme === "dark" ? "white" : "black"} rounded-xl ml-4`}
      onClick={() => handleMenuItemClick(item.path)}
    >
      <Typography
        as="span"
        placeholder=""
        className={`text-${theme === "dark" ? "white" : "black"} mr-auto pl-2 ${
          manrope.className
        }`}
      >
        {item.title}
      </Typography>
    </ListItem>
  ));

  const renderedItem = navbarList.map((item, index) => (
    <div key={index}>
      {item.id !== 5 ? (
        <ListItem
          placeholder=""
          className={`p-0 hover:bg-${
            theme === "dark" ? "[#103B3E]" : "[#D3D3D3]"
          } hover:text-${theme === "dark" ? "white" : "black"}`}
          onClick={() => handleMenuItemClick(item.path)}
        >
          <Typography
            as="span"
            placeholder=""
            className={`text-${
              theme === "dark" ? "white" : "black"
            } text-[16px] mr-auto font-normal ${manrope.className} p-2`}
          >
            {item.title}
          </Typography>
        </ListItem>
      ) : (
        <Accordion
          placeholder=""
          open={open === item.id}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === item.id ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem
            placeholder=""
            className={`p-0 hover:bg-${
              theme === "dark" ? "[#103B3E]" : "[#D3D3D3]"
            } hover:text-${theme === "dark" ? "white" : "black"}`}
            selected={open === item.id}
            onClick={() => handleOpen(item.id)}
          >
            <AccordionHeader placeholder="" className="border-b-0 p-2">
              <Typography
                as="span"
                placeholder=""
                className={`text-${
                  theme === "dark" ? "white" : "black"
                } text-[16px] mr-auto font-normal ${manrope.className}`}
              >
                {item.title}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List placeholder="" className="p-0">
              {navRenderedItems}
            </List>
          </AccordionBody>
        </Accordion>
      )}
    </div>
  ));

  return (
    <>
      <Typography
        as="div"
        placeholder=""
        className={`flex flex-row-reverse justify-between font-manrope sticky top-0 max-w-none px-4 py-2 border-none shadow-none rounded-none backdrop-blur-none bg-white dark:bg-[#00171A] bg-opacity-100 z-10 bg-${
          theme === "dark" ? "[#003034]" : "[#FFFFFF]"
        }`}
      >
        <div className="m-auto">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            placeholder={undefined}
          >
            <Image
              src={theme === "dark" ? PehlaStakeLight : PehlaStakeDark}
              alt="PehlaStake"
              width={150}
              height={50}
            />
          </Typography>
        </div>
        <div onClick={openDrawer} className="">
          {isDrawerOpen ? (
            <XMarkIcon className=" p-2 h-8 w-8 stroke-2 bg-[#B8FF22] rounded-full" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2 bg-[#B8FF22] rounded-full p-1" />
          )}
        </div>
      </Typography>

      <Drawer
        placeholder=""
        open={isDrawerOpen}
        onClose={closeDrawer}
        className={`bg-${
          theme === "dark" ? "[#00171A]" : "[#FFFFFF]"
        } h-full rounded-md w-4/5`}
      >
        <Card
          placeholder=""
          shadow={false}
          style={{
            maxHeight: "100vh",
            overflowY: "scroll",
          }}
          className="mr-2 w-full bg-transparent p-4 rounded-md"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography placeholder="">
              <Image
                src={theme === "dark" ? PehlaStakeLight : PehlaStakeDark}
                alt="PehlaStake"
                width={150}
                height={50}
              />
            </Typography>
          </div>
          <List placeholder="">{renderedItem}</List>
          <div className="flex flex-col justify-end mt-52">
            <div className="flex flex-col py-4 gap-4" onClick={closeDrawer}>
              <Link href="/auth/signin">
                <PrimaryButton
                  title="Login"
                  backgroundStyle="bg-transparent capitalize border-none shadow-none font-medium text-[14px]"
                />
              </Link>
              {!isAuthenticating && (
                <Link href="/auth/signup">
                  <PrimaryButton
                    title="Create an Account"
                    backgroundStyle={`bg-${
                      theme === "dark" ? "[#B8FF22]" : "[#248E38]"
                    } border-none shadow-none text-${
                      theme === "dark" ? "[#103B3E]" : "[#ffffff]"
                    } capitalize font-thin text-[14px]`}
                  />
                </Link>
              )}
              <button
                onClick={toggleTheme}
                className="text-[#00171A] m-auto dark:text-white text-right border p-2 rounded-full"
              >
                {theme === "dark" ? (
                  <FiSun size={24} className="text-yellow-500" /> // Sunlight icon for dark mode
                ) : (
                  <FiMoon size={24} className="text-blue-500" /> // Night icon for light mode
                )}
              </button>
            </div>
          </div>
        </Card>
      </Drawer>
    </>
  );
}
