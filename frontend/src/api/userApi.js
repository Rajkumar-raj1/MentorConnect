import axiosInstance from "./axiosInstance";

// Get logged-in user profile
export const getUserProfile = async () => {
  const response = await axiosInstance.get("/users/profile");
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await axiosInstance.patch("/users/profile", userData);
  return response.data;
};

// Update avatar
export const updateAvatar = async (formData) => {
  const response = await axiosInstance.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await axiosInstance.patch(
    "/users/change-password",
    passwordData
  );

  return response.data;
};