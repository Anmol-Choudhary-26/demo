import { Footer } from "@/components/Common/Footer";
import { NavbarTop } from "@/components/Common/Navbar";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  return (
    <main className="font-manrope">
      <div className="bg-[#ffffff] dark:bg-[#00171A]">
        <ContactUs />
      </div>
    </main>
  );
}
