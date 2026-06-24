import axiosInstance from "./axiosInstance";

// Create or Get Conversation
export const createOrGetConversation = async (receiverId) => {
  const response = await axiosInstance.post("/chats/conversation", {
    receiverId,
  });

  return response.data;
};

// Get All Conversations
export const getMyConversations = async () => {
  const response = await axiosInstance.get("/chats/conversations");

  return response.data;
};

// Get Messages of a Conversation
export const getMessages = async (conversationId) => {
  const response = await axiosInstance.get(
    `/chats/messages/${conversationId}`
  );

  return response.data;
};

// Send Message
export const sendMessage = async (
  conversationId,
  receiverId,
  text
) => {
  const response = await axiosInstance.post(
    `/chats/messages/${conversationId}`,
    {
      receiverId,
      text,
    }
  );

  return response.data;
};

// Mark Messages as Seen
export const markMessagesAsSeen = async (conversationId) => {
  const response = await axiosInstance.patch(
    `/chats/messages/${conversationId}/seen`
  );

  return response.data;
};