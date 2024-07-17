import { useRouter } from "next/router";
import InvestorDocumentForm from "@/components/auth/investor/InvestorDocumentForm";
import InvestorInterestForm from "@/components/auth/investor/InvestorInterestForm";
import { NavbarTop } from "@/components/Common/Navbar";
import { Footer } from "@/components/Common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function InvestorFormPage() {
  const router = useRouter();
  const { formType } = router.query;
  const { setIsAuthenticating } = useAuth();

  useEffect(() => {
    setIsAuthenticating(true);

    return () => setIsAuthenticating(false);
  }, [setIsAuthenticating]);

  const renderForm = () => {
    switch (formType) {
      case "documents":
        return <InvestorDocumentForm />;
      case "interests":
        return <InvestorInterestForm />;
      default:
        return <p>Investor form not found</p>;
    }
  };

  return (
    <div>
      <main>{renderForm()}</main>
    </div>
  );
}
