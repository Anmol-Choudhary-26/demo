import { createAnnouncement, deleteNotification, searchBlog, updateNotification } from "@/hooks/useAnnuncement";
import { updateBlog } from "@/hooks/useBlog"
import { BlogPost } from "@/types";
import { useState, ChangeEvent } from "react";


type ViewType = "add" | "delete" | "edit" | "";

interface Blog {
  id: string;
  title: string;
  description: string;
  notiType: string;
  createdAt: string;

}

const initialBlogs: Blog[] = [
 {
  id:"1",
  title: "The rise of Hilter",
  description: "Hilter is a JavaScript framework for building user interfaces.",
  notiType: "Investor",
 createdAt: "2015-08-08"
 }
];

export default function AllAnnouncements() {
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
  const [description, setdescription] = useState<string>("");
  const [createdAt, setcreatedAt] = useState<string>("");

  const handleArrowClick = async (blog: BlogPost) => {
    const values = {
      title: blog.title,
      description: blog.description,
      notiType: "GENERAL",

    }
    const data = await createAnnouncement(values)
  };

  const getButtonClass = (buttonView: ViewType) => {
    return view === buttonView
      ? "role_button border-[#A4E320] text-[#A4E320]"
      : "role_button";
  };

  const handleSearchDelete = async () => {
    console.log(searchQueryDelete);
    try {
     const response = await searchBlog(searchQueryDelete, "GENERAL");
     console.log(response);
     setFilteredBlogsToDelete(response);
   } catch (error) {
     console.error('Error fetching slots:', error);
   }
     setSearchQueryDelete("");
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
    setFilteredBlogsToDelete([])
  };

  const handleAddBlog = (): void => {
    if (!title || !description || !createdAt) {
      alert("All fields are required to add a blog.");
      return;
    }

    const newBlog: BlogPost = {
      id: JSON.stringify(Date.now()),
      title,
      description,
      createdAt,
    };

    setBlogPosts([...blogPosts, newBlog]);
    setTitle("");
    setdescription("");
    setcreatedAt("");
  };

  const handleSearchEdit = async () => {
    console.log(searchQueryEdit);
    try {
     const response = await searchBlog(searchQueryEdit, "GENERAL");
     console.log(response);
     setFilteredBlogs(response);
   } catch (error) {
     console.error('Error fetching slots:', error);
   }
     setSearchQueryEdit("");
   };
 

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditBlog(filteredBlogs[index]);
  };

  const handleUpcreatedAt = async () => {
    if (editBlog !== null && editIndex !== null) {
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? editBlog : blog
      );
      setBlogs(updatedBlogs);
      console.log(updatedBlogs)
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
     await updateNotification(updatedBlogs[0].id, updatedBlogs[0]);
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
      <div className="space-x-2 mb-4">
        <button
          onClick={() => setView("add")}
          className={getButtonClass("add")}
        >
          Add an Announcements for All
        </button>
        <button
          onClick={() => setView("edit")}
          className={getButtonClass("edit")}
        >
          Edit an Announcements for All
        </button>
        <button
          onClick={() => setView("delete")}
          className={getButtonClass("delete")}
        >
          Delete an Announcements for All
        </button>
      </div>
      {view === "add" && (
        <div className="">
          <div className="flex justify-center items-center mt-4">
            <div className="flex flex-col space-y-2">
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
                placeholder="Add Blog description Here"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={description}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setdescription(e.target.value)
                }
              />
              <input
                type="createdAt"
                className="p-3 w-full sm:w-[400px] bg-[#00171A] text-white placeholder-gray-400 rounded-full border border-gray-800 focus:ring-1 focus:ring-[#A4E320] focus:outline-none"
                value={createdAt}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setcreatedAt(e.target.value)
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
                <p className="text-[#A4E320]">{blog.createdAt}</p>
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
            { filteredBlogsToDelete.length > 0
              ? filteredBlogsToDelete.map((blog, index) => (
                  <div key={index} className="bg-[#001F22] p-4 rounded mt-2">
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
                          type="text"
                          name="createdAt"
                          value={editBlog?.createdAt}
                          onChange={handleChange}
                          className="p-2 w-full bg-gray-800 text-white rounded mt-2"
                        />
                        <button
                          onClick={handleUpcreatedAt}
                          className="bg-[#A4E320] px-4 py-2 rounded-full mt-2"
                        >
                          update
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
