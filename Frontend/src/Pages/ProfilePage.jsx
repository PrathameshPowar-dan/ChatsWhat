import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useAuthStore } from "../Api/Auth";

const ProfilePage = () => {
  const { authUser, UpdateProfile, UpdateAccountDetails } = useAuthStore();

  const [formDATA, setformDATA] = useState({
    username: authUser?.username || "",
    email: authUser?.email || "",
    ProfilePic: ""
  });

  const [preview, setPreview] = useState(authUser?.ProfilePic || "./profile.png");
  const [fileUpload, setfileUpload] = useState(false);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setformDATA((prev) => ({ ...prev, ProfilePic: file }));
      setfileUpload(true);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formDATA.ProfilePic) {
      await UpdateProfile({ ProfilePic: formDATA.ProfilePic });
    }

    const updateFields = {};
    if (formDATA.username !== authUser.username) updateFields.username = formDATA.username;
    if (formDATA.email !== authUser.email) updateFields.email = formDATA.email;

    if (Object.keys(updateFields).length > 0) {
      await UpdateAccountDetails(updateFields);
    }
  };

  return (
    <section className="min-h-fit pt-6 bg-gray-50 dark:bg-gray-900 px-4 flex justify-center overflow-auto">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="flex justify-center items-center gap-5 mb-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
              <div className="relative">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-600 cursor-pointer"
                  onClick={handleClick}
                />
                {!fileUpload && (
                  <div
                    onClick={handleClick}
                    className="absolute bottom-[38px] right-[38px] bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-700"
                  >
                    <FaPlus className="text-white text-xs" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input
                type="text"
                value={formDATA.username}
                onChange={(e) => setformDATA({ ...formDATA, username: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                value={formDATA.email}
                onChange={(e) => setformDATA({ ...formDATA, email: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-1 focus:ring-purple-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
