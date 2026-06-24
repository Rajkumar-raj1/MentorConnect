import axiosInstance from "./axiosInstance";

// Get All Notifications
export const getNotifications = async () => {
  const response = await axiosInstance.get("/notifications");

  return response.data;
};

// Get Unread Notification Count
export const getUnreadCount = async () => {
  const response = await axiosInstance.get(
    "/notifications/unread-count"
  );

  return response.data;
};

// Mark Single Notification as Read
export const markNotificationAsRead = async (notificationId) => {
  const response = await axiosInstance.patch(
    `/notifications/${notificationId}/read`
  );

  return response.data;
};

// Mark All Notifications as Read
export const markAllNotificationsAsRead = async () => {
  const response = await axiosInstance.patch(
    "/notifications/read-all"
  );

  return response.data;
};

// Delete Notification
export const deleteNotification = async (notificationId) => {
  const response = await axiosInstance.delete(
    `/notifications/${notificationId}`
  );

  return response.data;
};