import { create } from "zustand";
import { axiosInstance } from "../Library/axios";

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
            console.error("Error in CheckAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }

    }
}));