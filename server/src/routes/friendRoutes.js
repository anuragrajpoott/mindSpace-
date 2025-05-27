import express from "express";
import {sendFriendRequest,acceptFriendRequest,removeFriend} from "../controllers/friendController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send a friend request to a user (authenticated)
router.post("/request/:userId", authenticateUser, sendFriendRequest);

// Accept a friend request (authenticated)
router.post("/accept/:requestId", authenticateUser, acceptFriendRequest);

// Remove/unfriend a user (authenticated)
router.delete("/remove/:friendId", authenticateUser, removeFriend);


export default router;
