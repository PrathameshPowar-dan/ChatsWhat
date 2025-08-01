import { React, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from '../Api/Auth';

const SignUpPage = () => {
  const [ShowPASSWORD, setShowPASSWORD] = useState(false)
  const [showProfilePicError, setShowProfilePicError] = useState(false);
  const [formDATA, setformDATA] = useState({
    username: "",
    email: "",
    password: "",
    ProfilePic: ""
  })

  const { Signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    let isValid = true;

    if (!formDATA.username || !formDATA.email || !formDATA.password) {
      toast.error("Please fill all fields");
      isValid = false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formDATA.username)) {
      toast.error("Username can only contain letters, numbers, and underscores");
      isValid = false;
    }

    if (formDATA.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      isValid = false;
    }

    // ✅ Profile Pic check
    if (!formDATA.ProfilePic) {
      setShowProfilePicError(true);
      toast.error("Profile picture is required");
      isValid = false;
    } else {
      setShowProfilePicError(false);
    }

    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    if (isValid === true) Signup(formDATA);
  }

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [fileUpload, setfileUpload] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // for UI preview only
      };
      reader.readAsDataURL(file);

      setformDATA(prev => ({ ...prev, ProfilePic: file })); // ✅ store actual file
      setfileUpload(true); // ✅ this now runs
    }
  };



  const handleClick = () => {
    fileInputRef.current.click();
  };



  return (
    <section className="bg-gray-50 dark:bg-gray-900 m-0 p-0">
      <div className="flex flex-col items-center mt-5 px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4" action="#">
              <div className="flex justify-center items-center gap-5 mb-4">
                <h1 className="text-[18px] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <div className="relative">
                  {/* Image Preview */}
                  <img
                    src={preview || "./profile.png"}
                    alt="Profile Preview"
                    className={`w-24 h-24 rounded-full object-cover border-2 ${showProfilePicError ? 'border-red-500' : 'border-gray-300 dark:border-purple-600'
                      }`}

                    onClick={handleClick}
                    onChange={() => setformDATA({ ...formDATA, ProfilePic: preview })}
                  />
                  {showProfilePicError && (
                    <p className="absolute bottom-[-20px] text-xs text-red-500 text-center mt-1">Profile is required</p>
                  )}


                  {/* Plus Icon */}
                  <div
                    onClick={handleClick}
                    style={{ display: fileUpload ? 'none' : 'block' }}
                    className="add absolute bottom-[38px] right-[38px] bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-700"
                  >
                    <FaPlus className="text-white text-xs" />
                  </div>

                  {/* Hidden File Input */}
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
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username *</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your Username"
                  autoComplete="username"
                  value={formDATA.username}
                  onChange={(e) => setformDATA({ ...formDATA, username: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email *</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email @" required="" value={formDATA.email} onChange={(e) => setformDATA({ ...formDATA, email: e.target.value })} />
              </div>
              <div className="relative">
                <label htmlFor="password" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password *</label>
                <input type={ShowPASSWORD ? "text" : "password"} autoComplete="new-password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={formDATA.password} onChange={(e) => setformDATA({ ...formDATA, password: e.target.value })} />
                <button type="button" onClick={() => setShowPASSWORD(!ShowPASSWORD)} className="absolute right-6 bottom-3 text-gray-500">
                  {ShowPASSWORD ? <FaEyeSlash color='white' /> : <FaEye color='white' />}
                </button>
              </div>
              <div className="flex items-start">
              </div>
              <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-1 focus:ring-purple-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Create an account</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/login" className="font-medium text-purple-400 hover:underline dark:text-primary-500">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage