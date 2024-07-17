import { SecondaryButtonProps } from "@/types";
import { Button } from "@material-tailwind/react";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  weight: "400",
  subsets: ["latin"],
});

export default function SecondaryButton({
  title,
  backgroundStyle,
}: SecondaryButtonProps) {
  return (
    <Button
      placeholder="Button"
      className={`${backgroundStyle} ${manrope.className}`}
      variant="outlined"
      // color="lime"
    >
      {title}
    </Button>
  );
}
