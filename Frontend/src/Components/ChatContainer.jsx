import React, { useEffect } from 'react'
import { ChatStore } from '../Api/Chat';
import { useAuthStore } from '../Api/Auth';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';

const ChatContainer = () => {
  const { messages, selectedUser, isMessagesLoading, GetMessages } = ChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser && authUser) {
      GetMessages(selectedUser);
    }
  }, [selectedUser, authUser, GetMessages]);

  if (isMessagesLoading) return (
    <div className="flex-1 flex flex-col bg-gray-800">
      <ChatHeader />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full bg-purple-500/20"></div>
          <div className="w-32 h-4 rounded bg-purple-500/20"></div>
        </div>
      </div>
      <MessageInput />
    </div>
  );

  if (!selectedUser) return <NoChatSelected />;

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full overflow-hidden">
      <ChatHeader />

      {/* Date divider */}
      <div className="relative py-1 px-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-purple-500/20"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-gray-800 text-xs text-purple-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Messages area with desktop-specific scrollbar styling */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800 md:scrollbar-thumb-purple-500 md:scrollbar-track-gray-700">
        <div className="space-y-3 min-h-full">
          {messages.length > 0 ? (
            messages.map(message => (
              <div
                key={message._id}
                className={`flex ${message.senderID === authUser._id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg p-3 ${message.senderID === authUser._id
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                  }`}>
                  {message.text && (
                    <div className="break-words whitespace-pre-wrap">
                      {message.text}
                    </div>
                  )}
                  {message.image && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                      <img
                        src={message.image}
                        alt="Chat attachment"
                        className="max-w-full max-h-[180px] md:max-h-[240px] w-auto h-auto object-contain"
                        loading="lazy"
                        style={{
                          maxWidth: 'min(100%, 300px)',
                          maxHeight: '240px',
                          borderRadius: '0.375rem'
                        }}
                      />
                    </div>
                  )}
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="text-center space-y-2">
                <div className="text-purple-400 text-lg">Start the conversation</div>
                <div className="text-sm">Send your first message below</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add custom scrollbar styles in your global CSS */}
      <style jsx global>{`
        /* For desktop browsers */
        @media (min-width: 768px) {
          .scrollbar-thin::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #2d3748; /* gray-800 */
            border-radius: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #805ad5; /* purple-600 */
            border-radius: 4px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #6b46c1; /* purple-700 */
          }
        }
      `}</style>

      <MessageInput />
    </div>
  )
}

export default ChatContainer;