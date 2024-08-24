import { useRouter } from "next/router";
import NewBusinessAllowance from "@/components/Admin/NewApplicants/NewBusniessAllowence";
import NewInvestorsAllowence from "@/components/Admin/NewApplicants/NewInvestorsAllowence";

export default function BusinessForm() {
  const router = useRouter();
  const { applicantType } = router.query;
  
  const renderForm = () => {
    
    switch (applicantType) {
      case "business-applicant":
        return <NewBusinessAllowance />;
      case "investors-applicant":
        return <NewInvestorsAllowence />;
      default:
        return <p> page not found</p>;
    }
  };

  return <div>{renderForm()}</div>;
}
