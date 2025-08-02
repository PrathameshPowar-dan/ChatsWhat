import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from '../Api/Auth';

const SignUpPage = () => {
  const [ShowPASSWORD, setShowPASSWORD] = useState(false);
  const [showProfilePicError, setShowProfilePicError] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [fileUpload, setfileUpload] = useState(false);

  const [formDATA, setformDATA] = useState({
    username: "",
    email: "",
    password: "",
    ProfilePic: ""
  });

  const { Signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    let isValid = true;

    if (!formDATA.username || !formDATA.email || !formDATA.password) {
      toast.error("Please fill all fields");
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formDATA.username)) {
      toast.error("Username can only contain letters, numbers, and underscores");
      return false;
    }

    if (formDATA.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (!formDATA.ProfilePic) {
      setShowProfilePicError(true);
      toast.error("Profile picture is required");
      return false;
    }

    setShowProfilePicError(false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      Signup(formDATA);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setformDATA(prev => ({ ...prev, ProfilePic: file }));
      setfileUpload(true);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="min-h-fit pt-6 bg-gray-50 dark:bg-gray-900 flex justify-center px-4 overflow-auto">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header & Image Upload */}
            <div className="flex justify-center items-center gap-4">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                Create an account
              </h1>
              <div className="relative">
                <img
                  src={preview || "./profile.png"}
                  alt="Profile Preview"
                  onClick={handleClick}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 ${showProfilePicError ? 'border-red-500' : 'border-gray-300 dark:border-purple-600'}`}
                />
                {showProfilePicError && (
                  <p className="absolute bottom-[-20px] text-xs text-red-500 text-center w-full">Required</p>
                )}
                {!fileUpload && (
                  <div
                    onClick={handleClick}
                    className="absolute bottom-[30px] right-[30px] bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-700"
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

            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Username *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formDATA.username}
                onChange={(e) => setformDATA({ ...formDATA, username: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your Username"
                autoComplete="username"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formDATA.email}
                onChange={(e) => setformDATA({ ...formDATA, email: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your Email @"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type={ShowPASSWORD ? "text" : "password"}
                value={formDATA.password}
                onChange={(e) => setformDATA({ ...formDATA, password: e.target.value })}
                className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPASSWORD(!ShowPASSWORD)}
                className="absolute right-3 bottom-2 text-gray-500"
              >
                {ShowPASSWORD ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-300"
            >
              {isSigningUp ? "Creating..." : "Create an account"}
            </button>

            {/* Already have account */}
            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-purple-500 hover:underline font-medium">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
