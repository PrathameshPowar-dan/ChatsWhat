import { create } from "zustand";
import { axiosInstance } from "../Library/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,


    CheckAuth: async () => {
        try {
            const response = await axiosInstance.get("/user/check");
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in CheckAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    Signup: async (formDATA) => {
        set({ isSigningUp: true });
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("username", formDATA.username);
            formDataToSend.append("email", formDATA.email);
            formDataToSend.append("password", formDATA.password);

            if (formDATA.ProfilePic) {
                formDataToSend.append("ProfilePic", formDATA.ProfilePic);
            }

            const response = await axiosInstance.post("/user/register", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Signup successful!");
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in SignUp:", error);
            toast.error("Signup failed. Upload Profile Picture and Check details. ");
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    LogOut: async () => {
        try {
            await axiosInstance.post("/user/logout");
            set({ authUser: null });
            toast.success("Logout successful!");
        } catch (error) {
            console.log("Error in LogOut:", error);
            toast.error("Logout failed.");
        }
    }

}));