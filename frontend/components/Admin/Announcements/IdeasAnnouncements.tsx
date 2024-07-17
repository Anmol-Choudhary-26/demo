import { BlogPost } from "@/types";
import { useState, ChangeEvent } from "react";

type ViewType = "add" | "delete" | "edit" | "";

interface Blog {
  title: string;
  description: string;
  date: string;
}

const initialBlogs: Blog[] = [
  {
    title: "The Rise of JavaScript Frameworks",
    description:
      "JavaScript frameworks have taken the development world by storm. In this article, we explore the top frameworks and their use cases.",
    date: "2024-01-15",
  },
  {
    title: "The Rise of JavaScript",
    description:
      "JavaScript frameworks have taken the development world by storm. In this article, we explore the top frameworks and their use cases.",
    date: "2024-01-15",
  },
  {
    title: " the rise Understanding Async/Await in JavaScript",
    description:
      "Async/Await simplifies working with asynchronous code in JavaScript. This post explains how to use it effectively.",
    date: "2024-02-05",
  },
  {
    title: "A Beginner's Guide to React",
    description:
      "React is a popular library for building user interfaces. This guide covers the basics you need to get started.",
    date: "2024-02-20",
  },
  {
    title: "CSS Grid vs. Flexbox: When to Use Which",
    description:
      "CSS Grid and Flexbox are powerful layout systems. Learn the differences and when to use each in your projects.",
    date: "2024-03-10",
  },
  {
    title: "Tips for Writing Clean Code",
    description:
      "Clean code is crucial for maintainability. Here are some tips to help you write cleaner, more readable code.",
    date: "2024-03-25",
  },
  {
    title: "Exploring New Features in ES2024",
    description:
      "ECMAScript 2024 introduces several new features. This post highlights the most exciting additions.",
    date: "2024-04-10",
  },
  {
    title: "Introduction to TypeScript",
    description:
      "TypeScript adds static typing to JavaScript. Learn how it can help you catch errors early and improve your codebase.",
    date: "2024-04-25",
  },
  {
    title: "Building a REST API with Node.js",
    description:
      "Node.js is perfect for building REST APIs. This tutorial walks you through the process step by step.",
    date: "2024-05-05",
  },
  {
    title: "The Benefits of Server-Side Rendering",
    description:
      "Server-side rendering can improve performance and SEO. Discover the benefits and how to implement it.",
    date: "2024-05-20",
  },
  {
    title: "Getting Started with GraphQL",
    description:
      "GraphQL is a query language for your API. This post covers the basics and helps you get started.",
    date: "2024-06-01",
  },
];

