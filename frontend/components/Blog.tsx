import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import BlogCard from "./Common/BlogCard";
import { getBlog } from "@/hooks/useBlog";
import { useTheme } from "@/context/ThemeContext";

export default function Blog() {
  const { theme } = useTheme();
  const [blog, setBlog] = useState([
    {
      id: "664ea585bf95d253e6ce8162",
      title: "title ",
      description: "Blog ",
      createdAt: "2024-05-23T02:10:12.269Z",
      updatedAt: "2024-05-23T02:10:12.269Z",
    },
  ]);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await getBlog();
        console.log(response);
        setBlog(response);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    }
    fetchSlots();
  }, []);

  return (
    <section
      className={`container px-4 sm:mx-10 py-4 ${
        theme === "dark" ? "text-white" : "text-[#00171A]"
      }`}
    >
      <div>
        <p className={`text-5xl sm:text-6xl font-semibold pb-4`}>
          Read Our Blogs{" "}
        </p>
        <p className={`text-[14px] sm:text-[16px] tracking-wider pb-10`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Image src="/blog.svg" alt="blog" width={1280} height={200} />
      </div>
      <div
        className={`text-[14px] sm:text-[16px] mt-8 ${
          theme === "dark" ? "text-white" : "text-[#00171A]"
        }`}
      >
        <p className="text-[#248E38] dark:text-[#A4E320]">Category</p>
        <p className="text-xl sm:text-2xl font-semibold">
          Blog title heading will go here
        </p>
        <p className="py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros.
        </p>
        <p>11 Jan 2022 • 5 min read</p>
      </div>
      <div>
        {blog.length === 0 ? (
          <div>
            <p>Error</p>
          </div>
        ) : (
          <div className="mr-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {blog.map((slot) => (
              <Fragment key={slot.id}>
                <BlogCard key={slot.id} values={slot} />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
