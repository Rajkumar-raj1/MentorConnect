import axiosInstance from "./axiosInstance";

// Get all users
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

// Get all pending mentors
export const getPendingMentors = async () => {
  const response = await axiosInstance.get("/admin/mentors/pending");
  return response.data;
};

// Approve mentor
export const approveMentor = async (userId) => {
  const response = await axiosInstance.patch(
    `/admin/mentors/${userId}/approve`
  );

  return response.data;
};

// Reject mentor
export const rejectMentor = async (userId) => {
  const response = await axiosInstance.patch(
    `/admin/mentors/${userId}/reject`
  );

  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(
    `/admin/users/${userId}`
  );

  return response.data;
};