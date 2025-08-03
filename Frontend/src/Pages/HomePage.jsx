import React from 'react'
import { ChatStore } from '../Api/chat';
import Sidebar from '../Components/Sidebar.jsx';
import NoChatSelected from '../Components/NoChatSelected.jsx';
import ChatContainer from '../Components/ChatContainer.jsx';

const HomePage = () => {
  const { selectedUser } = ChatStore();
  return (
    <div className="h-[calc(99vh-63px)]  -white flex overflow-hidden">
      {/* Sidebar */}
      <div className="max-w-xs h-full">
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}

    </div>
  );
};

export default HomePage;
