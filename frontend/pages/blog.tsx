import Blog from "@/components/Blog";
import { Footer } from "@/components/Common/Footer";
import { NavbarTop } from "@/components/Common/Navbar";

export default function Home() {
  return (
    <main className="font-manrope">
      <div className="bg-[#ffffff] dark:bg-[#00171A]">
        <Blog />
      </div>
    </main>
  );
}
