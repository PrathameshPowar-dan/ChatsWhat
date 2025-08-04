import React, { useEffect } from 'react';
import { ChatStore } from '../Api/Chat';
import SidebarBone from './Bones/SidebarBone';
import { Users } from 'lucide-react';
import { useAuthStore } from '../Api/Auth';

const Sidebar = () => {
  const { GetUsers, users, selectedUser, setSelectedUser, isUsersLoading } = ChatStore();
  const { ActiveUsers } = useAuthStore();

  useEffect(() => {
    GetUsers();
  }, [GetUsers]);

  if (isUsersLoading) return <SidebarBone />;

  return (
    <aside className="h-full w-[68px] md:w-[200px] border-r border-gray-700 bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-700 p-2 md:p-3 flex justify-center md:justify-start items-center">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          <span className="font-medium text-white text-sm hidden md:block">Contacts</span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
        <div className="space-y-1 p-1">
          {users.map(user => (
            <button
              key={user._id}
              className={`w-full flex items-center rounded p-1.5 transition-colors
                ${selectedUser?._id === user._id 
                  ? 'bg-gray-700' 
                  : 'hover:bg-gray-700/50'}`}
              onClick={() => setSelectedUser(user)}
            >
              {/* Avatar with status dot */}
              <div className="relative shrink-0 mr-2">
                <img 
                  src={user.ProfilePic} 
                  alt={user.username} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className={`absolute top-0 right-0 block size-2.5 rounded-full border-2 border-gray-800
                  ${ActiveUsers.includes(user._id) ? 'bg-green-500' : 'bg-gray-500'}`}
                />
              </div>

              {/* Name and status with flex-end alignment */}
              <div className="hidden md:flex flex-1 items-center justify-between min-w-0">
                <p className="text-sm font-medium text-white truncate max-w-[120px]">
                  {user.username}
                </p>
                <span className={`text-xs whitespace-nowrap ${
                  ActiveUsers.includes(user._id) ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {ActiveUsers.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;