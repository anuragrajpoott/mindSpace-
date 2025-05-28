import express from "express";
import {
  sendMessage,
  // getMessagesBetweenUsers,
  // markAsRead,
  deleteMessage,
  // getRecentChats,
  // searchMessages,
  // blockUserMessages,
  getRecentConversations,
  getMessagesWithUser
} from "../controllers/messageController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a message (authenticated)
router.post("/", authenticateUser, sendMessage);

// Get messages between current user and another user (authenticated)
router.get("/:otherUserId", authenticateUser, getMessagesWithUser);

// // Mark a message as read (authenticated)
// router.put("/read/:messageId", authenticateUser, markAsRead);

// Delete a message (authenticated)
router.delete("/:messageId", authenticateUser, deleteMessage);

// Get recent chat list with last messages (authenticated)
router.get("/recent/chats", authenticateUser, getRecentConversations);

// // Search messages by content or user (authenticated)
// router.get("/search", authenticateUser, searchMessages);

// // Block a user from messaging (authenticated)
// router.post("/block/:userId", authenticateUser, blockUserMessages);

export default router;
