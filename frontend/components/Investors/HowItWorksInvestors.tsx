import HowItWorksCard from "../Common/HowItWorksCard";
import { useTheme } from "@/context/ThemeContext";

export default function HowItWorksInvestors() {
  const { theme } = useTheme();

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mx-10 my-10 font-manrope ${
        theme === "dark" ? "text-white" : "text-[#00171A]"
      }`}
    >
      <HowItWorksCard
        step="Step 1"
        heading="Create an account"
        description="Sign up for a free account by providing your investment criteria and areas of interest."
      />
      <HowItWorksCard
        step="Step 2"
        heading="Discover potential investments"
        description="Explore a wide range of businesses seeking funding across various industries. Utilize detailed filters and search functions to find opportunities that match your investment goals."
      />
      <HowItWorksCard
        step="Step 3"
        heading="Connect with businesses"
        description=" Connect directly with businesses that pique your interest. View their profiles, analyze their offerings, and initiate conversations to learn more."
      />
      <HowItWorksCard
        step="Step 4"
        heading="Make informed decisions"
        description=" Conduct due diligence, negotiate terms, and manage your investment portfolio seamlessly through our platform."
      />
    </div>
  );
}
