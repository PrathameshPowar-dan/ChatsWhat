import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../Api/Auth";

const ProfilePage = () => {
  const { authUser, UpdateProfile } = useAuthStore();

  const [formDATA, setformDATA] = useState({
    username: "",
    email: "",
    ProfilePic: ""
  });

  const [preview, setPreview] = useState(authUser?.ProfilePic || "./profile.png");
  const [showProfilePicError, setShowProfilePicError] = useState(false);
  const [fileUpload, setfileUpload] = useState(false);
  const fileInputRef = useRef();

  const validateForm = () => {
    if (!formDATA.ProfilePic) {
      toast.error("Please select a new profile picture");
      setShowProfilePicError(true);
      return false;
    }
    setShowProfilePicError(false);
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setformDATA((prev) => ({ ...prev, ProfilePic: file }));
      setfileUpload(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await UpdateProfile(formDATA); // calls the zustand store method
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 m-0 p-0">
      <div className="flex flex-col items-center mt-5 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" encType="multipart/form-data">
              <div className="flex justify-center items-center gap-5 mb-4">
                <h1 className="text-[18px] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Your Profile
                </h1>
                <div className="relative flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className={`w-24 h-24 rounded-full object-cover border-2 ${showProfilePicError ? 'border-red-500' : 'border-gray-300 dark:border-purple-600'}`}
                    onClick={handleClick}
                  />
                  {showProfilePicError && (
                    <p className="absolute bottom-[-20px] text-xs text-red-500 text-center mt-1">Profile is required</p>
                  )}
                  <div
                    onClick={handleClick}
                    style={{ display: fileUpload ? 'none' : 'block' }}
                    className="absolute bottom-[38px] right-[38px] bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-700"
                  >
                    <FaPlus className="text-white text-xs" />
                  </div>
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input
                  type="text"
                  value={authUser.username}
                  readOnly
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  value={authUser.email}
                  readnly
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg block w-full p-2 cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-1 focus:ring-purple-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update Profile Picture
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
