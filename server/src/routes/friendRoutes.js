import express from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  // declineFriendRequest,
  removeFriend,
  // getFriendList,
  getPendingRequests,
  getFriends
  // blockUser,
  // unblockUser,
} from "../controllers/friendController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a friend request (authenticated)
router.post("/request/:userId", authenticateUser, sendFriendRequest);

// Accept a friend request (authenticated)
router.post("/accept/:requestId", authenticateUser, acceptFriendRequest);

// Decline a friend request (authenticated)
router.post("/decline/:requestId", authenticateUser, rejectFriendRequest);

// Remove/unfriend a user (authenticated)
router.delete("/remove/:friendId", authenticateUser, removeFriend);

// Get friend list (authenticated)
router.get("/list", authenticateUser, getFriends);

// Get pending friend requests (authenticated)
router.get("/pending", authenticateUser, getPendingRequests);

// // Block a user (authenticated, moderation)
// router.post("/block/:userId", authenticateUser, blockUser);

// // Unblock a user (authenticated)
// router.post("/unblock/:userId", authenticateUser, unblockUser);

export default router;
