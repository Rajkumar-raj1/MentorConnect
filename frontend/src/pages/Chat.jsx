import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";

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

  const selectedConversationRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  const fetchConversations = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      const response = await getMyConversations();
      setConversations(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch conversations");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations(true);
  }, []);

  const handleSelectConversation = async (conversation) => {
    try {
      setSelectedConversation(conversation);

      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === conversation._id
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );

      setMessageLoading(true);

      socket?.emit("joinConversation", conversation._id);

      const response = await getMessages(conversation._id);
      setMessages(response.data || []);

      await markMessagesAsSeen(conversation._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      const messageConversationId =
        message?.conversation?._id || message?.conversation;

      const currentSelected = selectedConversationRef.current;

      if (currentSelected?._id === messageConversationId) {
        setMessages((prev) => {
          const alreadyExists = prev.some((msg) => msg._id === message._id);
          if (alreadyExists) return prev;
          return [...prev, message];
        });

        markMessagesAsSeen(messageConversationId);
      }

      setConversations((prev) => {
        const exists = prev.some(
          (conversation) => conversation._id === messageConversationId
        );

        if (!exists) {
          fetchConversations(false);
          return prev;
        }

        return prev
          .map((conversation) => {
            if (conversation._id !== messageConversationId) {
              return conversation;
            }

            const isOtherConversation =
              currentSelected?._id !== messageConversationId;

            return {
              ...conversation,
              lastMessage: message,
              unreadCount: isOtherConversation
                ? (conversation.unreadCount || 0) + 1
                : 0,
              updatedAt: message.createdAt,
            };
          })
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
          );
      });
    };

    const handleTyping = ({ userId }) => {
      setTypingUser(userId);
    };

    const handleStopTyping = () => {
      setTypingUser(null);
    };

    const handleMessageSeen = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, seen: true } : msg
        )
      );
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("messageSeen", handleMessageSeen);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("messageSeen", handleMessageSeen);
    };
  }, [socket]);

  const handleSendMessage = async (text) => {
    if (!selectedConversation) return;

    const receiver = selectedConversation.participants.find(
      (participant) => participant._id !== user._id
    );

    if (!receiver) {
      toast.error("Receiver not found");
      return;
    }

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

      setConversations((prev) =>
        prev
          .map((conversation) =>
            conversation._id === selectedConversation._id
              ? {
                  ...conversation,
                  lastMessage: response.data,
                  unreadCount: 0,
                  updatedAt: response.data.createdAt,
                }
              : conversation
          )
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
          )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  const handleTyping = () => {
    if (!selectedConversation) return;

    socket?.emit("typing", {
      conversationId: selectedConversation._id,
      userId: user._id,
    });
  };

  const handleStopTyping = () => {
    if (!selectedConversation) return;

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