import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";

import Loader from "../components/Loader";
import GroupHeader from "../components/Group/GroupHeader";
import GroupMessage from "../components/Group/GroupMessage";
import GroupInput from "../components/Group/GroupInput";

import {
  getGroupById,
  joinGroup,
  leaveGroup,
  getGroupMessages,
  sendGroupMessage,
} from "../api/groupApi";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const { socket } = useSocket();

  const bottomRef = useRef(null);

  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState(false);

  const fetchGroupDetails = async () => {
    try {
      const response = await getGroupById(groupId);
      setGroup(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch group");
    }
  };

  const fetchMessages = async () => {
    try {
      setMessageLoading(true);
      const response = await getGroupMessages(groupId);
      setMessages(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchGroupDetails();
      await fetchMessages();
      setLoading(false);
    };

    loadData();
  }, [groupId]);

  useEffect(() => {
    if (!socket || !groupId) return;

    socket.emit("joinGroup", groupId);

    socket.on("receiveGroupMessage", (message) => {
      setMessages((prev) => {
        const alreadyExists = prev.some((msg) => msg._id === message._id);
        if (alreadyExists) return prev;
        return [...prev, message];
      });
    });

    return () => {
      socket.emit("leaveGroup", groupId);
      socket.off("receiveGroupMessage");
    };
  }, [socket, groupId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const isMember = group?.members?.some(
    (member) => member._id === user?._id
  );

  const handleJoinGroup = async () => {
    try {
      await joinGroup(groupId);
      toast.success("Joined group successfully");
      await fetchGroupDetails();
      socket?.emit("joinGroup", groupId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join group");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(groupId);
      toast.success("Left group successfully");
      await fetchGroupDetails();
      socket?.emit("leaveGroup", groupId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to leave group");
    }
  };

  const handleSendMessage = async (text) => {
    try {
      const response = await sendGroupMessage(groupId, text);

      socket?.emit("sendGroupMessage", {
        groupId,
        message: response.data,
      });

      setMessages((prev) => {
        const alreadyExists = prev.some(
          (msg) => msg._id === response.data._id
        );

        if (alreadyExists) return prev;

        return [...prev, response.data];
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  if (loading) {
    return <Loader text="Loading group..." />;
  }

  return (
    <div className="h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <GroupHeader
        group={group}
        isMember={isMember}
        onJoinGroup={handleJoinGroup}
        onLeaveGroup={handleLeaveGroup}
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
        {messageLoading ? (
          <Loader text="Loading messages..." />
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm text-center">
            No messages yet. Start the group discussion.
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <GroupMessage
                key={message._id}
                message={message}
                currentUser={user}
              />
            ))}

            <div ref={bottomRef} />
          </>
        )}
      </div>

      <GroupInput
        onSendMessage={handleSendMessage}
        disabled={!isMember}
      />
    </div>
  );
};

export default GroupDetails;