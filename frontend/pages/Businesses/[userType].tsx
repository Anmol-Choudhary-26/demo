import { useRouter } from "next/router";
import BusinessHomepage from "@/components/Businesses/BusinessHome/BusinessHomepage";
import { Footer } from "@/components/Common/Footer";
import BusinessNavbar from "@/components/Businesses/BusinessHome/BusinessNavbar";
import SearchForInvestors from "@/components/Businesses/BusinessHome/SearchForInvestors";
import InvestorsDetailsPage from "@/components/Businesses/BusinessHome/InvestorsDetailsPage";
import BusinessBookmark from "@/components/Businesses/BusinessHome/BusinessBookmark";
import ChatMain from "@/components/Businesses/BusinessHome/BusinessChat/ChatMain";
import BusinessesMessages from "@/components/Businesses/BusinessHome/BusinessesMessages";
import Blog from "@/components/Blog";
import PrivacyAndPolicy from "@/components/Common/PrivacyAndPolicy";
import QandA from "@/components/Businesses/BusinessHome/QandA";
import BusinessUserProfile from "@/components/Businesses/BusinessHome/BusinessUserProfile";
import ContactUs from "@/components/ContactUs";

export default function BusinessForm() {
  const router = useRouter();
  const { userType } = router.query;

  const renderForm = () => {
    switch (userType) {
      case "homepage":
        return <BusinessHomepage />;
      case "search-for-investors":
        return <SearchForInvestors />;
      case "proposals":
        return <InvestorsDetailsPage />;
      case "bookmark":
        return <BusinessBookmark />;
      case "messages":
        return <BusinessesMessages />;
      case "QandA":
        return <QandA />;
      case "chat":
        return <ChatMain />;
      case "blog":
        return <Blog />;
      case "my-profile":
        return <BusinessUserProfile />;
      case "contact-us":
        return <ContactUs />;
      case "privacy-policy":
        return <PrivacyAndPolicy />;
      default:
        return <p>Business page not found</p>;
    }
  };

  return <div className="bg-[#ffffff] dark:bg-[#00171A]">{renderForm()}</div>;
}
