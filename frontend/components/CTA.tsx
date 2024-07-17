import Link from "next/link";
import PrimaryButton from "./Common/PrimaryButton";

export default function CTA() {
  return (
    <section className="hidden sm:block bg-[url('/CTA.svg')] bg-contain bg-no-repeat h-96 mx-20 my-20">
      <div className="flex flex-col justify-center text-center pt-28">
        <p className="text-5xl font-semibold text-white pb-10">
          Get access to All Investors, Startups, <br /> Businesses and
          Franchises listing <br /> Database
        </p>
        <Link href="/auth/signup">
          <PrimaryButton
            title="Create an account"
            backgroundStyle="bg-[#ffffff] border-none shadow-none text-[#248E38] capitalize  font-thin text-[14px] m-auto"
          />
        </Link>
      </div>
    </section>
  );
}
