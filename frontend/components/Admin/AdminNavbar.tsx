import React, { useState } from "react";
import Image from "next/image";
import pehlaStakeLight from "@/public/PehlaStakeLight.svg";
import { useRouter } from "next/router";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  ChatBubbleLeftIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

import AdminSidebar from "./AdminSidebar";
import Link from "next/link";

interface NavItem {
  title: string;
  path?: string;
  items?: NavItem[];
}

interface ProfileMenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavListMenuProps {
  onMenuItemClick: (title: string) => void;
  selectedItem: string;
}

const navbarList: NavItem[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Dashboard", path: "home" },
      { title: "Manage Admin", path: "manage-admins" },
    ],
  },
  {
    title: "Manage Industry",
    path: "manage-industry",
  },
  {
    title: "New Applicants",
    path: "new-applicants",
  },
  {
    title: "Manage User",
    path: "manage-user",
  },
  {
    title: "Manage Reports",
    path: "manage-report",
  },
  {
    title: "Announcements",
    path: "announcements",
  },
  {
    title: "Blog",
    path: "blog",
  },
];

// const profileMenuItems: ProfileMenuItem[] = [
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

function NavList({ onMenuItemClick, selectedItem }: NavListMenuProps) {
  const router = useRouter();
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);

  const handleDashboardMenuItemClick = (menuItem: NavItem) => {
    if (menuItem.path) {
      setIsDashboardMenuOpen(false);
      onMenuItemClick(menuItem.title);
      router.push(menuItem.path);
    }
  };

  const isActive = (path: string | undefined) => {
    return router.asPath === path || router.asPath === `${path}/`;
  };

  return (
    <List
      placeholder=""
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
    >
      <Menu
        open={isDashboardMenuOpen}
        handler={setIsDashboardMenuOpen}
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
              className={`font-manrope flex items-center gap-2 py-2 pr-4 font-medium text-white hover:bg-[#103B3E] hover:text-white`}
              selected={isDashboardMenuOpen}
              onClick={() => setIsDashboardMenuOpen((cur) => !cur)}
            >
              {selectedItem}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isDashboardMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isDashboardMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          className="hidden max-w-screen-xl rounded-xl lg:block bg-[#143e41] border-none"
          placeholder={undefined}
        >
          <ul className="grid grid-cols-1 gap-y-2 outline-none">
            {navbarList[0].items?.map((item, index) => (
              <li
                key={index}
                onClick={() => handleDashboardMenuItemClick(item)}
                className="font-manrope cursor-pointer text-white pb-2"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </MenuList>
      </Menu>
      {navbarList.slice(1).map((navItem, index) => {
        // Determine if this nav item is the active route
        const active = isActive(navItem.path);

        return (
          <Typography
            placeholder=""
            key={index}
            as="a"
            href={navItem.path || "#"}
            variant="small"
            color="white"
            className={`font-medium ${
              isActive("/" + navItem.path) ? "text-[#B8FF22]" : "text-[#ffffff]"
            } hover:bg-[#103B3E] hover:text-white font-manrope`}
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
    </List>
  );
}

export default function AdminNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const closeMenu = () => setIsMenuOpen(false);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth <= 960 ? setOpenNav(true) : setOpenNav(false)
    );
  }, []);

  return (
    <>
      {openNav ? (
        <AdminSidebar />
      ) : (
        <Navbar
          placeholder=""
          className={`font-manrope max-w-none px-4 py-2 border-none shadow-none rounded-none backdrop-blur-none bg-opacity-100 bg-[#00171A] text-white`}
        >
          <div className="flex items-center justify-between">
            <Typography
              placeholder=""
              as="a"
              href="/Admin/homepage"
              className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            >
              <Image
                src={pehlaStakeLight}
                alt="PehlaStake"
                width={150}
                height={50}
              />
            </Typography>
            <div className="hidden lg:block">
              <NavList
                onMenuItemClick={setSelectedItem}
                selectedItem={selectedItem}
              />
            </div>
            <div className="hidden gap-2 lg:flex">
              <Link href="/Admin/notification">
                <div className="relative inline-flex">
                  <button
                    className="align-middle select-none font-sans font-bold text-center bg-[#143e41] rounded-full p-3"
                    type="button"
                  >
                    <BellIcon className="h-4 w-4" />
                  </button>
                  <span className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-[#102e30] text-white min-w-[24px] min-h-[24px]">
                    5
                  </span>
                </div>
              </Link>
              {/* <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
              >
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
                  className="p-1 bg-[#143e41] text-white border-none"
                  placeholder={undefined}
                >
                  {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                      <MenuItem
                        key={label}
                        onClick={closeMenu}
                        className={`flex items-center gap-2 rounded  ${
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
                    );
                  })}
                </MenuList>
              </Menu> */}
            </div>
          </div>
        </Navbar>
      )}
    </>
  );
}
