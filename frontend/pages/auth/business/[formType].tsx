import { useRouter } from "next/router";
import AboutBusinessForm from "@/components/auth/business/AboutBusinessForm";
import BusinessDocumentForm from "@/components/auth/business/BusinessDocumentForm";
import BusinessFinanceForm from "@/components/auth/business/BusinessFinanceForm";
import BusinessInterestForm from "@/components/auth/business/BusinessInterestForm";
import LittleMoreBusinessForm from "@/components/auth/business/LittleMoreBusinessForm";
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
        return <AboutBusinessForm />;
      case "documents":
        return <BusinessDocumentForm />;
      case "finance":
        return <BusinessFinanceForm />;
      case "interests":
        return <BusinessInterestForm />;
      case "more-details":
        return <LittleMoreBusinessForm />;
      case "privacy-policy":
        return <PrivacyAndPolicy />;
      default:
        return <p>Business form not found</p>;
    }
  };

  return <div>{renderForm()}</div>;
}
