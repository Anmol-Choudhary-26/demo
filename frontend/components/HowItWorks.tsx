import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import HowItWorksBusiness from "./Businesses/HowItWorksBusiness";
import HowItWorksInvestors from "./Investors/HowItWorksInvestors";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@/context/ThemeContext";

interface HowItWorksProps {
  defaultTab: string;
}

export default function HowItWorks({ defaultTab }: HowItWorksProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultTab || "business");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/HowItWorks#${value}`);
  };

  const data = [
    {
      label: "For Businesses",
      value: "business",
      desc: <HowItWorksBusiness />,
    },
    {
      label: "For Investors",
      value: "investors",
      desc: <HowItWorksInvestors />,
    },
  ];

  return (
    <section className="w-full pt-4 font-manrope">
      <div className="pb-10">
        <p
          className={`flex justify-center text-center pt-10 ${
            theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
          }`}
        >
          How PehlaStake Works
        </p>
        <div className="flex flex-col justify-center text-center gap-[24px]">
          <p
            className={`text-4xl sm:text-6xl font-bold ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Four Steps to connect With Your <br className="hidden sm:block" />{" "}
            Ideal Investor/Businesses
          </p>
          <p
            className={`text-[13px] sm:text-[15px] font-light px-2 ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            Unlock endless possibilities for your business or investment
            journey. Join <br className="hidden sm:block" /> a thriving
            community where opportunities meet expertise.
          </p>
        </div>
      </div>
      <div>
        <Tabs
          className="w-full"
          id="custom-animation"
          value={activeTab}
          onChange={handleTabChange}
        >
          <TabsHeader
            placeholder={undefined}
            className={`m-auto max-w-[280px] rounded-full mb-10 ${
              theme === "dark" ? "bg-[#001F22]" : "bg-[#f0f0f0]"
            }`}
          >
            {data.map(({ label, value }) => (
              <Tab
                placeholder={undefined}
                key={value}
                value={value}
                className=""
              >
                <p
                  className={`font-manrope font-medium ${
                    theme === "dark" ? "text-[#7f7f7f]" : "text-[#333333]"
                  }`}
                >
                  {label}
                </p>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
            placeholder={undefined}
          >
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </section>
  );
}
