import { create } from "zustand";
import { axiosInstance } from "../Library/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.MODE === "development"
    ? "http://localhost:7000"
    : window.location.origin; // Use current origin in production

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    ActiveUsers: [],


    CheckAuth: async () => {
        try {
            const response = await axiosInstance.get("/user/check");
            set({ authUser: response.data.data });
            get().connectSocket();  // Call connectSocket after checking auth
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
            set({ authUser: response.data.data });

            get().connectSocket();  // Call connectSocket after successful signup
        } catch (error) {
            console.log("Error in SignUp:", error);
            toast.error("Signup failed. Upload Profile Picture and Check details. ");
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    Login: async (formDATA) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/user/login", formDATA);
            set({ authUser: response.data.data });
            toast.success("Login successful!");

            get().connectSocket();  // Call connectSocket after successful login
        } catch (error) {
            console.log("Error in Login:", error);
            toast.error("Login failed. Check your credentials.");
            set({ authUser: null });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    LogOut: async () => {
        try {
            await axiosInstance.post("/user/logout");
            set({ authUser: null });
            toast.success("Logout successful!");
            get().disconnectSocket();  // Call disconnectSocket after logout
        } catch (error) {
            console.log("Error in LogOut:", error);
            toast.error("Logout failed.");
        }
    },

    UpdateProfile: async (formDATA) => {
        set({ isUpdatingProfile: true });
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("username", formDATA.username);
            formDataToSend.append("email", formDATA.email);

            if (formDATA.ProfilePic) {
                formDataToSend.append("ProfilePic", formDATA.ProfilePic);
            }

            const response = await axiosInstance.put("/user/update-profile", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            set({ authUser: response.data.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log("Error in UpdateProfile:", error);
            toast.error("Failed to update profile.");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    UpdateAccountDetails: async (formDATA) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.patch("/user/update-details", formDATA, {
                withCredentials: true,
            });

            set({ authUser: response.data.data });
            toast.success("Account details updated successfully!");
        } catch (error) {
            console.log("Error in UpdateAccountDetails:", error);
            toast.error("Failed to update account details.");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return; // Don't connect if not authenticated

        const socket = io(SOCKET_URL, {
            path: "/socket.io",
            query: {
                userId: authUser._id
            },
            transports: ['websocket'],
            secure: import.meta.env.MODE === "production",
        });
        socket.connect();
        set({ socket: socket });

        socket.on('getActiveUsers', (activeUsers) => {
            set({ ActiveUsers: activeUsers });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));