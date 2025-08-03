import { X } from "lucide-react";
import { useAuthStore } from "../Api/Auth";
import { ChatStore } from "../Api/chat";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser, isMessagesLoading } = ChatStore();
    const { ActiveUsers = [] } = useAuthStore();

    if (!selectedUser) return null;
    if (isMessagesLoading) return null; // Or return a loading skeleton if preferred

    return (
        <div className="p-2 sm:p-3 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Avatar with online indicator */}
                    <div className="relative">
                        <div className="size-10 sm:size-12 rounded-full overflow-hidden border border-purple-500/50">
                            <img
                                src={selectedUser?.ProfilePic || "/avatar.png"}
                                alt={selectedUser?.username || "User"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span
                            className={`absolute bottom-0 right-0 block size-2.5 sm:size-3 rounded-full border border-gray-800 
                                ${ActiveUsers?.includes(selectedUser?._id) ? 'bg-green-400' : 'bg-gray-500'}`}
                            title={ActiveUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
                        />
                    </div>

                    {/* User info */}
                    <div className="max-w-[140px] sm:max-w-none">
                        <h3 className="font-medium text-white text-sm sm:text-base truncate">
                            {selectedUser.username || "Unknown User"}
                        </h3>
                        <p className={`text-xs sm:text-sm flex items-center gap-1 ${
                            ActiveUsers?.includes(selectedUser?._id)
                                ? 'text-green-400'
                                : 'text-gray-400'
                            }`}>
                            <span className={`inline-block size-1.5 sm:size-2 rounded-full ${
                                ActiveUsers?.includes(selectedUser?._id) 
                                    ? 'bg-green-400' 
                                    : 'bg-gray-500'
                            }`} />
                            {ActiveUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button
                    onClick={() => setSelectedUser(null)}
                    className="p-1 sm:p-1.5 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-purple-400"
                    aria-label="Close chat"
                >
                    <X size={18} className="sm:size-5" />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;