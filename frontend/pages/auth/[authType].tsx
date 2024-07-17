import { useRouter } from "next/router";
import { NavbarTop } from "@/components/Common/Navbar";
import ForgotPassword from "@/components/auth/common/ForgotPassword";
import OTPForm from "@/components/auth/common/OTPForm";
import PersonalDetailsForm from "@/components/auth/common/PersonalDetailsForm";
import ResetPassword from "@/components/auth/common/ResetPassword";
import SelectRoleForm from "@/components/auth/common/SelectRoleForm";
import SignInForm from "@/components/auth/common/SignInForm";
import SignUpForm from "@/components/auth/common/SignUpForm";
import { Footer } from "@/components/Common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import PrivacyAndPolicy from "@/components/Common/PrivacyAndPolicy";

export default function AuthPage() {
  const router = useRouter();
  const { authType } = router.query;
  const { setIsAuthenticating } = useAuth();

  useEffect(() => {
    setIsAuthenticating(true);

    return () => setIsAuthenticating(false);
  }, [setIsAuthenticating]);

  const renderForm = () => {
    switch (authType) {
      case "forgot-password":
        return <ForgotPassword />;
      case "otp":
        return <OTPForm />;
      case "personal-details":
        return <PersonalDetailsForm />;
      case "reset-password":
        return <ResetPassword />;
      case "select-role":
        return <SelectRoleForm />;
      case "signin":
        return <SignInForm />;
      case "signup":
        return <SignUpForm />;
      case "privacy-policy":
        return <PrivacyAndPolicy />;
      default:
        return <p>Authentication form not found</p>;
    }
  };
  return (
    <div>
      <main>{renderForm()}</main>
    </div>
  );
}
