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
    <aside className="h-full w-[70px] sm:w-[90px] md:w-[15vw] border-r border-gray-500">
      {/* Header */}
      <div className="border-b border-gray-300 w-full p-4 flex justify-center items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center">
          <Users color='#9810fa' className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
          <span className="font-medium text-white text-sm hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {users.map(user => (
          <button
            key={user._id}
            className={`w-full flex justify-center items-center hover:bg-slate-700 gap-2 px-2 py-2 ${selectedUser === user._id ? 'bg-slate-800' : 'bg-transparent'
              }`}
            onClick={() => setSelectedUser(user._id)}
          >
            <img src={user.ProfilePic} alt={user.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1 hidden lg:block text-left min-w-0">
              <h4 className="font-bold text-purple-600 truncate">{user.username}</h4>
              <p className="text-sm text-gray-400 font-bold truncate">{ActiveUsers.includes(user._id) ? "Online" : "Offline"}</p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
