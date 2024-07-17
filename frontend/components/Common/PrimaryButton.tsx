import { Button } from "@material-tailwind/react";
import { PrimaryButtonProps } from "@/types";
import { Manrope } from "next/font/google";
import { useTheme } from "@/context/ThemeContext";

const manrope = Manrope({
  weight: "400",
  subsets: ["latin"],
});

export default function PrimaryButton({
  title,
  backgroundStyle,
  type,
}: PrimaryButtonProps) {
  const { theme } = useTheme();

  return (
    <Button
      type={type}
      placeholder="Button"
      className={`rounded-full text-medium py-3 px-8 ${
        theme === "dark"
          ? "hover:bg-[#103B3E] hover:text-white"
          : "text-[#003034]"
      } ${backgroundStyle} ${manrope.className}`}
    >
      {title}
    </Button>
  );
}
