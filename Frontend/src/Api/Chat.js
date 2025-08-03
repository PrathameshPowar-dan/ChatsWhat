import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../Library/axios";

export const ChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    GetUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/message/users");
            set({ users: response.data.data });
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false });
        }
    },

    GetMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/message/${userId}`);
            set({ messages: response.data.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    setSelectedUser: async(userId) => {
        set({ selectedUser: userId });
    },
}));