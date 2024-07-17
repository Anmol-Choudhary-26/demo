import React, { useState } from "react";
import Image from "next/image";
import PehlaStakeDark from "@/public/PehlaStakeDark.svg";
import PehlaStakeLight from "@/public/PehlaStakeLight.svg";
import { useRouter } from "next/router";

import {
  Navbar,
  Collapse,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import InvestorsSidebar from "./InvestorsSidebar";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext"; // Import the ThemeContext
import { FiMoon, FiSun } from "react-icons/fi";

const navListMenuItems = [
  {
    title: "Blog",
    path: "/Investors/blog",
  },
];

const navbarList = [
  {
    title: "Home",
    path: "homepage",
  },
  {
    title: "Businesses",
    path: "search-for-businesses",
  },
  {
    title: "Franchises",
    path: "search-for-franchise",
  },
  {
    title: "Proposals",
    path: "proposals",
  },
  {
    title: "Bookmarks",
    path: "bookmark",
  },
  {
    title: "Q&A",
    path: "QandA",
  },
];

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "my-profile",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path: "contact-us",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Company");
  const router = useRouter();
  const { theme } = useTheme(); // Use theme from context

  const handleMenuItemClick = (menuItem: {
    title: React.SetStateAction<string>;
    path: Url;
  }) => {
    setActiveMenuItem(menuItem.title);
    router.push(menuItem.path);
  };

  const renderItems = navListMenuItems.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem
        placeholder=""
        className="flex items-center gap-3 rounded-lg hover:bg-[#103B3E] hover:text-white"
      >
        <div>
          <Typography
            placeholder=""
            variant="h6"
            color="blue-gray"
            className={`last:flex items-center text-sm font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
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
                theme === "dark" ? "text-white" : "text-black"
              } hover:bg-[#103B3E] hover:text-white`}
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
          className={`hidden max-w-screen-xl rounded-xl lg:block ${
            theme === "dark" ? "bg-[#143e41] text-white" : "bg-white text-black"
          } border-none`}
          placeholder={undefined}
        >
          <ul className="grid grid-cols-1 gap-y-2 outline-none">
            {navListMenuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className={`font-manrope cursor-pointer pb-2 ${
                  theme === "dark"
                    ? "text-white"
                    : "text-black hover:bg-[#cccccc] p-2 rounded-xl"
                }`}
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
  const { theme } = useTheme(); // Use theme from context

  const isActive = (path: string | undefined) => {
    return router.asPath === path || router.asPath === `${path}/`;
  };
  return (
    <List
      placeholder=""
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
    >
      {navbarList.map((navItem, index) => {
        // Determine if this nav item is the active route
        const active = isActive(navItem.path);

        return (
          <Typography
            placeholder=""
            key={index}
            as="a"
            href={navItem.path || "/"}
            variant="small"
            className={`font-medium ${
              isActive("/" + navItem.path)
                ? "text-[#B8FF22]"
                : theme === "dark"
                ? "text-[#ffffff]"
                : "text-[#00171A]"
            } hover:bg-[#103B3E] rounded-xl hover:text-white font-manrope`}
          >
            <ListItem
              placeholder=""
              className={`flex items-center gap-2 py-2 pr-4 font-manrope`}
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

export default function InvestorsNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  // const { isAuthenticating } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme(); // Use theme from context

  const closeMenu = () => setIsMenuOpen(false);
  const router = useRouter();

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth <= 960 ? setOpenNav(true) : setOpenNav(false)
    );
  }, []);

  return (
    <>
      {openNav ? (
        <InvestorsSidebar />
      ) : (
        <Navbar
          placeholder=""
          className={`font-manrope max-w-none px-4 py-2 z-[1000] border-none shadow-none rounded-none backdrop-blur-none bg-opacity-100 ${
            theme === "dark"
              ? "bg-[#00171A] text-white"
              : "bg-[#ffffff] text-black"
          }`}
        >
          <div className="flex items-center justify-between">
            <Typography
              placeholder=""
              as="a"
              href="/Investors/homepage"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2"
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
              <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
              >
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
                    <span
                      className={`absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 ${
                        theme === "dark"
                          ? "bg-[#102e30] text-white"
                          : "bg-[#e0e0e0] text-black"
                      } min-w-[24px] min-h-[24px]`}
                    >
                      5
                    </span>
                  </div>
                </Link>
                <MenuHandler>
                  <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    placeholder={undefined}
                  >
                    <Avatar
                      variant="circular"
                      size="sm"
                      alt="profile-picture"
                      className="border border-gray-900 p-0.5"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      placeholder={undefined}
                    />
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </MenuHandler>
                <MenuList
                  className={`p-1 ${
                    theme === "dark"
                      ? "bg-[#143e41] text-white"
                      : "bg-[#f0f0f0] text-[#00171A]"
                  } border-none mt-2`}
                  placeholder={undefined}
                >
                  {profileMenuItems.map(({ label, icon, path }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                      <Link key={label} href={path || "/"}>
                        <MenuItem
                          key={label}
                          onClick={closeMenu}
                          className={`flex items-center gap-2 rounded ${
                            isLastItem
                              ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                              : ""
                          }`}
                          placeholder={undefined}
                        >
                          {React.createElement(icon, {
                            className: `h-4 w-4 ${
                              isLastItem ? "text-red-500" : ""
                            }`,
                            strokeWidth: 2,
                          })}
                          <Typography
                            as="span"
                            variant="small"
                            className="font-manrope font-semibold"
                            color={isLastItem ? "red" : "inherit"}
                            placeholder={undefined}
                          >
                            {label}
                          </Typography>
                        </MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              </Menu>
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
