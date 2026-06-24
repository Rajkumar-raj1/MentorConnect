import { Router } from "express";

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

// Get all notifications
router.route("/").get(verifyJWT, getNotifications);

// Get unread notification count
router.route("/unread-count").get(
  verifyJWT,
  getUnreadCount
);

// Mark single notification as read
router.route("/:notificationId/read").patch(
  verifyJWT,
  markNotificationAsRead
);

// Mark all notifications as read
router.route("/read-all").patch(
  verifyJWT,
  markAllNotificationsAsRead
);

// Delete notification
router.route("/:notificationId").delete(
  verifyJWT,
  deleteNotification
);

export default router;