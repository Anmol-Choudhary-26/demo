import { BusinessCard } from "./Common/BusinessCard";
import SecondaryButton from "./Common/SecondaryButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { businessesData } from "@/constants";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function RegisteredBusiness() {
  const { theme } = useTheme();
  const selectedBusinesses = businessesData.slice(0, 6);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <section className="mt-20">
      <div className="">
        <div className="flex flex-row flex-wrap justify-between px-4 sm:px-10">
          <p
            className={`text-5xl font-bold pb-4 sm:pb-0 ${
              theme === "dark" ? "text-white" : "text-[#00171A]"
            }`}
          >
            1000+ registered <br /> businesses for sale on Biwi
          </p>
          <div className="">
            <p
              className={`pb-4 text-[13px] sm:text-[15px] ${
                theme === "dark" ? "text-[#cccccc]" : "text-[#666666]"
              }`}
            >
              Explore pre-screened businesses for sale from over 100+ countries
              and across <br className="hidden sm:block" /> 900+ different
              industries. You can find businesses looking for full sale, raising{" "}
              <br className="hidden sm:block" /> capital through an investment
              or seeking business loan. Register as an Investor
              <br className="hidden sm:block" /> to buy a business or invest in
              them.
            </p>
            <Link href="/auth/signup">
              <SecondaryButton
                title="View all Businesses"
                backgroundStyle={`border shadow-none rounded-full capitalize font-thin text-[14px] ${
                  theme === "dark"
                    ? "border-[#A4E320] text-[#A4E320]"
                    : "border-[#248E38] text-[#248E38]"
                }`}
              />
            </Link>
          </div>
        </div>
        <div className="w-full px-6 sm:px-8 pt-10 overflow-x-clip">
          <Slider {...settings}>
            {selectedBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
