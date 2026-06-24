import axiosInstance from "./axiosInstance";

// Get All Groups
export const getAllGroups = async () => {
  const response = await axiosInstance.get("/groups");

  return response.data;
};

// Create Group
export const createGroup = async (formData) => {
  const response = await axiosInstance.post(
    "/groups/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Group By ID
export const getGroupById = async (groupId) => {
  const response = await axiosInstance.get(
    `/groups/${groupId}`
  );

  return response.data;
};

// Join Group
export const joinGroup = async (groupId) => {
  const response = await axiosInstance.post(
    `/groups/${groupId}/join`
  );

  return response.data;
};

// Leave Group
export const leaveGroup = async (groupId) => {
  const response = await axiosInstance.post(
    `/groups/${groupId}/leave`
  );

  return response.data;
};

// Get Group Messages
export const getGroupMessages = async (groupId) => {
  const response = await axiosInstance.get(
    `/groups/${groupId}/messages`
  );

  return response.data;
};

// Send Group Message
export const sendGroupMessage = async (groupId, text) => {
  const response = await axiosInstance.post(
    `/groups/${groupId}/messages`,
    {
      text,
    }
  );

  return response.data;
};