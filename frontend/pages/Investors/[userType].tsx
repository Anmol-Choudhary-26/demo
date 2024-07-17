import { useRouter } from "next/router";
import { Footer } from "@/components/Common/Footer";
import InvestorsNavbar from "@/components/Investors/InvestorsHome/InvestorsNavbar";
import InvestorsHomepage from "@/components/Investors/InvestorsHome/InvestorsHomepage";
import SearchForBusinesses from "@/components/Investors/InvestorsHome/SearchForBusinesses";
import SearchForFranchise from "@/components/Investors/InvestorsHome/SearchForFranchise";
import ChatMain from "@/components/Investors/InvestorsHome/InvestorsChat/ChatMain";
import BusinessProposals from "@/components/Common/BusinessProposals";
import InvestorsBookmark from "@/components/Investors/InvestorsHome/InvestorsBookmark";
import InvestorsMessages from "@/components/Investors/InvestorsHome/InvestorsMessages";
import Blog from "@/components/Blog";
import PrivacyAndPolicy from "@/components/Common/PrivacyAndPolicy";
import QandA from "@/components/Investors/InvestorsHome/QandA";
import InvestorsUserProfile from "@/components/Investors/InvestorsHome/InvestorsUserProfile";
import ContactUs from "@/components/ContactUs";

export default function BusinessForm() {
  const router = useRouter();
  const { userType } = router.query;

  const renderForm = () => {
    switch (userType) {
      case "homepage":
        return <InvestorsHomepage />;
      case "search-for-businesses":
        return <SearchForBusinesses />;
      case "search-for-franchise":
        return <SearchForFranchise />;
      case "proposals":
        return <BusinessProposals />;
      case "bookmark":
        return <InvestorsBookmark />;
      case "QandA":
        return <QandA />;
      case "messages":
        return <InvestorsMessages />;
      case "chat":
        return <ChatMain />;
      case "blog":
        return <Blog />;
      case "my-profile":
        return <InvestorsUserProfile />;
      case "contact-us":
        return <ContactUs />;
      case "privacy-policy":
        return <PrivacyAndPolicy />;
      default:
        return <p>Investors page not found</p>;
    }
  };

  return <div className="bg-[#ffffff] dark:bg-[#00171A]">{renderForm()}</div>;
}
