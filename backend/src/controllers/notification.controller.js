import { Notification } from "../models/notification.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get all notifications of logged-in user
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      notifications,
      "Notifications fetched successfully"
    )
  );
});

// Get unread notifications count
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({
    user: req.user._id,
    isRead: false,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      { unreadCount: count },
      "Unread notification count fetched successfully"
    )
  );
});

// Mark single notification as read
const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: req.user._id,
    },
    {
      $set: {
        isRead: true,
      },
    },
    {
      new: true,
    }
  );

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      notification,
      "Notification marked as read"
    )
  );
});

// Mark all notifications as read
const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      user: req.user._id,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "All notifications marked as read"
    )
  );
});

// Delete notification
const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    user: req.user._id,
  });

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Notification deleted successfully"
    )
  );
});

export {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
};