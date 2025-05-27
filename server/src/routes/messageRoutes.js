const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authenticateUser = require("../middlewares/authmiddleware");

// Send a message (authenticated)
router.post("/", authenticateUser, messageController.sendMessage);

// Get messages between users (authenticated)
router.get("/:otherUserId", authenticateUser, messageController.getMessagesBetweenUsers);

// Mark message as read (authenticated)
router.put("/read/:messageId", authenticateUser, messageController.markAsRead);

// Delete message (authenticated)
router.delete("/:messageId", authenticateUser, messageController.deleteMessage);

module.exports = router;
