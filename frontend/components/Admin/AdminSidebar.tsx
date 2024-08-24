import React, { useEffect, useState } from "react";
import Image from "next/image";
import pehlaStakeLight from "@/public/PehlaStakeLight.svg";
import pehlaStakeDark from "@/public/PehlaStakeDark.svg";
import {
  Typography,
  Drawer,
  Card,
  Avatar,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMoon, FiSun } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  title: string;
  path?: string;
  items?: NavItem[];
}

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

export default function AdminSidebar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { isAuthenticating } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isDrawerOpen]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleDashboardMenuItemClick = (menuItem: NavItem) => {
    if (menuItem.path) {
      setIsDashboardMenuOpen(false);
      router.push(menuItem.path);
    }
  };

  const isActive = (path: string | undefined) => {
    return router.asPath === path || router.asPath === `${path}/`;
  };

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
              src={theme === "dark" ? pehlaStakeLight : pehlaStakeDark}
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
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography placeholder={undefined}>
              <Image
                src={pehlaStakeLight}
                alt="PehlaStake"
                width={150}
                height={50}
              />
            </Typography>
            {/* <div className="ml-auto">
              <Typography as="a" href="#" placeholder={undefined}>
                {theme === "dark" ? (
                  <FiSun
                    className="h-8 w-8 stroke-2 text-[#ffffff] hover:opacity-80"
                    onClick={toggleTheme}
                  />
                ) : (
                  <FiMoon
                    className="h-8 w-8 stroke-2 text-[#00171A] hover:opacity-80"
                    onClick={toggleTheme}
                  />
                )}
              </Typography>
            </div> */}
          </div>

          <div className="mb-8 p-4">
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
                  Admin Name
                </Typography>
                <Typography
                  placeholder={undefined}
                  className="dark:text-[#ffffff] text-[#00171A] font-manrope font-medium"
                >
                  Administrator
                </Typography>
              </div>
            </div>

            <List
              className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
              placeholder={undefined}
            >
              <div>
                <Typography
                  as="div"
                  variant="small"
                  className="font-medium cursor-pointer"
                  placeholder={undefined}
                >
                  <ListItem
                    className={`font-manrope flex items-center dark:text-[#ffffff] text-[#00171A] gap-2 py-2 pr-4 font-medium hover:bg-[#103B3E] hover:text-white`}
                    selected={isDashboardMenuOpen}
                    onClick={() => setIsDashboardMenuOpen((cur) => !cur)}
                    placeholder={undefined}
                  >
                    Dashboard
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3 w-3 transition-transform ${
                        isDashboardMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </ListItem>
                </Typography>
                {isDashboardMenuOpen && (
                  <div className="ml-4 mt-2">
                    <ul className="list-none p-0">
                      {navbarList[0].items?.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => handleDashboardMenuItemClick(item)}
                          className="font-manrope cursor-pointer dark:text-[#ffffff] text-[#00171A] py-2 pl-10 text-[14px]"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {navbarList.slice(1).map((navItem, index) => (
                <Typography
                  key={index}
                  as="a"
                  href={navItem.path || "#"}
                  variant="small"
                  className={`font-medium ${
                    isActive("/" + navItem.path)
                      ? "text-[#B8FF22]"
                      : "text-[#ffffff]"
                  } hover:bg-[#103B3E] hover:text-white dark:text-[#ffffff] text-[#00171A] font-manrope`}
                  placeholder={undefined}
                >
                  <ListItem
                    className={`flex items-center gap-2 py-2 pr-4 font-manrope `}
                    placeholder={undefined}
                  >
                    {navItem.title}
                  </ListItem>
                </Typography>
              ))}
            </List>
            {/* <ul className="flex flex-col gap-1">
//               {profileMenuItems.map(({ label, icon }, index) => (
//                 <li key={index}>
//                   <Menu>
//                     <MenuHandler>
//                       <Button
//                         variant="text"
//                         color="blue-gray"
//                         className="flex items-center gap-2 rounded-lg px-2 py-2"
//                         placeholder={undefined}
//                       >
//                         {React.createElement(icon, {
//                           className: "h-5 w-5",
//                           strokeWidth: 2,
//                         })}
//                         {label}
//                       </Button>
//                     </MenuHandler>
//                     <MenuList placeholder={undefined}>
//                       <MenuItem placeholder={undefined}>{label}</MenuItem>
//                     </MenuList>
//                   </Menu>
//                 </li>
//               ))}
//             </ul> */}
          </div>
        </Card>
      </Drawer>
    </>
  );
}
