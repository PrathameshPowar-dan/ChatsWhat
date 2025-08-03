import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../Library/axios";

export const ChatStore = create((set, get) => ({  // Add get parameter here
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    ActiveUsers: [],

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
            const response = await axiosInstance.get(`/message/${userId._id}`);
            set({ messages: response.data.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    SendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(
                `/message/send/${selectedUser._id}`,
                messageData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            set({ messages: [...messages, response.data.data] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    setSelectedUser: (userId) => {
        set({ selectedUser: userId });
    },
}));