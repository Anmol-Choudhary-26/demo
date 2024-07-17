import React from "react";

interface AdminCardProps {
  id: number;
  name: string;
  about: string;
  phoneNo: string;
  email: string;
  mode: "edit" | "delete" | "none";
  onDelete?: (id: number) => void;
  onSave?: (
    id: number,
    name: string,
    about: string,
    phoneNo: string,
    email: string
  ) => void;
}

const AdminCard: React.FC<AdminCardProps> = ({
  id,
  name,
  about,
  phoneNo,
  email,
  mode,
  onDelete,
  onSave,
}) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editedName, setEditedName] = React.useState<string>(name);
  const [editedAbout, setEditedAbout] = React.useState<string>(about);
  const [editedPhoneNo, setEditedPhoneNo] = React.useState<string>(phoneNo);
  const [editedEmail, setEditedEmail] = React.useState<string>(email);

  const handleSave = () => {
    if (onSave) {
      onSave(id, editedName, editedAbout, editedPhoneNo, editedEmail);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-[#003034] p-4 rounded-lg shadow-lg w-full">
      {isEditing ? (
        <>
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="bg-gray-800 text-white rounded p-2 w-full"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <textarea
            className="bg-gray-800 text-white rounded p-2 w-full mb-4"
            value={editedAbout}
            onChange={(e) => setEditedAbout(e.target.value)}
          />
          <div className="bg-[#103B3E] border border-[#B8FF22] px-4 py-4 rounded-md">
            <input
              type="text"
              className="bg-gray-800 text-white rounded p-2 w-full mb-2"
              value={editedPhoneNo}
              onChange={(e) => setEditedPhoneNo(e.target.value)}
            />
            <input
              type="email"
              className="bg-gray-800 text-white rounded p-2 w-full"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[#B8FF22] flex items-center justify-center text-[#103B3E] font-bold text-xl">
              {name[0]}
            </div>
            <div className="ml-4">
              <h3 className="text-white text-lg">{name}</h3>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            <strong>About: </strong>
            {about}
          </p>
          <div className="bg-[#103B3E] border border-[#B8FF22] px-4 py-4 rounded-md">
            <p className="text-gray-400">
              <strong>Phone No: </strong>
              {phoneNo}
            </p>
            <p className="text-gray-400">
              <strong>Email: </strong>
              {email}
            </p>
          </div>
          {mode === "edit" && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Edit
            </button>
          )}
          {mode === "delete" && (
            <button
              onClick={() => onDelete && onDelete(id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCard;
