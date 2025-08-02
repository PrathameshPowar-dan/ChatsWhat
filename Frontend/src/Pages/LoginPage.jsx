import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuthStore } from '../Api/Auth';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { Login, isLoggingIn } = useAuthStore();

    const validateForm = () => {
        let isValid = true;

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            isValid = false;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(formData.password)) {
            toast.error("Password can only contain letters, numbers, and underscores");
            isValid = false;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;
        if (isValid === true) Login(formData);
    };

    return (
        <div className="w-full h-full overflow-hidden flex flex-col items-center px-6 py-8 mx-auto lg:py-0 bg-white dark:bg-gray-900">
            <form
                className="md:w-96 w-80 flex flex-col mt-5 items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-4xl font-medium mb-5 text-purple-600">
                    User <span className="text-gray-900 dark:text-white">Login</span>
                </h2>

                {/* Email Field */}
                <div className="flex items-center w-full border border-gray-300 dark:border-gray-600 h-12 rounded-full px-4 gap-3 bg-transparent">
                    <svg className="w-5 h-5 text-gray-700 dark:text-white" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="currentColor" />
                    </svg>
                    <input
                        type="text"
                        name="email"
                        placeholder="Username or Email"
                        autoComplete="username"
                        className="bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>


                {/* Password Field */}
                <div className="flex items-center mt-6 w-full border border-gray-300 dark:border-gray-600 h-12 rounded-full px-4 gap-3 bg-transparent">
                    <svg className="w-4 h-5 text-gray-700 dark:text-white" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="currentColor" />
                    </svg>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className="bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 dark:text-gray-300"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>


                {/* Forgot Password */}
                <div className="w-full flex items-center justify-center mt-8 text-gray-500 dark:text-gray-400">
                    <a className="text-sm underline" href="#">Forgot password?</a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="mt-8 w-full h-11 rounded-full text-white font-medium bg-purple-600 hover:bg-purple-700 transition-opacity"
                >
                    {isLoggingIn ? "Logging in..." : "Login"}
                </button>

                {/* Signup Link */}
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                    Don't have an account? <a className="text-purple-500 hover:underline" href="/signup">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
