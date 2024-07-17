import { useState, ChangeEvent, FormEvent } from "react";

interface AdminFormProps {}

const AddAdminForm: React.FC<AdminFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen text-center flex items-center justify-center mt-4">
      <form
        onSubmit={handleSubmit}
        className="text-start rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-center text-2xl text-white mb-6">Add an Admin</h2>
        <div className="mb-4">
          <label className="block text-gray-400">Add Name</label>
          <input
            type="text"
            className="w-full p-3 bg-[#00171A] text-white rounded-md border border-[#3B3B3B] outline-none text-[16px] mt-2 placeholder-gray-800"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Add Phone No</label>
          <input
            type="text"
            className="w-full p-3 bg-[#00171A] text-white rounded-md border border-[#3B3B3B] outline-none text-[16px] mt-2 placeholder-gray-800"
            value={phoneNo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNo(e.target.value)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Add Email</label>
          <input
            type="email"
            className="w-full p-3 bg-[#00171A] text-white rounded-md border border-[#3B3B3B] outline-none text-[16px] mt-2 placeholder-gray-800"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Create a Password</label>
          <input
            type="password"
            className="w-full p-3 bg-[#00171A] text-white rounded-md border border-[#3B3B3B] outline-none text-[16px] mt-2 placeholder-gray-800"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">
            Upload Admin Corporate Profile
          </label>
          <input
            type="file"
            className="cursor-pointer text-sm border-dashed border border-[#cccccc] py-8 px-4 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#A4E320] file:text-[#00171A]"
            accept=".jpg"
            onChange={handleFileChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Add Admin Bio</label>
          <textarea
            className="w-full p-3 bg-[#00171A] text-white rounded-md border border-[#3B3B3B] outline-none text-[16px] mt-2 placeholder-gray-800"
            value={bio}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBio(e.target.value)
            }
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-[#A4E320] text-[#103B3E] rounded"
        >
          Create an Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdminForm;
