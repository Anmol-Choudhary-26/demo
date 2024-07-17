import UserProfileBusiness from "@/components/Admin/ManageReports/UserProfileBusiness";
import UserProfileFranchise from "@/components/Admin/ManageReports/UserProfileFranchise";
import UserProfileIdeation from "@/components/Admin/ManageReports/UserProfileIdeation";
import UserProfileInvestor from "@/components/Admin/ManageReports/UserProfileInvestor";
import { useRouter } from "next/router";

export default function BusinessForm() {
  const router = useRouter();
  const { manageType } = router.query;

  const renderForm = () => {
    switch (manageType) {
      case "investors-user-profile":
        return <UserProfileInvestor />;
      case "businesses-user-profile":
        return <UserProfileBusiness />;
      case "franchise-user-profile":
        return <UserProfileFranchise />;
      case "ideation-user-profile":
        return <UserProfileIdeation />;
      default:
        return <p>Page not found</p>;
    }
  };

  return <div>{renderForm()}</div>;
}
