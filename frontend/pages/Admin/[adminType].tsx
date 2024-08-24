import { useRouter } from "next/router";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import ManageIndustry from "@/components/Admin/ManageIndustry";
import ManageBlogs from "@/components/Admin/ManageBlogs";
import ManageAnnouncements from "@/components/Admin/ManageAnnouncements";
import ManageApplicants from "@/components/Admin/ManageApplicants";
import ManageUser from "@/components/Admin/ManageUser";
import AdminNotification from "@/components/Admin/AdminNotification";
import ManageReports from "@/components/Admin/ManageReports";
import AdminDashboard from "@/components/Admin/Dashboard/AdminDashboard";
import ManageAdmins from "@/components/Admin/Dashboard/ManageAdmins";
import PrivacyAndPolicy from "@/components/Common/PrivacyAndPolicy";
import AdminLogin from "@/components/Admin/AdminLogin";

export default function BusinessForm() {
  const router = useRouter();
  const { adminType } = router.query;

  const renderForm = () => {
    switch (adminType) {
      case "homepage":
        return <AdminDashboard />;
      case "login":
        return <AdminLogin />;
      case "manage-admins":
        return <ManageAdmins />;
      case "manage-industry":
        return <ManageIndustry />;
      case "blog":
        return <ManageBlogs />;
      case "announcements":
        return <ManageAnnouncements />;
      case "new-applicants":
        return <ManageApplicants />;
      case "manage-user":
        return <ManageUser />;
      case "manage-report":
        return <ManageReports />;
      case "notification":
        return <AdminNotification />;
      case "privacy-policy":
        return <PrivacyAndPolicy />;
      default:
        return <p>Admin page not found</p>;
    }
  };

  return <div>{renderForm()}</div>;
}