export default function IdeasAnnouncements() {
  const [view, setView] = useState<ViewType>("");
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  // edit blog
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [searchQueryEdit, setSearchQueryEdit] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // delete blog
  const [searchQueryDelete, setSearchQueryDelete] = useState<string>("");
  const [filteredBlogsToDelete, setFilteredBlogsToDelete] = useState<Blog[]>(
    []
  );
  const [currentBlogForDelete, setCurrentBlogForDelete] = useState<Blog | null>(
    null
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleArrowClick = (blog: BlogPost) => {
    console.log("Current blog set:", blog); // Debugging log
  };

  const getButtonClass = (buttonView: ViewType) => {
    return view === buttonView
      ? "role_button border-[#A4E320] text-[#A4E320]"
      : "role_button";
  };

  const handleSearchDelete = () => {
    const query = searchQueryDelete.toLowerCase();
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.date.includes(query)
    );
    setFilteredBlogsToDelete(results);
  };

  const handleDelete = (blogToDelete: Blog) => {
    const updatedBlogs = blogs.filter((blog) => blog !== blogToDelete);
    setBlogs(updatedBlogs);
    setFilteredBlogsToDelete(
      updatedBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQueryDelete.toLowerCase()) ||
          blog.description
            .toLowerCase()
            .includes(searchQueryDelete.toLowerCase()) ||
          blog.date.includes(searchQueryDelete)
      )
    );
    setCurrentBlogForDelete(null);
  };

  const handleAddBlog = (): void => {
    if (!title || !description || !date) {
      alert("All fields are required to add a blog.");
      return;
    }

    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title,
      description,
      date,
    };

    setBlogPosts([...blogPosts, newBlog]);
    setTitle("");
    setContent("");
    setDate("");
  };

  const handleSearchEdit = () => {
    const query = searchQueryEdit.toLowerCase();
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.date.includes(query)
    );
    setFilteredBlogs(results);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditBlog(filteredBlogs[index]);
  };

  const handleUpdate = () => {
    if (editBlog !== null && editIndex !== null) {
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? editBlog : blog
      );
      setBlogs(updatedBlogs);
      setFilteredBlogs(
        updatedBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchQueryEdit.toLowerCase()) ||
            blog.description
              .toLowerCase()
              .includes(searchQueryEdit.toLowerCase()) ||
            blog.date.includes(searchQueryEdit)
        )
      );
      setEditIndex(null);
      setEditBlog(null);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editBlog) {
      const { name, value } = e.target;
      setEditBlog({ ...editBlog, [name]: value });
    }
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(blogPosts.filter((blog) => blog.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center  bg-[#00171A] text-white p-4">
      <div className="md:space-x-2 grid md:flex gap-2 mb-4">
        <button
          onClick={() => setView("add")}
          className={getButtonClass("add")}
        >
          Add an Announcements for Ideas
        </button>
        <button
          onClick={() => setView("edit")}
          className={getButtonClass("edit")}
        >
          Edit an Announcements for Ideas
        </button>
        <button
          onClick={() => setView("delete")}
          className={getButtonClass("delete")}
        >
          Delete an Announcements for Ideas
        </button>
      </div>
      {view === "add" && (
        <div className="">
          <div className="flex justify-center items-center mt-4">
            <div className="flex flex-col space-y-2 w-[350px]">
              <input
                type="text"
                placeholder="Add Blog Title Here"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Add Blog Content Here"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContent(e.target.value)
                }
              />
              <input
                type="date"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
              />
              <button
                onClick={handleAddBlog}
                className="bg-[#A4E320] px-4 py-2 sm:w-[400px] rounded-full mt-2"
              >
                Add Now
              </button>
            </div>
          </div>
          <div className="mt-8">
            {blogPosts.map((blog) => (
              <div
                key={blog.id}
                className="relative mt-4 p-6 rounded-lg shadow-lg bg-[#001F22]"
              >
                <button
                  onClick={() => deleteBlogPost(blog.id)}
                  className="absolute top-2 right-2 text-[#EC183E] bg-[#001F22] rounded-full p-2 hover:text-white"
                >
                  ✖
                </button>
                <button
                  onClick={() => handleArrowClick(blog)}
                  className="absolute top-2 right-10 text-[#A4E320] bg-[#001F22] rounded-full p-2 hover:text-white"
                >
                  ➔
                </button>

                <h2 className="text-xl text-white font-semibold">
                  {blog.title}
                </h2>
                <p className="text-gray-400">{blog.description}</p>
                <p className="text-[#A4E320]">{blog.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "delete" && (
        <div>
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search Blog to Delete"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={searchQueryDelete}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQueryDelete(e.target.value)
                }
              />
              <button
                onClick={handleSearchDelete}
                className="bg-[#A4E320] px-4 py-2 rounded-full"
              >
                Search
              </button>
            </div>
          </div>
          <div className="mt-4">
            {filteredBlogsToDelete.length > 0
              ? filteredBlogsToDelete.map((blog, index) => (
                  <div key={index} className="bg-[#001F22] p-4 rounded mt-2">
                    <h2 className="text-xl font-bold text-white">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400">{blog.description}</p>
                    <p className="text-gray-500">{blog.date}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleDelete(blog)}
                        className="bg-[#EC183E] px-8 py-2 rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              : searchQueryDelete && (
                  <p className="text-gray-500 mt-4 text-center">
                    No blogs found matching your search query.
                  </p>
                )}
          </div>
        </div>
      )}
      {view === "edit" && (
        <div>
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search Blog to Edit"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={searchQueryEdit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQueryEdit(e.target.value)
                }
              />
              <button
                onClick={handleSearchEdit}
                className="bg-[#A4E320] px-4 py-2 rounded-full"
              >
                Search
              </button>
            </div>
          </div>
          <div className="mt-4">
            {filteredBlogs.length > 0
              ? filteredBlogs.map((blog, index) => (
                  <div key={index} className="bg-[#001F22] p-4 rounded mt-2">
                    {editIndex === index ? (
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          Edit Blog
                        </h2>
                        <input
                          type="text"
                          name="title"
                          value={editBlog?.title}
                          onChange={handleChange}
                          className="p-2 w-full bg-gray-800 text-white rounded mt-2"
                        />
                        <textarea
                          name="description"
                          value={editBlog?.description}
                          onChange={handleChange}
                          className="p-2 w-full bg-gray-800 text-white rounded mt-2"
                          rows={4}
                        />
                        <input
                          type="text"
                          name="date"
                          value={editBlog?.date}
                          onChange={handleChange}
                          className="p-2 w-full bg-gray-800 text-white rounded mt-2"
                        />
                        <button
                          onClick={handleUpdate}
                          className="bg-[#A4E320] px-4 py-2 rounded-full mt-2"
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {blog.title}
                        </h2>
                        <p className="text-gray-400">{blog.description}</p>
                        <p className="text-gray-500">{blog.date}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-[#A4E320] px-8 py-2 rounded-full"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : searchQueryEdit && (
                  <p className="text-gray-500 mt-4 text-center">
                    No blogs found matching your search query.
                  </p>
                )}
          </div>
        </div>
      )}
    </div>
  );
}
