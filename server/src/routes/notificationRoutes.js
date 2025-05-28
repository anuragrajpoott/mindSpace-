import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  // clearAllNotifications,
  // getUnreadCount,
} from "../controllers/notificationController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a notification (usually internal use, but exposed if needed)
router.post("/", authenticateUser, createNotification);

// Get all notifications for the current user
router.get("/", authenticateUser, getUserNotifications);

// Mark one or more notifications as read
router.put("/read", authenticateUser, markAsRead);

router.put("/real-all" ,authenticateUser,markAllAsRead)

// Delete a single notification by ID
router.delete("/:notificationId", authenticateUser, deleteNotification);

// // Clear all notifications for current user
// router.delete("/", authenticateUser, clearAllNotifications);

// // Get count of unread notifications for current user
// router.get("/unread/count", authenticateUser, getUnreadCount);

export default router;
