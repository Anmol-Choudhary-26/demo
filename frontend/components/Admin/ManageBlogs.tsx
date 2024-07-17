import { BlogPost } from "@/types";
import { useState, ChangeEvent, useEffect } from "react";
import {
  createBlog,
  deleteBlog,
  getBlog,
  searchBlog,
  updateBlog,
} from "@/hooks/useBlog";
type ViewType = "add" | "delete" | "edit" | "";

interface Blog {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function ManageBlogs() {
  const [blog, setBlog] = useState<Blog[]>([
    {
      id: "664ea585bf95d253e6ce8162",
      title: "title ",
      description: "Blog ",
      createdAt: "2024-05-23T02:10:12.269Z",
      updatedAt: "2024-05-23T02:10:12.269Z",
    },
  ]);
  const [view, setView] = useState<ViewType>("");
  const [blogs, setBlogs] = useState<Blog[]>(blog);

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
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState<string>("");

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

  // const { setCurrentBlog } = useBlogs();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleArrowClick = async (blog: BlogPost) => {
    console.log("Current blog set:", blog); // Debugging log
    const newBlog = {
      title,
      description: content,
    };

    const blogData = await createBlog(newBlog);
  };

  const getButtonClass = (buttonView: ViewType) => {
    return view === buttonView
      ? "role_button border-[#A4E320] text-[#A4E320]"
      : "role_button";
  };

  const handleSearchDelete = async () => {
    console.log(searchQueryDelete);
    try {
      const response = await searchBlog(searchQueryDelete);
      console.log(response);
      setFilteredBlogsToDelete(response);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setSearchQueryDelete("");
  };

  const handleAddBlog = async () => {
    if (!file || !title || !content || !date) {
      alert("All fields are required to add a blog.");
      return;
    }
    setTitle(title);
    setContent(content);
    setDate(date);
    setBlogPosts([
      {
        id: Date.now().toString(),
        title: title,
        description: content,
        date: "s",
      },
    ]);
  };

  const handleSearchEdit = async () => {
    console.log(searchQueryEdit);
    try {
      const response = await searchBlog(searchQueryEdit);
      console.log(response);
      setFilteredBlogs(response);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setSearchQueryEdit("");
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    setFilteredBlogsToDelete([]);
  };

  const handleUpdate = async () => {
    if (editBlog !== null && editIndex !== null) {
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? editBlog : blog
      );
      setBlogs(updatedBlogs);
      console.log(updatedBlogs);
      setFilteredBlogs(
        updatedBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchQueryEdit.toLowerCase()) ||
            blog.description
              .toLowerCase()
              .includes(searchQueryEdit.toLowerCase()) ||
            blog.createdAt.includes(searchQueryEdit)
        )
      );
      await updateBlog(updatedBlogs[0].id, updatedBlogs[0]);
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

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditBlog(filteredBlogs[index]);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#00171A] text-white p-4">
      <h1 className="text-xl font-bold mb-4">Manage Blogs</h1>
      <div className="md:space-x-2 grid md:flex gap-2 mb-4">
        <button
          onClick={() => setView("add")}
          className={getButtonClass("add")}
        >
          Add a Blog
        </button>
        <button
          onClick={() => setView("edit")}
          className={getButtonClass("edit")}
        >
          Edit a Blog
        </button>
        <button
          onClick={() => setView("delete")}
          className={getButtonClass("delete")}
        >
          Delete a Blog
        </button>
      </div>
      {view === "add" && (
        <div className="">
          <div className="flex justify-center items-center mt-4">
            <div className="flex flex-col space-y-2">
              <input
                type="file"
                accept="image/*"
                name="myImage"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#A4E320]"
                onChange={handleFileChange}
              />
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
                value={content}
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
                className="bg-[#A4E320] px-4 py-2 rounded-full mt-2"
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
                {/* <p className="text-[#A4E320]">{blog.date}</p> */}
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
              ? filteredBlogsToDelete.map((blog) => (
                  <div key={blog.id} className="bg-[#001F22] p-4 rounded mt-2">
                    <h2 className="text-xl font-bold text-white">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400">{blog.description}</p>
                    <p className="text-gray-500">{blog.createdAt}</p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleDelete(blog.id)}
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
                          type="date"
                          name="createdAt"
                          value={editBlog?.createdAt}
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
                        <p className="text-gray-500">{blog.createdAt}</p>
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
