import { useRouter } from "next/router";
import ManageBusinessNormalUser from "@/components/Admin/ManageUser/ManageBusinessNormalUser";
import ManageInvestorsNormalUser from "@/components/Admin/ManageUser/ManageInvestorsNormalUser";
import ManageFranchiseNormalUser from "@/components/Admin/ManageUser/ManageFranchiseNormalUser";
import ManageIdeasNormalUser from "@/components/Admin/ManageUser/ManageIdeasNormalUser";

export default function BusinessForm() {
  const router = useRouter();
  const { manageType } = router.query;

  const renderForm = () => {
    switch (manageType) {
      case "manage-business":
        return <ManageBusinessNormalUser />;
      case "manage-investors":
        return <ManageInvestorsNormalUser />;
      case "manage-franchise":
        return <ManageFranchiseNormalUser />;
      case "manage-ideation":
        return <ManageIdeasNormalUser />;

      default:
        return <p> page not found</p>;
    }
  };

  return <div>{renderForm()}</div>;
}
