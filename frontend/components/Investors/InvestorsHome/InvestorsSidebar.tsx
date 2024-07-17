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
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/Common/PrimaryButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";
import { FiMoon, FiSun } from "react-icons/fi";
import { Url } from "next/dist/shared/lib/router/router";

const manrope = Manrope({
  weight: "400",
  subsets: ["latin"],
});

const navListMenuItems = [
  {
    title: "Blog",
    path: "/Investors/blog",
  },
];

const navbarList = [
  {
    id: 1,
    title: "Home",
    path: "homepage",
  },
  {
    id: 2,
    title: "Businesses",
    path: "search-for-businesses",
  },
  {
    id: 3,
    title: "Franchises",
    path: "search-for-franchise",
  },
  {
    id: 4,
    title: "Proposals",
    path: "proposals",
  },
  {
    id: 5,
    title: "Bookmarks",
    path: "bookmark",
  },
  {
    id: 6,
    title: "Q&A",
    path: "QandA",
  },
  {
    id: 7,
    title: "Company",
    path: "company",
  },
];

// const profileMenuItems = [
//   {
//     label: "My Profile",
//     icon: UserCircleIcon,
//   },
//   {
//     label: "Edit Profile",
//     icon: Cog6ToothIcon,
//   },
//   {
//     label: "Inbox",
//     icon: InboxArrowDownIcon,
//   },
//   {
//     label: "Help",
//     icon: LifebuoyIcon,
//   },
//   {
//     label: "Sign Out",
//     icon: PowerIcon,
//   },
// ];

export default function InvestorsSidebar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { isAuthenticating } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isDrawerOpen]);

  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleMenuItemClick = (path: Url) => {
    router.push(path);
    closeDrawer();
  };

  const navRenderedItems = navListMenuItems.map((item, index) => (
    <ListItem
      key={index}
      className={`hover:bg-${
        theme === "dark" ? "[#103B3E]" : "[#D3D3D3]"
      } hover:text-${theme === "dark" ? "white" : "black"} rounded-xl ml-4`}
      onClick={() => handleMenuItemClick(item.path)}
      placeholder={undefined}
    >
      <Typography
        as="span"
        className={`text-${theme === "dark" ? "white" : "black"} mr-auto pl-2 ${
          manrope.className
        }`}
        placeholder={undefined}
      >
        {item.title}
      </Typography>
    </ListItem>
  ));

  const renderedItem = navbarList.map((item, index) => (
    <div key={index}>
      {item && item.id !== 7 ? (
        <ListItem
          className={`p-0 hover:bg-${
            theme === "dark" ? "[#103B3E]" : "[#D3D3D3]"
          } hover:text-${theme === "dark" ? "white" : "black"}`}
          onClick={() => handleMenuItemClick(item.path)}
          placeholder={undefined}
        >
          <Typography
            as="span"
            className={`text-${
              theme === "dark" ? "white" : "black"
            } text-[16px] mr-auto font-normal ${manrope.className} p-2`}
            placeholder={undefined}
          >
            {item.title}
          </Typography>
        </ListItem>
      ) : (
        <Accordion
          open={open === item?.id}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === item?.id ? "rotate-180" : ""
              }`}
            />
          }
          placeholder={undefined}
        >
          <ListItem
            className={`p-0 hover:bg-${
              theme === "dark" ? "[#103B3E]" : "[#D3D3D3]"
            } hover:text-${theme === "dark" ? "white" : "black"}`}
            selected={open === item?.id}
            onClick={() => handleOpen(item?.id)}
            placeholder={undefined}
          >
            <AccordionHeader className="border-b-0 p-2" placeholder={undefined}>
              <Typography
                as="span"
                className={`text-${
                  theme === "dark" ? "white" : "black"
                } text-[16px] mr-auto font-normal ${manrope.className}`}
                placeholder={undefined}
              >
                {item?.title}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0" placeholder={undefined}>
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
        className={`flex flex-row-reverse justify-between py-3 px-2 bg-${
          theme === "dark" ? "[#003034]" : "[#FFFFFF]"
        }`}
        onClick={openDrawer}
        placeholder={undefined}
      >
        <div className="m-auto">
          <Typography
            as="a"
            href="/Investors/homepage"
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
        {isDrawerOpen ? (
          <XMarkIcon className="p-2 h-8 w-8 stroke-2 bg-[#B8FF22] rounded-full" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 bg-[#B8FF22] rounded-full p-1" />
        )}
      </Typography>

      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className={`bg-${
          theme === "dark" ? "[#00171A]" : "[#FFFFFF]"
        } h-full rounded-md w-4/5`}
        placeholder={undefined}
      >
        <Card
          shadow={false}
          style={{
            maxHeight: "100vh",
            overflowY: "scroll",
          }}
          className="mr-2 w-full bg-transparent p-4 rounded-md"
          placeholder={undefined}
        >
          <div className="mb-2 flex items-center justify-between gap-4 p-4">
            <Typography placeholder={undefined}>
              <Image
                src={theme === "dark" ? PehlaStakeLight : PehlaStakeDark}
                alt="PehlaStake"
                width={150}
                height={50}
              />
            </Typography>
            <button
              onClick={toggleTheme}
              className="text-[#00171A] dark:text-white text-right border p-2 rounded-full"
            >
              {theme === "dark" ? (
                <FiSun size={24} className="text-yellow-500" /> // Sunlight icon for dark mode
              ) : (
                <FiMoon size={24} className="text-blue-500" /> // Night icon for light mode
              )}
            </button>
          </div>
          <div className="mb-8 flex items-center gap-4">
            <Avatar
              src="/avatar.svg"
              alt="admin avatar"
              size="lg"
              className="rounded-lg"
              placeholder={undefined}
            />
            <div>
              <Typography
                variant="h5"
                placeholder={undefined}
                className="dark:text-[#ffffff] text-[#00171A] font-manrope"
              >
                Investors Name
              </Typography>
              <Typography
                placeholder={undefined}
                className="dark:text-[#ffffff] text-[#00171A] font-manrope font-medium"
              >
                Investors
              </Typography>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Link href="/Investors/chat">
              <Button
                className={`font-manrope font-medium flex items-center justify-center px-4 rounded-full ${
                  theme === "dark"
                    ? "bg-[#143e41] text-gray-400"
                    : "bg-[#f0f0f0] text-[#00171A]"
                }`}
                placeholder={undefined}
              >
                <ChatBubbleLeftIcon className="h-4 w-4 mr-1 text-gray-400" />
                Chat
              </Button>
            </Link>
            <Link href="/Investors/messages">
              <div className="relative inline-flex">
                <button
                  className={`align-middle select-none font-sans font-bold text-center rounded-full p-3 ${
                    theme === "dark" ? "bg-[#143e41]" : "bg-[#f0f0f0]"
                  }`}
                  type="button"
                >
                  <BellIcon className="h-4 w-4" />
                </button>
              </div>
            </Link>
          </div>
          <List placeholder={undefined}>{renderedItem}</List>
        </Card>
      </Drawer>
    </>
  );
}
