import { CategoriesMiniCard } from "@/types";

export default function CategoriesMiniCard({
  title,
  backgroundStyle,
}: CategoriesMiniCard) {
  return (
    <div
      className={`${backgroundStyle} flex justify-center text-center text-[15px] rounded-[4px] py-2`}
    >
      <h1>{title}</h1>
    </div>
  );
}
