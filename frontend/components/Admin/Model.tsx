import React, { useState, useEffect } from "react";
import { Business, Investor } from "@/types";

interface ModalProps {
  show: boolean;
  title: string;
  content: string;
  onClose: () => void;
  isSuggestion?: boolean;
  isDocument?: boolean;
  isEditProfile?: boolean;
  business?: Business;
  investor?: Investor;
  onSave?: any;
}

const Modal: React.FC<ModalProps> = ({
  show,
  title,
  content,
  onClose,
  isSuggestion,
  isDocument,
  isEditProfile,
  business,
  investor,
  onSave,
}) => {
  const [formData, setFormData] = useState<Business | Investor>(
    (business || investor) ?? ({} as Business | Investor)
  );

  useEffect(() => {
    setFormData((business || investor) ?? ({} as Business | Investor));
  }, [business, investor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-black">
            &times;
          </button>
        </div>
        <div className="mt-4">
          {isDocument && (
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <p>{content}</p>
            </div>
          )}
          {isSuggestion && (
            <textarea
              className="w-full h-40 p-2 border rounded-md"
              placeholder="Add your suggestion here..."
            ></textarea>
          )}
          {isEditProfile && (
            <div>
              {business && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={(formData as Business).name}
                    onChange={handleChange}
                    placeholder="Business Name"
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <input
                    type="text"
                    name="location"
                    value={(formData as Business).location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  {/* Add other fields for business */}
                </>
              )}
              {investor && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={(formData as Investor).name}
                    onChange={handleChange}
                    placeholder="Investor Name"
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <input
                    type="text"
                    name="email"
                    value={(formData as Investor).email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  {/* Add other fields for investor */}
                </>
              )}
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          )}
          {!isDocument && !isSuggestion && !isEditProfile && <p>{content}</p>}
        </div>
        {!isDocument && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
