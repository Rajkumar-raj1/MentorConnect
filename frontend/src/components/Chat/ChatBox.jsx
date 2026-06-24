import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";

const ChatBox = ({
  selectedConversation,
  messages,
  currentUser,
  typingUser,
  onSendMessage,
  onTyping,
  onStopTyping,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingUser]);

  if (!selectedConversation) {
    return <EmptyChat />;
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <ChatHeader conversation={selectedConversation} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Start the conversation 👋
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <ChatMessage
                key={message._id}
                message={message}
                isOwnMessage={
                  message.sender?._id === currentUser?._id
                }
              />
            ))}

            {/* Typing Indicator */}
            {typingUser &&
              typingUser !== currentUser?._id && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-4 py-2 rounded-2xl text-sm text-gray-600 animate-pulse">
                    Typing...
                  </div>
                </div>
              )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={onSendMessage}
        onTyping={onTyping}
        onStopTyping={onStopTyping}
      />
    </div>
  );
};

export default ChatBox;