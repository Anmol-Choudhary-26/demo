import { useRouter } from "next/router";
import AboutFranchiseForm from "@/components/auth/franchise/AboutFranchiseForm";
import LittleMoreFranchiseForm from "@/components/auth/franchise/LittleMoreFranchiseForm";
import FranchiseFinanceForm from "@/components/auth/franchise/FranchiseFinanceForm";
import FranchiseDocumentForm from "@/components/auth/franchise/FranchiseDocumentForm";
import FranchiseInterestForm from "@/components/auth/franchise/FranchiseInterestForm";
import { NavbarTop } from "@/components/Common/Navbar";
import { Footer } from "@/components/Common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import PrivacyAndPolicy from "@/components/Common/PrivacyAndPolicy";

export default function BusinessForm() {
  const router = useRouter();
  const { formType } = router.query;
  const { setIsAuthenticating } = useAuth();

  useEffect(() => {
    setIsAuthenticating(true);

    return () => setIsAuthenticating(false);
  }, [setIsAuthenticating]);

  const renderForm = () => {
    switch (formType) {
      case "about":
        return <AboutFranchiseForm />;
      case "documents":
        return <FranchiseDocumentForm />;
      case "finance":
        return <FranchiseFinanceForm />;
      case "interests":
        return <FranchiseInterestForm />;
      case "more-details":
        return <LittleMoreFranchiseForm />;
      case "privacy-policy":
        return <PrivacyAndPolicy />;
      default:
        return <p>Business form not found</p>;
    }
  };

  return <div>{renderForm()}</div>;
}
