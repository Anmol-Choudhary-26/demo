// components/Common/NavbarTop.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import PehlaStakeDark from "/public/PehlaStakeDark.svg";
import PehlaStakeLight from "/public/PehlaStakeLight.svg";
import Sidebar from "./Sidebar";

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
    title: "Businesses",
    path: "/business",
  },
  {
    title: "Franchises",
    path: "/franchise",
  },
  {
    title: "Investors",
    path: "/investor",
  },
  {
    title: "How it works",
    path: "/HowItWorks",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Company");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleMenuItemClick = (menuItem: { title: string; path: string }) => {
    setActiveMenuItem(menuItem.title);
    router.push(menuItem.path);
  };

  const renderItems = navListMenuItems.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem
        placeholder=""
        className={`flex items-center gap-3 rounded-lg ${
          theme === "dark"
            ? "hover:bg-[#103B3E] hover:text-white"
            : "hover:text-[#003034]"
        }`}
      >
        <div>
          <Typography
            placeholder=""
            variant="h6"
            className={`last:flex items-center text-sm font-semibold ${
              theme === "dark" ? "text-white" : "text-[#003034]"
            } font-manrope`}
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            placeholder=""
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder=""
              className={`font-manrope flex items-center gap-2 py-2 pr-4 font-medium ${
                theme === "dark"
                  ? "text-white hover:bg-[#003034]"
                  : "text-[#003034]"
              }  hover:text-white`}
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {activeMenuItem}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          className="hidden max-w-screen-xl rounded-xl lg:block bg-gray-400 dark:bg-[#143e41] border-none"
          placeholder={undefined}
        >
          <ul className="grid grid-cols-1 gap-y-2 outline-none">
            {navListMenuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className={`font-manrope cursor-pointer ${
                  theme === "dark"
                    ? "text-white hover:bg-[#1d494d] rounded-md p-2"
                    : "text-[#003034] hover:bg-gray-100 rounded-md p-2"
                } pb-2`}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  const router = useRouter();
  const { theme } = useTheme();

  const isActive = (path: string | undefined) => {
    return router.asPath === path || router.asPath === `${path}/`;
  };
  return (
    <List
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
      placeholder={undefined}
    >
      {navbarList.map((navItem, index) => {
        const active = isActive(navItem.path);

        return (
          <Typography
            key={index}
            as="a"
            href={navItem.path || "#"}
            variant="small"
            className={`font-medium ${
              isActive("/" + navItem.path)
                ? "text-[#B8FF22]"
                : theme === "dark"
                ? "text-[#ffffff] hover:bg-[#103B3E] hover:text-white"
                : "text-[#003034]"
            } rounded-md font-manrope`}
            placeholder={undefined}
          >
            <ListItem
              className={`${
                theme === "dark" ? "text-[#ffffff]" : "text-[#003034]"
              } flex items-center gap-2 py-2 pr-4 font-manrope`}
              placeholder={undefined}
            >
              {navItem.title}
            </ListItem>
          </Typography>
        );
      })}
      <NavListMenu />
    </List>
  );
}

export function NavbarTop() {
  const [openNav, setOpenNav] = useState(false);
  const { isAuthenticating } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setOpenNav(window.innerWidth <= 960);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {openNav ? (
        <Sidebar />
      ) : (
        <Navbar
          className="font-manrope max-w-none px-4 py-2 border-none shadow-none rounded-none backdrop-blur-none bg-white dark:bg-[#00171A] bg-opacity-100"
          placeholder={undefined}
        >
          <div className="flex items-center justify-between">
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
            <div className="hidden lg:block">
              <NavList />
            </div>
            <div className="hidden gap-2 lg:flex items-center">
              <Link href="/auth/signin">
                <PrimaryButton
                  title="Login"
                  backgroundStyle="bg-transparent capitalize border-none shadow-none text-[14px]"
                />
              </Link>
              {!isAuthenticating && (
                <Link href="/auth/signup">
                  <PrimaryButton
                    title="Create an Account"
                    backgroundStyle="bg-[#248E38] dark:bg-[#B8FF22] border-none shadow-none text-[#ffffff] dark:text-[#103B3E] capitalize font-thin text-[14px]"
                  />
                </Link>
              )}
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
          </div>
        </Navbar>
      )}
    </>
  );
}
