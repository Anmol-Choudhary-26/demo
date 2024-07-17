import HowItWorksCard from "../Common/HowItWorksCard";
import { useTheme } from "@/context/ThemeContext";

export default function HowItWorksBusiness() {
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
        description="Sign up for a free account by providing basic information about your business, including your industry, funding needs, and goals."
      />
      <HowItWorksCard
        step="Step 2"
        heading="Build your profile:"
        description="Showcase your business by adding a compelling description, highlighting your team, and uploading relevant documents like pitch decks and financial statements."
      />
      <HowItWorksCard
        step="Step 3"
        heading="Connect with investors"
        description="Use our powerful search filters to find investors whose interests align with your business. Browse profiles, express interest, and initiate conversations directly through the platform."
      />
      <HowItWorksCard
        step="Step 4"
        heading="Secure funding"
        description="Secure the funding you need to grow your business. Negotiate deals, manage communication, and close investments efficiently through our secure platform."
      />
    </div>
  );
}
