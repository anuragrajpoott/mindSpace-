import express from "express";
import {createNotification,getUserNotifications,markAsRead,deleteNotification} from "../controllers/notificationController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create notification (usually internal, but exposed if needed)
router.post("/", authenticateUser, createNotification);

// Get notifications for user (authenticated)
router.get("/", authenticateUser, getUserNotifications);

// Mark notifications as read (authenticated)
// Accepts an array of notification IDs or marks all as read depending on implementation
router.put("/read", authenticateUser, markAsRead);

// Delete notification (authenticated)
router.delete("/:notificationId", authenticateUser, deleteNotification);

export default router;
