const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authenticateUser = require("../middlewares/authmiddleware");

// Create notification (could be internal, but exposed here if needed)
router.post("/", authenticateUser, notificationController.createNotification);

// Get notifications for user (authenticated)
router.get("/", authenticateUser, notificationController.getUserNotifications);

// Mark notifications as read (authenticated)
router.put("/read", authenticateUser, notificationController.markAsRead);

// Delete notification (authenticated)
router.delete("/:notificationId", authenticateUser, notificationController.deleteNotification);

module.exports = router;
