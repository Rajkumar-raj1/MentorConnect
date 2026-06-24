import axiosInstance from "./axiosInstance";

// Register User
export const registerUser = async (formData) => {
  const response = await axiosInstance.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);

  return response.data;
};

// Logout User
export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

// Get Current Logged-in User
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};

// Refresh Access Token
export const refreshAccessToken = async () => {
  const response = await axiosInstance.post("/auth/refresh-token");

  return response.data;
};