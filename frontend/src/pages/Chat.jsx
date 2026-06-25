import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import  useSocket  from "../hooks/useSocket";

import ConversationList from "../components/Chat/ConversationList";
import ChatBox from "../components/Chat/ChatBox";
import Loader from "../components/Loader";

import {
  getMyConversations,
  getMessages,
  sendMessage,
  markMessagesAsSeen,
} from "../api/chatApi";

const Chat = () => {
  const { user } = useAuth();
  const { socket } = useSocket();

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [typingUser, setTypingUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);

  // ---------------- Fetch Conversations ----------------

  const fetchConversations = async () => {
    try {
      setLoading(true);

      const response = await getMyConversations();

      setConversations(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // ---------------- Select Conversation ----------------

  const handleSelectConversation = async (conversation) => {
    try {
      setSelectedConversation(conversation);

      setMessageLoading(true);

      const response = await getMessages(conversation._id);

      setMessages(response.data || []);

      await markMessagesAsSeen(conversation._id);

      socket?.emit("joinConversation", conversation._id);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setMessageLoading(false);
    }
  };

  // ---------------- Socket Events ----------------

  useEffect(() => {
    if (!socket) return;

   socket.on("receiveMessage", (message) => {
  const messageConversationId =
    message?.conversation?._id || message?.conversation;

  // 1. If current open conversation, add message
  if (selectedConversation?._id === messageConversationId) {
    setMessages((prev) => {
      const alreadyExists = prev.some((msg) => msg._id === message._id);
      if (alreadyExists) return prev;
      return [...prev, message];
    });

    markMessagesAsSeen(messageConversationId);
  }

  // 2. Always update conversation list
  setConversations((prev) =>
    prev.map((conversation) => {
      if (conversation._id !== messageConversationId) {
        return conversation;
      }

      const isOtherConversation =
        selectedConversation?._id !== messageConversationId;

      return {
        ...conversation,
        lastMessage: message,
        unreadCount: isOtherConversation
          ? (conversation.unreadCount || 0) + 1
          : 0,
        updatedAt: message.createdAt,
      };
    })
  );
});

    socket.on("typing", ({ userId }) => {
      setTypingUser(userId);
    });

    socket.on("stopTyping", () => {
      setTypingUser(null);
    });

    socket.on("messageSeen", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, seen: true } : msg
        )
      );
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("messageSeen");
    };
  }, [socket]);

  // ---------------- Send Message ----------------

  const handleSendMessage = async (text) => {
  if (!selectedConversation) return;

  const receiver = selectedConversation.participants.find(
    (participant) => participant._id !== user._id
  );

  try {
    const response = await sendMessage(
      selectedConversation._id,
      receiver._id,
      text
    );

    socket?.emit("sendMessage", {
      conversationId: selectedConversation._id,
      message: response.data,
    });

    // Do not manually add message here
    // Socket will add it through receiveMessage
    fetchConversations();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send message");
  }
};

  // ---------------- Typing ----------------

  const handleTyping = () => {
    socket?.emit("typing", {
      conversationId: selectedConversation._id,
      userId: user._id,
    });
  };

  const handleStopTyping = () => {
    socket?.emit("stopTyping", {
      conversationId: selectedConversation._id,
      userId: user._id,
    });
  };

  if (loading) {
    return <Loader text="Loading conversations..." />;
  }

  return (
    <div className="h-[calc(100vh-80px)] min-h-[600px]">
      <div className="grid md:grid-cols-3 h-full gap-5">
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          currentUser={user}
          onSelectConversation={handleSelectConversation}
        />

        <div className="md:col-span-2 h-full">
          {messageLoading ? (
            <Loader text="Loading messages..." />
          ) : (
            <ChatBox
              selectedConversation={selectedConversation}
              messages={messages}
              currentUser={user}
              typingUser={typingUser}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              onStopTyping={handleStopTyping}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;