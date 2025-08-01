import { React, useState, useRef } from 'react'
import { FaPlus } from "react-icons/fa";

const SignUpPage = () => {
  const [ShowPASSWORD, setShowPASSWORD] = useState(false)
  const [formDATA, setformDATA] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  // const { Signup, isSigningUp } = useAuthStore();

  // const validateForm = () => { }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // }

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [fileUpload, setfileUpload] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setfileUpload(true);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };



  return (
    <section class="bg-gray-50 dark:bg-gray-900 m-0 p-0">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="./chat.png" alt="logo" />
          ChatsWhat
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-4 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form class="space-y-4 md:space-y-4" action="#">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {/* Image Preview */}
                  <img
                    src={preview || "./profile.png"}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                    onClick={handleClick}
                  />

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
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username *</label>
                <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Username" required="" />
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Email @" required="" />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="Re-enter Password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div class="flex items-start">
              </div>
              <button type="submit" class="w-full text-white bg-purple-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <a href="/login" class="font-medium text-purple-400 hover:underline dark:text-primary-500">Login here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage