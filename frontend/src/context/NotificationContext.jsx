import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../api/notificationApi";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await getNotifications();
      setNotifications(response.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await getUnreadCount();
      setUnreadCount(response.data?.unreadCount || 0);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

 const readNotification = async (notificationId) => {
  try {
    await markNotificationAsRead(notificationId);

    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );

    await fetchUnreadCount();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to mark as read");
  }
};

  const readAllNotifications = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark all as read");
    }
  };

  const removeNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );

      fetchUnreadCount();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete notification");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      fetchUnreadCount();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated]);

  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    readNotification,
    readAllNotifications,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;