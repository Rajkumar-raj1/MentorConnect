import axiosInstance from "./axiosInstance";

// Get All Mentors
export const getAllMentors = async () => {
  const response = await axiosInstance.get("/mentors");

  return response.data;
};

// Search Mentors
export const searchMentors = async (params) => {
  const response = await axiosInstance.get("/mentors/search", {
    params,
  });

  return response.data;
};

// Get Mentor By ID
export const getMentorById = async (mentorId) => {
  const response = await axiosInstance.get(
    `/mentors/${mentorId}`
  );

  return response.data;
};

// Create Mentor Profile
export const createMentorProfile = async (mentorData) => {
  const response = await axiosInstance.post(
    "/mentors/profile/create",
    mentorData
  );

  return response.data;
};

// Get My Mentor Profile
export const getMyMentorProfile = async () => {
  const response = await axiosInstance.get(
    "/mentors/profile/me"
  );

  return response.data;
};

// Update Mentor Profile
export const updateMentorProfile = async (mentorData) => {
  const response = await axiosInstance.patch(
    "/mentors/profile/update",
    mentorData
  );

  return response.data;
};

// Delete Mentor Profile
export const deleteMentorProfile = async () => {
  const response = await axiosInstance.delete(
    "/mentors/profile/delete"
  );

  return response.data;
};