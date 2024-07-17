import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import { Footer } from "./Footer";
import { NavbarTop } from "./Navbar";
import BusinessNavbar from "../Businesses/BusinessHome/BusinessNavbar";
import InvestorsNavbar from "../Investors/InvestorsHome/InvestorsNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleTheme } = useTheme();
  const router = useRouter();

  const renderNavbar = () => {
    if (router.pathname.startsWith("/Admin")) {
      return <AdminNavbar />;
    } else if (router.pathname.startsWith("/Businesses")) {
      return <BusinessNavbar />;
    } else if (router.pathname.startsWith("/Investors")) {
      return <InvestorsNavbar />;
    } else {
      return <NavbarTop />; // Default Navbar
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderNavbar()}
      {/* <header className="bg-white dark:bg-gray-800 p-3 mt-3 flex justify-end m-auto border rounded-xl">
        <button
          onClick={toggleTheme}
          className="text-[#00171A] dark:text-white text-right"
        >
          Toggle Theme
        </button>
      </header> */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
