import express from "express";
import {sendFriendRequest,acceptFriendRequest,removeFriend} from "../controllers/friendController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a friend request to a user (authenticated)
router.post("/request/:userId", authenticateUser, sendFriendRequest);

// Accept a friend request (authenticated)
router.post("/accept/:requestId", authenticateUser, acceptFriendRequest);

// Decline a friend request (authenticated)
// router.post("/decline/:requestId", authenticateUser, declineFriendRequest);

// Cancel a sent friend request (authenticated)
// router.delete("/cancel/:requestId", authenticateUser, cancelFriendRequest);

// Remove/unfriend a user (authenticated)
router.delete("/remove/:friendId", authenticateUser, removeFriend);

// Get list of friends (authenticated)
// router.get("/", authenticateUser, getFriendsList);

// Get pending friend requests received (authenticated)
// router.get("/requests/received", authenticateUser, getReceivedRequests);

// Get pending friend requests sent (authenticated)
// router.get("/requests/sent", authenticateUser, getSentRequests);

export default router;
