import React, { useEffect } from 'react'
import { ChatStore } from '../Api/chat';
import SidebarBone from './Bones/SidebarBone';
import { Users } from 'lucide-react';

const Sidebar = () => {
  const { ActiveUsers, GetUsers, users, selectedUser, setSelectedUser, isUsersLoading } = ChatStore();

  useEffect(() => {
    GetUsers();
  }, [GetUsers]);

  if (isUsersLoading) return <SidebarBone />;

  return (
    <aside className="h-full w-[70px] xs:w-[80px] sm:w-[90px] md:w-[220px] lg:w-[250px] border-r border-gray-600 bg-gray-800">
      {/* Header - Collapsed on mobile */}
      <div className="border-b border-gray-600 w-full p-2 sm:p-3 flex justify-center sm:justify-start items-center">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
          <span className="font-medium text-white text-sm hidden md:block">Contacts</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto h-[calc(100%-56px)] w-full">
        {users.map(user => (
          <button
            key={user._id}
            className={`w-full flex justify-center items-center hover:bg-gray-700 transition-colors gap-2 p-2 sm:p-3
              ${selectedUser?._id === user._id ? 'bg-gray-700 border-l-4 border-purple-500' : 'bg-transparent'}`}
            onClick={() => setSelectedUser(user)}
          >
            {/* Avatar with online indicator */}
            <div className="relative">
              <img 
                src={user.ProfilePic} 
                alt={user.username} 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span className={`absolute bottom-0 right-0 block size-2 sm:size-2.5 rounded-full border-2 border-gray-800
                ${ActiveUsers.includes(user._id) ? 'bg-green-400' : 'bg-gray-500'}`}
              />
            </div>

            {/* User info - hidden on smallest screens */}
            <div className="hidden sm:block flex-1 min-w-0 text-left ml-2">
              <h4 className="font-medium text-white truncate text-sm sm:text-base">
                {user.username}
              </h4>
              <p className={`text-xs sm:text-sm truncate ${
                ActiveUsers.includes(user._id) ? 'text-green-400' : 'text-gray-400'
              }`}>
                {ActiveUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;