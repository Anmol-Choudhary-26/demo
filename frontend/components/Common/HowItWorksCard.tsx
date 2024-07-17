import { howItWorksCardProp } from "@/types";
import { useTheme } from "@/context/ThemeContext";

export default function HowItWorksCard({
  step,
  heading,
  description,
}: howItWorksCardProp) {
  const { theme } = useTheme();

  return (
    <section
      className={`rounded-lg ${
        theme === "dark"
          ? "bg-[#002427] text-[#ffffff]"
          : "bg-[#f0f0f0] text-[#00171A]"
      }`}
    >
      <div className="px-8 py-6">
        <p
          className={`font-medium ${
            theme === "dark" ? "text-[#B8FF22]" : "text-[#248E38]"
          }`}
        >
          {step}
        </p>
        <p className="text-[20px] font-bold">{heading}</p>
        <p className="text-[15px] font-light">{description}</p>
      </div>
    </section>
  );
}
