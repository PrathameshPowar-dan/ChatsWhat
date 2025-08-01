import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Api/Auth";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { LogOut, authUser } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-lg font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="./chat.png" alt="logo" />
          ChatsWhat
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/settings"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white"
            title="Settings"
          >
            <IoMdSettings size={24} />
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex justify-center items-center gap-2 px-3 py-1.5 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <CgProfile size={24} />
              </Link>
              <button
                onClick={LogOut}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white"
                title="Logout"
              >
                <IoMdLogOut size={24} color="red" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <RxCross2 size={26} className="text-gray-700 dark:text-white" />
            ) : (
              <HiMenuAlt3 size={26} className="text-gray-700 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-60 px-4 pb-4 border-t dark:border-gray-700" : "max-h-0 px-4 pb-0 border-none"
          }`}
      >
        <div className={`space-y-3 ${mobileMenuOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300 delay-100`}>
          <Link
            to="/settings"
            className="flex items-center mt-3 gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white"
          >
            <IoMdSettings size={20} color="white" /> Settings
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700  dark:text-gray-300 hover:text-purple-600 dark:hover:text-white"
              >
                <CgProfile size={24} className="bg-purple-600 text-white rounded-2xl pt-0.5 pb-0.5 px-1" /> Profile
              </Link>
              <button
                onClick={LogOut}
                className="flex items-center gap-2 text-gray-700 dark:text-red-500 hover:text-purple-600 dark:hover:text-red-600"
              >
                <IoMdLogOut size={20} /> Logout
              </button>
            </>
          )}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
