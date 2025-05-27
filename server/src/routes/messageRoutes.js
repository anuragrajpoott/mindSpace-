import express from "express";
import {sendMessage,getMessagesBetweenUsers,markAsRead,deleteMessage} from "../controllers/messageController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a message (authenticated)
router.post("/", authenticateUser, sendMessage);

// Get messages between users (authenticated)
router.get("/:otherUserId", authenticateUser, getMessagesBetweenUsers);

// Mark message as read (authenticated)
router.put("/read/:messageId", authenticateUser, markAsRead);

// Delete message (authenticated)
router.delete("/:messageId", authenticateUser, deleteMessage);

export default router;
